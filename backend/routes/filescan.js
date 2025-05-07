const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const multer = require('multer');
const NodeClam = require('clamscan');
const os = require('os');
const path = require('path');
const fs = require('fs');

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

// Initialize ClamAV scanner with proper configuration
const initClamScan = async () => {
  try {
    const clamscan = await new NodeClam().init({
      removeInfected: true,
      quarantineInfected: false,
      scanLog: null,
      debugMode: true,
      fileList: null,
      scanRecursively: true,
      clamscan: {
        path: 'C:\\Program Files\\ClamAV\\clamscan.exe',
        db: null,
        scanArchives: true,
        active: true
      },
      clamdscan: {
        socket: null,
        host: '127.0.0.1',
        port: 3310,
        timeout: 60000,
        localFallback: true,
        path: 'C:\\Program Files\\ClamAV\\clamdscan.exe',
        multiscan: true,
        reloadDb: false,
        active: true,
        bypassTest: false
      },
      preference: 'clamscan'
    });
    return clamscan;
  } catch (error) {
    console.error('ClamAV initialization error:', error);
    throw error;
  }
};

// File scanning route
router.post('/scan', auth, upload.single('file'), async (req, res) => {
  let tempFilePath = null;
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const fileName = req.file.originalname;
    const fileBuffer = req.file.buffer;

    // Create a temporary file for scanning
    tempFilePath = path.join(os.tmpdir(), `scan-${Date.now()}-${fileName}`);
    fs.writeFileSync(tempFilePath, fileBuffer);

    // Initialize ClamAV scanner
    const clamscan = await initClamScan();
    
    // Scan the temporary file
    const {isInfected, viruses} = await clamscan.isInfected(tempFilePath);

    // Save scan result to user's history
    const user = await User.findById(req.user._id);
    user.fileScanHistory.push({
      fileName,
      scanDate: new Date(),
      isInfected,
      viruses: viruses || []
    });
    await user.save();

    // Return scan results
    res.json({
      fileName,
      isInfected,
      viruses: viruses || [],
      scanDate: new Date()
    });

  } catch (error) {
    console.error('File scan error:', error);
    res.status(500).json({ 
      error: 'Error scanning file',
      details: error.message
    });
  } finally {
    // Clean up temporary file
    if (tempFilePath && fs.existsSync(tempFilePath)) {
      try {
        fs.unlinkSync(tempFilePath);
      } catch (error) {
        console.error('Error cleaning up temporary file:', error);
      }
    }
  }
});

// Get user's file scan history
router.get('/history', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('fileScanHistory');
    res.json(user.fileScanHistory);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching scan history' });
  }
});

module.exports = router; 