const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Test connection endpoint
router.get('/test-connection', auth, (req, res) => {
  res.json({
    status: 'success',
    message: 'Backend connection successful',
    user: {
      id: req.user._id,
      username: req.user.username,
      email: req.user.email
    },
    timestamp: new Date(),
    environment: process.env.NODE_ENV || 'development'
  });
});

module.exports = router; 