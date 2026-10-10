// Import nanoid and the URL database model.
const { nanoid } = require('nanoid');
const Url = require('../models/Url');

// Create a short URL, or reuse the code when this URL already exists.
async function shortenUrl(req, res) {
  try {
    // Read the original URL from the JSON request body.
    const { originalUrl } = req.body;

    // Reject missing values and values that are not strings.
    if (typeof originalUrl !== 'string' || !originalUrl.trim()) {
      return res.status(400).json({ message: 'Please provide a valid URL.' });
    }

    // Use the built-in URL class to check that this is an HTTP(S) URL.
    let parsedUrl;
    try {
      parsedUrl = new URL(originalUrl);
    } catch {
      return res.status(400).json({ message: 'Please provide a valid URL.' });
    }
    if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
      return res.status(400).json({ message: 'URL must start with http:// or https://.' });
    }

    // Reuse the saved short code instead of creating a duplicate record.
    let savedUrl = await Url.findOne({ originalUrl });
    if (!savedUrl) {
      // Generate a unique seven-character code and save the URL details.
      savedUrl = await Url.create({
        shortCode: nanoid(7),
        originalUrl,
        createdAt: new Date()
      });
    }

    // Return a short URL that can be opened in the browser.
    return res.json({
      shortUrl: `http://localhost:${process.env.PORT || 3000}/${savedUrl.shortCode}`
    });
  } catch (error) {
    // Report unexpected database or server errors as HTTP 500.
    console.error('Could not shorten URL:', error.message);
    return res.status(500).json({ message: 'Server error while shortening URL.' });
  }
}

// Redirect a short code to its original URL.
async function redirectUrl(req, res) {
  try {
    // Look up the requested code in MongoDB.
    const savedUrl = await Url.findOne({ shortCode: req.params.shortCode });

    // Return a clear not-found response when the code does not exist.
    if (!savedUrl) {
      return res.status(404).json({ message: 'Short URL not found.' });
    }

    // Send an HTTP 302 redirect to the original address.
    return res.redirect(302, savedUrl.originalUrl);
  } catch (error) {
    // Report unexpected database or server errors as HTTP 500.
    console.error('Could not find short URL:', error.message);
    return res.status(500).json({ message: 'Server error while looking up URL.' });
  }
}

// Export the handlers for use by urlRoutes.js.
module.exports = { shortenUrl, redirectUrl };
