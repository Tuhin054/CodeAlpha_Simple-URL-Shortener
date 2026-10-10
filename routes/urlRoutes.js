// Import Express and the URL controller functions.
const express = require('express');
const { shortenUrl, redirectUrl } = require('../controllers/urlController');

// Create a router to keep URL endpoints together.
const router = express.Router();

// Map the shorten endpoint to its controller function.
router.post('/shorten', shortenUrl);

// Map short-code requests to the redirect controller function.
router.get('/:shortCode', redirectUrl);

// Export the routes for use by server.js.
module.exports = router;
