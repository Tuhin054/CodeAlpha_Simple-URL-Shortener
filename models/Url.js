// Import Mongoose to define the URL document structure.
const mongoose = require('mongoose');

// Define the fields that each shortened URL stores.
const urlSchema = new mongoose.Schema({
  shortCode: {
    type: String,
    required: true,
    unique: true
  },
  originalUrl: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Export the model so routes can read and save URLs.
module.exports = mongoose.model('Url', urlSchema);
