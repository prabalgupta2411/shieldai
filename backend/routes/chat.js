const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// Cybersecurity knowledge base
const cybersecurityKnowledge = {
  passwords: [
    "Use strong, unique passwords for each account",
    "Enable two-factor authentication when available",
    "Use a password manager to store your passwords securely",
    "Change your passwords regularly",
    "Never share your passwords with anyone"
  ],
  phishing: [
    "Be cautious of unsolicited emails",
    "Check the sender's email address carefully",
    "Don't click on suspicious links",
    "Verify the website's URL before entering sensitive information",
    "Be wary of urgent or threatening messages"
  ],
  malware: [
    "Keep your software and operating system updated",
    "Use reputable antivirus software",
    "Don't download files from untrusted sources",
    "Be cautious of email attachments",
    "Regularly backup your important data"
  ],
  general: [
    "Use a firewall to protect your network",
    "Keep your devices updated with the latest security patches",
    "Use encrypted connections (HTTPS) when possible",
    "Be careful with public Wi-Fi networks",
    "Regularly monitor your accounts for suspicious activity"
  ]
};

// Function to generate response based on user query
const generateResponse = (query) => {
  const queryLower = query.toLowerCase();
  let response = "";
  let category = "general";

  // Determine the category based on keywords
  if (queryLower.includes("password") || queryLower.includes("login")) {
    category = "passwords";
  } else if (queryLower.includes("phish") || queryLower.includes("email") || queryLower.includes("link")) {
    category = "phishing";
  } else if (queryLower.includes("malware") || queryLower.includes("virus") || queryLower.includes("file")) {
    category = "malware";
  }

  // Get random advice from the selected category
  const advice = cybersecurityKnowledge[category];
  const randomAdvice = advice[Math.floor(Math.random() * advice.length)];

  response = `Here's some advice about ${category}: ${randomAdvice}`;

  return response;
};

// Chat endpoint
router.post('/chat', auth, async (req, res) => {
  try {
    const { query } = req.body;
    
    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }

    const response = generateResponse(query);
    
    // Save to user's chat history
    const user = await User.findById(req.user._id);
    user.chatHistory.push({
      query,
      response,
      timestamp: new Date()
    });
    await user.save();

    res.json({ response });
  } catch (error) {
    res.status(500).json({ error: 'Error processing chat' });
  }
});

// Get user's chat history
router.get('/history', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('chatHistory');
    res.json(user.chatHistory);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching chat history' });
  }
});

module.exports = router; 