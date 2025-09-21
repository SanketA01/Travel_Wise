
// Import required packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // To use environment variables from .env file

// Initialize the Express app
const app = express();
const PORT = process.env.PORT || 5000;

// --- Step 1: Log that the script is starting ---
console.log('Server script starting...');

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // To parse JSON bodies in requests

// --- Step 2: Check for MONGO_URI ---
const mongoURI = process.env.MONGO_URI;
console.log('Attempting to connect to MongoDB...');

if (!mongoURI) {
  console.error('FATAL ERROR: MONGO_URI is not defined in the .env file.');
  process.exit(1); // Exit the application if the database connection string is missing
}

// --- Step 3: Connect to the Database ---
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
    console.log('MongoDB connected successfully.');

    // --- Step 4: Start the server ONLY after the DB connection is successful ---
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch(err => {
    console.error('MongoDB connection error:', err.message);
    console.log('\nTROUBLESHOOTING TIPS:');
    console.log('1. Double-check the password in your MONGO_URI in the .env file.');
    console.log('2. Ensure your current IP address is whitelisted in MongoDB Atlas under "Network Access".');
    console.log('3. Verify the username and database name in the connection string are correct.');
    process.exit(1); // Exit the application on a connection error
});


// --- API Routes ---

// Helper function to validate imported router modules
function validateRouter(routerModule, moduleName) {
  if (typeof routerModule !== 'function') {
    console.error(`\nFATAL ERROR: The module '${moduleName}' did not export a valid Express Router.`);
    console.error(`This is likely due to a syntax error or a missing 'module.exports = router;' in the file.`);
    console.error(`Please check ${moduleName} and restart the server.`);
    process.exit(1);
  }
  return routerModule;
}


// This is a placeholder for a basic root endpoint
app.get('/', (req, res) => {
  res.send('Welcome to the TravelWise API!');
});

// Import and use route files with validation
const authRoutes = require('./routes/auth');
const itineraryRoutes = require('./routes/itinerary');
const aiFeaturesRoutes = require('./routes/aiFeatures');

app.use('/api/auth', validateRouter(authRoutes, './routes/auth.js'));
app.use('/api/itinerary', validateRouter(itineraryRoutes, './routes/itinerary.js'));
app.use('/api/ai', validateRouter(aiFeaturesRoutes, './routes/aiFeatures.js'));

