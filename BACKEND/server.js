
require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000; // Define your server port

// Middleware
app.use(cors()); // Enable CORS for all origins (adjust for production)
app.use(express.json()); // Body parser for JSON requests

// API Routes
// Make sure these paths match your frontend API calls
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products')); // Uncomment or add if you use product routes
app.use('/api/orders', require('./routes/orders'));     // Uncomment or add if you use order routes

// Connect to MongoDB and Start Server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully!');
    app.listen(PORT, () => console.log(`Server running on http://localhost:3000`));
  })
  .catch(err => console.error('MongoDB connection error:', err));