const express = require('express');
const router = express.Router();
const Order = require('../models/Order'); // Import your Order model

// GET all orders
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find({}); // Fetch all orders from the database
        res.status(200).json(orders);
    } catch (err) {
        console.error('Error fetching orders:', err);
        res.status(500).json({ message: 'Server error: Could not fetch orders.' });
    }
});

// You can add more routes here, e.g., to create an order, get a single order, update, or delete.
// Example: Route to create a new order (when someone purchases)
router.post('/', async (req, res) => {
    const { email, items, total } = req.body;

    // Basic validation
    if (!email || !items || !total) {
        return res.status(400).json({ message: 'Missing required order details.' });
    }

    try {
        const newOrder = new Order({
            email,
            items,
            total,
        });

        await newOrder.save();
        res.status(201).json({ message: 'Order placed successfully!', order: newOrder });
    } catch (err) {
        console.error('Error creating order:', err);
        res.status(500).json({ message: 'Server error: Could not place order.' });
    }
});


module.exports = router;