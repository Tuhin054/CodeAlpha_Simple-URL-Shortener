// Load environment variables from the .env file.
require('dotenv').config();

// Import the packages used by the server.
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const urlRoutes = require('./routes/urlRoutes');

// Create the Express application.
const app = express();

// Read the port from .env, or use 3000 when it is not set.
const PORT = process.env.PORT || 3000;

// Allow requests from other origins and parse incoming JSON bodies.
app.use(cors());
app.use(express.json());

// Register the URL shortening and redirect routes.
app.use('/', urlRoutes);

// Connect to MongoDB before starting to accept requests.
async function startServer() {
  try {
    // Connect using the URI stored in .env.
    await mongoose.connect(process.env.MONGO_URI);

    // Start the server after the database connection succeeds.
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    // Show the connection error and stop if the server cannot start.
    console.error('Could not connect to MongoDB:', error.message);
    process.exit(1);
  }
}

// Run the server startup function.
startServer();
