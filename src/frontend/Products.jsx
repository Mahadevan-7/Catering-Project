import React, { useState, useEffect } from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import ShareIcon from '@mui/icons-material/Share';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import CardActions from '@mui/material/CardActions';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Cart from './Cart';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const Products = () => {
    const [prod, setProd] = useState([]);
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const [openCart, setOpenCart] = useState(false);
    const [customerDialogOpen, setCustomerDialogOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [customerInfo, setCustomerInfo] = useState({
        customerName: '',
        email: '',
        phone: '',
        address: '',
        eventType: 'General'
    });

    const eventTypes = ['Wedding', 'Birthday', 'Corporate', 'Anniversary', 'General'];

    useEffect(() => {
        axios.get("http://localhost:3001/products")
            .then(res => setProd(res.data));
    }, []);

    const handleAddToCartClick = (item) => {
        setSelectedProduct(item);
        setCustomerDialogOpen(true);
    };

    const handleCustomerInfoSubmit = async () => {
        if (!customerInfo.customerName || !customerInfo.email) {
            alert('Please fill in customer name and email');
            return;
        }

        // Add to cart
        const existingIndex = cart.findIndex(cartItem => cartItem.id === selectedProduct.id);
        let updatedCart;

        if (existingIndex !== -1) {
            updatedCart = cart.map((cartItem, index) => {
                if (index === existingIndex) {
                    return { ...cartItem, qty: cartItem.qty + 1 };
                }
                return cartItem;
            });
        } else {
            updatedCart = [...cart, { ...selectedProduct, qty: 1 }];
        }

        setCart(updatedCart);
        updateTotal(updatedCart);

        // Create order in backend with customer information
        try {
            const orderData = {
                email: customerInfo.email,
                customerName: customerInfo.customerName,
                phone: customerInfo.phone,
                address: customerInfo.address,
                items: [{ title: selectedProduct.title, qty: 1, price: selectedProduct.price }],
                total: selectedProduct.price,
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
                alert('Failed to create order. Please try again.');
            } else {
                console.log('Order created successfully');
                alert('Product added to cart and order created successfully!');
            }
        } catch (error) {
            console.error('Error creating order:', error);
            alert('Error creating order. Please try again.');
        }

        // Reset form and close dialog
        setCustomerInfo({
            customerName: '',
            email: '',
            phone: '',
            address: '',
            eventType: 'General'
        });
        setCustomerDialogOpen(false);
        setSelectedProduct(null);
    };

    const updateTotal = (cartItems) => {
        const newTotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
        setTotal(newTotal);
    };

    return (
        <Box sx={{ flexGrow: 1, p: 3, pt: 10, backgroundColor: 'inherit', minHeight: '100vh' }}>
            {/* Always show floating cart button, but hide when cart is open */}
            {!openCart && (
                <Fab
                    color="default"
                    aria-label="cart"
                    className="floating-cart-button"
                    title='Cart'
                    sx={{
                        position: 'fixed',
                        bottom: 24,
                        right: 24,
                        zIndex: 1200,
                        boxShadow: 4
                    }}
                    onClick={() => setOpenCart(true)}
                >
                    <Badge badgeContent={cart.reduce((acc, item) => acc + item.qty, 0)} color="secondary" invisible={cart.length === 0} className="cart-badge">
                        <ShoppingCartIcon />
                    </Badge>
                </Fab>
            )}

            <Grid container spacing={4} justifyContent="center">
                {prod.map((val, index) => (
                    <Grid item key={index}>
                        <Card className='prod-card' sx={{ maxWidth: 320, minHeight: 440, position: 'relative', borderRadius: 4, boxShadow: 6, backgroundColor: 'AppWorkspace' }}>
                            <CardMedia
                                sx={{ height: 180, objectFit: 'contain', p: 2 }}
                                image={val.image}
                                title={val.title}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h6" component="div" color="White">
                                     {val.title.substring(0, 20)}...
                                </Typography>
                                <Typography variant="body2" color="White" sx={{ mb: 1.5 }}>
                                    {val.description.substring(0, 100)}...
                                </Typography>
                                <Typography variant="body2" color="White" sx={{ fontWeight: 500 }}>
                                     ₹{val.price} per no.
                                </Typography>
                            </CardContent>

                            <CardActions sx={{ justifyContent: 'space-between', px: 2 }}>
                                <div className='Add-cart-but' style={{marginLeft:"125px"}}>
                                    <Fab size="small" aria-label="add" title='Add to Cart' sx={{ boxShadow: 2, backgroundColor: 'white', '&:hover': { backgroundColor: '#222' } }} onClick={() => handleAddToCartClick(val)}>
                                        <AddIcon sx={{ color: 'black','&:hover': { color:"#ffe082;" } }} />
                                    </Fab>
                                </div>

                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Customer Information Dialog */}
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
                        fullWidth
                        margin="normal"
                        value={customerInfo.phone}
                        onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
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
                    <Button onClick={handleCustomerInfoSubmit} variant="contained">Add to Cart</Button>
                </DialogActions>
            </Dialog>

            {openCart && (
                <Cart
                    cart={cart}
                    setCart={setCart}
                    total={total}
                    setTotal={setTotal}
                    onClose={() => setOpenCart(false)}
                />
            )}
        </Box>
    );
};

export default Products;