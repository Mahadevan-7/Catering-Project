import React, { useState } from 'react';
import { Box, Button, TextField, Typography, MenuItem } from '@mui/material';

const eventTypes = ['Wedding', 'Birthday', 'Corporate', 'Anniversary'];

const OrderForm = ({ onOrderCreated }) => {
  const [form, setForm] = useState({
    customerName: '',
    orderDate: '',
    itemCount: 1,
    totalAmount: '',
    eventType: 'Wedding',
    status: 'Pending'
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const newOrder = {
      ...form,
      orderNumber: `ORD-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
      orderDate: new Date(form.orderDate).toISOString()
    };

    const res = await fetch('http://localhost:3000/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newOrder)
    });

    if (res.ok) {
      const created = await res.json();
      onOrderCreated?.(created); 
      alert("Order placed successfully!");
      setForm({ customerName: '', orderDate: '', itemCount: 1, totalAmount: '', eventType: 'Wedding', status: 'Pending' });
    } else {
      alert("Failed to place order");
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', p: 2 }}>
      <Typography variant="h6" gutterBottom>Add New Order</Typography>
      <TextField label="Customer Name" name="customerName" fullWidth margin="normal" value={form.customerName} onChange={handleChange} />
      <TextField type="date" label="Order Date" name="orderDate" fullWidth margin="normal" InputLabelProps={{ shrink: true }} value={form.orderDate} onChange={handleChange} />
      <TextField label="Item Count" name="itemCount" type="number" fullWidth margin="normal" value={form.itemCount} onChange={handleChange} />
      <TextField label="Total Amount" name="totalAmount" type="number" fullWidth margin="normal" value={form.totalAmount} onChange={handleChange} />
      <TextField select label="Event Type" name="eventType" fullWidth margin="normal" value={form.eventType} onChange={handleChange}>
        {eventTypes.map((type) => (
          <MenuItem key={type} value={type}>{type}</MenuItem>
        ))}
      </TextField>
      <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={handleSubmit}>Place Order</Button>
    </Box>
  );
};

export default OrderForm;
