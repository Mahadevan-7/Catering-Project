const express = require('express');
const router = express.Router();
const Order = require('../models/Order'); 

router.get('/', async (req, res) => {
    try {
        const orders = await Order.find({}); 
        console.log(orders);
        
        res.status(200).json(orders);
    } catch (err) {
        console.error('Error fetching orders:', err);
        res.status(500).json({ message: 'Server error: Could not fetch orders.' });
    }
});


router.post('/', async (req, res) => {
    const { email, customerName, phone, address, items, total, status, eventType } = req.body;

   
    if (!email || !customerName || !items || !total) {
        return res.status(400).json({ message: 'Missing required order details (email, customerName, items, total).' });
    }

    try {
        const newOrder = new Order({
            email,
            customerName,
            phone: phone ? Number(phone) : undefined,
            address: address || '',
            items,
            total: Number(total),
            status: status || 'Pending',
            eventType: eventType || 'General'
        });

        await newOrder.save();
        res.status(201).json({ message: 'Order placed successfully!', order: newOrder });
    } catch (err) {
        console.error('Error creating order:', err);
        res.status(500).json({ message: 'Server error: Could not place order.' });
    }
});


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