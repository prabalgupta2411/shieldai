const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const phishingDetector = require('../ai_models/phishing_detector');

// Function to check if URL is potentially malicious
const checkPhishingURL = async (url) => {
  // This is a basic implementation. In production, you should use a more sophisticated approach
  const suspiciousPatterns = [
    /login.*\..*\..*/i,
    /secure.*\..*\..*/i,
    /verify.*\..*\..*/i,
    /account.*\..*\..*/i,
    /bank.*\..*\..*/i,
    /paypal.*\..*\..*/i,
    /update.*\..*\..*/i,
    /confirm.*\..*\..*/i,
  ];

  const urlLower = url.toLowerCase();
  
  // Check for suspicious patterns
  const hasSuspiciousPattern = suspiciousPatterns.some(pattern => pattern.test(urlLower));
  
  // Check for IP address instead of domain
  const hasIPAddress = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}/.test(urlLower);
  
  // Check for excessive subdomains
  const subdomainCount = (urlLower.match(/\./g) || []).length;
  const hasExcessiveSubdomains = subdomainCount > 2;

  return {
    isPhishing: hasSuspiciousPattern || hasIPAddress || hasExcessiveSubdomains,
    reasons: {
      suspiciousPattern: hasSuspiciousPattern,
      ipAddress: hasIPAddress,
      excessiveSubdomains: hasExcessiveSubdomains
    }
  };
};

// Check URL for phishing
router.post('/check', auth, async (req, res) => {
  try {
    const { url } = req.body;
    
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    const result = await phishingDetector.detectPhishing(url);
    
    // Save to user's history
    const user = await User.findById(req.user._id);
    user.phishingHistory.push({
      url,
      isPhishing: result.isPhishing,
      probability: result.probability,
      confidence: result.confidence,
      timestamp: new Date()
    });
    await user.save();

    res.json(result);
  } catch (error) {
    console.error('Error in phishing check:', error);
    res.status(500).json({ error: 'Error checking URL' });
  }
});

// Get user's phishing history
router.get('/history', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('phishingHistory');
    res.json(user.phishingHistory);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching history' });
  }
});

module.exports = router; 