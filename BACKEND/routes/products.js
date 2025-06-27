const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Example Product Routes (implement your actual logic here)
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Server error fetching products.' });
    }
});

// Add other product-related routes (e.g., POST, PUT, DELETE) here
// router.post('/', authenticateToken, async (req, res) => { ... });

module.exports = router;