require('dotenv').config(); 

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000; 


app.use(cors()); 
app.use(express.json()); 


app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products')); 
app.use('/api/orders', require('./routes/orders'));
app.use('/api/contact', require('./routes/contact'));


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully!');
    app.listen(PORT, () => console.log(`Server running on http://localhost:3000`));
  })
  .catch(err => console.error('MongoDB connection error:', err));