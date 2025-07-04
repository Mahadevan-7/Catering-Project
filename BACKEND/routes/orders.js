const express = require('express');
const router = express.Router();
const Order = require('../models/Order'); // Import your Order model

// GET all orders
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find({}); 
        console.log(orders);
        // Fetch all orders from the database
        res.status(200).json(orders);
    } catch (err) {
        console.error('Error fetching orders:', err);
        res.status(500).json({ message: 'Server error: Could not fetch orders.' });
    }
});

// You can add more routes here, e.g., to create an order, get a single order, update, or delete.
// Example: Route to create a new order (when someone purchases)
router.post('/', async (req, res) => {
<<<<<<< HEAD
    const { items, total } = req.body;
=======
    const { email, customerName, phone, address, items, total, status, eventType } = req.body;
>>>>>>> 803d5a750a0485a0e95dbe3804c432fe47ea36fc

    // Basic validation
    if (!items || !total) {
        return res.status(400).json({ message: 'Missing required order details.' });
    }

    try {
        const newOrder = new Order({
<<<<<<< HEAD
=======
            email,
            customerName,
            phone,
            address,
>>>>>>> 803d5a750a0485a0e95dbe3804c432fe47ea36fc
            items,
            total,
            status,
            eventType
        });

        await newOrder.save();
        res.status(201).json({ message: 'Order placed successfully!', order: newOrder });
    } catch (err) {
        console.error('Error creating order:', err);
        res.status(500).json({ message: 'Server error: Could not place order.' });
    }
});

// PUT route to update an order by ID (admin only)
router.put('/:id', async (req, res) => {
    try {
        const orderId = req.params.id;
        const updateData = req.body;
        const updatedOrder = await Order.findByIdAndUpdate(orderId, updateData, { new: true });
        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found.' });
        }
        res.status(200).json({ message: 'Order updated successfully.', order: updatedOrder });
    } catch (err) {
        console.error('Error updating order:', err);
        res.status(500).json({ message: 'Server error: Could not update order.' });
    }
});

module.exports = router;