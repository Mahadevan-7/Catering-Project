import { Button, Grid, IconButton, Card, CardContent, Typography, Divider, Box } from '@mui/material';
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
        navigate('/prod'); // Redirect to Products.jsx
    }
};


    const navigate = useNavigate();

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
                                href='/payment-success'
                            >
                                Pay Now
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Payment;
