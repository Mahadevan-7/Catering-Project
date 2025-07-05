import { Button, Grid, IconButton, Card, CardContent, Typography, Divider, Box, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

const Payment = (props) => {

    const location = useLocation();
    const { t, cart } = location.state;

    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(t);
    const [customerDialogOpen, setCustomerDialogOpen] = useState(false);
    const [customerInfo, setCustomerInfo] = useState({
        customerName: '',
        email: '',
        phone: '',
        address: '',
        eventType: 'General'
    });

    const eventTypes = ['Wedding', 'Birthday', 'Corporate', 'Anniversary', 'General'];

    useEffect(() => {
        console.log("ok");
        setCartItems([...cart]);
        updateTotal(cart);
    }, []);

    const updateTotal = (items) => {
        const newTotal = items.reduce((acc, item) => acc + item.qty * item.price, 0);
        setTotal(newTotal);
    };

    const handleAdd = (index) => {
        const updated = [...cartItems];
        updated[index].qty += 1;
        setCartItems(updated);
        updateTotal(updated);
    };

    const handleRemove = (index) => {
        const updated = [...cartItems];
        if (updated[index].qty > 1) {
            updated[index].qty -= 1;
            setCartItems(updated);
            updateTotal(updated);
        }
    };

    const handleDelete = (index) => {
        const updated = cartItems.filter((_, i) => i !== index);
        setCartItems(updated);
        updateTotal(updated);

        if (updated.length === 0) {
            navigate('/prod'); 
        }
    };

    const navigate = useNavigate();

    
    const handlePayNow = () => {
        setCustomerDialogOpen(true);
    };

    
    const handleCustomerInfoSubmit = async () => {
        if (!customerInfo.customerName || !customerInfo.email) {
            alert('Please fill in customer name and email');
            return;
        }

        try {
            const orderData = {
                email: customerInfo.email,
                customerName: customerInfo.customerName,
                phone: customerInfo.phone ? Number(customerInfo.phone) : undefined,
                address: customerInfo.address || '',
                items: cartItems,
                total: Number(total),
                status: 'Pending',
                eventType: customerInfo.eventType
            };

            const response = await fetch('http://localhost:3000/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });

            if (!response.ok) {
                console.error('Failed to create order');
                alert('Failed to place order. Please try again.');
            } else {
                console.log('Order created successfully');
                
                setCustomerInfo({
                    customerName: '',
                    email: '',
                    phone: '',
                    address: '',
                    eventType: 'General'
                });
                setCustomerDialogOpen(false);
                navigate('/payment-success');
            }
        } catch (error) {
            console.error('Error creating order:', error);
            alert('Error placing order. Please try again.');
        }
    };

    return (
        <Box
            sx={{
                minHeight: '70vh',
                py: 6,
                backgroundColor: 'inherit'
            }}
        >
            <Grid container justifyContent="center" alignItems="flex-start">
                <Grid item xs={12} md={7} lg={5}>
                    <Card sx={{ borderRadius: 4, boxShadow: 6, p: 3 }}>
                        <CardContent>
                            <Typography variant="h4" align="center" gutterBottom color="primary" sx={{ fontWeight: 700 }}>
                                Payment
                            </Typography>
                            <Divider sx={{ mb: 3 }} />
                            <Typography variant="h6" sx={{ color: 'text.secondary', mb: 2, fontWeight: 600 }}>
                                Cart Items
                            </Typography>
                            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                                {cartItems.length === 0 ? (
                                    <Typography color="text.secondary" align="center" sx={{ my: 4 }}>
                                        Your cart is empty.
                                    </Typography>
                                ) : (
                                    cartItems.map((item, index) => (
                                        <Box key={index} component="li" sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            mb: 2,
                                            p: 2,
                                            background: '#f0f4f8',
                                            borderRadius: 2,
                                            boxShadow: '0 1px 4px rgba(0,0,0,0.04)'
                                        }}>
                                            <Box>
                                                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{item.title}</Typography>
                                                
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <IconButton className='ic' size="small" color="primary" onClick={() => handleRemove(index)}><RemoveIcon /></IconButton>
                                                <Typography>{item.qty}</Typography>
                                                <IconButton className='ic' size="small" color="primary" onClick={() => handleAdd(index)}><AddIcon /></IconButton>
                                                <IconButton className='ic' size="small" onClick={() => handleDelete(index)}><DeleteIcon color="error" /></IconButton>
                                            </Box>
                                        </Box>
                                    ))
                                )}
                            </Box>
                            <Divider sx={{ my: 3 }} />
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                    Total
                                </Typography>
                                <Typography variant="h5" color="primary" sx={{ fontWeight: 700 }}>
                                    ₹{total.toFixed(2)}
                                </Typography>
                            </Box>
                            <Button
                                variant='contained'
                                color='primary'
                                fullWidth
                                size="large"
                                sx={{ mt: 3, py: 1.5, fontWeight: 600, fontSize: '1.1rem', borderRadius: 2 }}
                                disabled={cartItems.length === 0}
                                onClick={handlePayNow}
                            >
                                Pay Now
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            
            <Dialog open={customerDialogOpen} onClose={() => setCustomerDialogOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Customer Information</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Customer Name *"
                        fullWidth
                        margin="normal"
                        value={customerInfo.customerName}
                        onChange={(e) => setCustomerInfo({...customerInfo, customerName: e.target.value})}
                        required
                    />
                    <TextField
                        label="Email *"
                        type="email"
                        fullWidth
                        margin="normal"
                        value={customerInfo.email}
                        onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                        required
                    />
                    <TextField
                        label="Phone"
                        type="tel"
                        fullWidth
                        margin="normal"
                        value={customerInfo.phone}
                        onChange={(e) => {
                            const value = e.target.value.replace(/[^0-9]/g, '');
                            setCustomerInfo({...customerInfo, phone: value});
                        }}
                        inputProps={{
                            pattern: "[0-9]*",
                            inputMode: "numeric"
                        }}
                    />
                    <TextField
                        label="Address"
                        fullWidth
                        margin="normal"
                        multiline
                        rows={3}
                        value={customerInfo.address}
                        onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                    />
                    <TextField
                        select
                        label="Event Type"
                        fullWidth
                        margin="normal"
                        value={customerInfo.eventType}
                        onChange={(e) => setCustomerInfo({...customerInfo, eventType: e.target.value})}
                    >
                        {eventTypes.map((type) => (
                            <MenuItem key={type} value={type}>{type}</MenuItem>
                        ))}
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setCustomerDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleCustomerInfoSubmit} variant="contained">Place Order</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Payment;
