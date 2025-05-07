const express = require('express');
const router = express.Router();
const axios = require('axios');
const jwt = require('jsonwebtoken');

// Store request counts and timestamps
let requestCount = 0;
let lastResetTime = Date.now();
const HOUR_IN_MS = 3600000;
const MAX_REQUESTS_PER_HOUR = 50;
const MAX_REQUESTS_PER_BATCH = 10;
const MAX_ARTICLES_FOR_GUEST = 18;

// Middleware to check rate limits
const checkRateLimit = (req, res, next) => {
    const now = Date.now();
    
    // Reset counter if an hour has passed
    if (now - lastResetTime >= HOUR_IN_MS) {
        requestCount = 0;
        lastResetTime = now;
    }

    // Check if we've exceeded the hourly limit
    if (requestCount >= MAX_REQUESTS_PER_HOUR) {
        return res.status(429).json({
            error: 'Rate limit exceeded',
            message: 'You have reached the maximum number of requests (50) for this hour. Please try again later.',
            resetTime: new Date(lastResetTime + HOUR_IN_MS).toISOString()
        });
    }

    next();
};

// Middleware to check authentication
const checkAuth = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
        } catch (error) {
            // Token is invalid, treat as guest
        }
    }
    next();
};

// Get cybersecurity news
router.get('/cybersecurity', checkRateLimit, checkAuth, async (req, res) => {
    try {
        const { page = 1, pageSize = 10 } = req.query;
        const apiKey = process.env.NEWSAPI_KEY;
        const isAuthenticated = !!req.user;
        
        // Increment request counter
        requestCount++;

        const response = await axios.get('https://newsapi.org/v2/everything', {
            params: {
                q: 'cybersecurity OR "cyber security" OR "data breach" OR "hacking" OR "malware" OR "ransomware"',
                language: 'en',
                sortBy: 'publishedAt',
                pageSize: Math.min(pageSize, MAX_REQUESTS_PER_BATCH),
                page,
                apiKey
            }
        });

        // Add rate limit information to response
        const rateLimitInfo = {
            remainingRequests: MAX_REQUESTS_PER_HOUR - requestCount,
            resetTime: new Date(lastResetTime + HOUR_IN_MS).toISOString(),
            isAuthenticated,
            maxArticles: isAuthenticated ? null : MAX_ARTICLES_FOR_GUEST
        };

        // Limit articles for non-authenticated users
        if (!isAuthenticated) {
            response.data.articles = response.data.articles.slice(0, MAX_ARTICLES_FOR_GUEST);
            response.data.totalResults = Math.min(response.data.totalResults, MAX_ARTICLES_FOR_GUEST);
        }

        res.json({
            ...response.data,
            rateLimit: rateLimitInfo
        });
    } catch (error) {
        console.error('Error fetching news:', error);
        res.status(500).json({ error: 'Failed to fetch news articles' });
    }
});

module.exports = router; 