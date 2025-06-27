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

const Products = () => {
    const [prod, setProd] = useState([]);
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const [openCart, setOpenCart] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:3001/products")
            .then(res => setProd(res.data));
    }, []);

    const addToCart = (item) => {
        const existingIndex = cart.findIndex(cartItem => cartItem.id === item.id);
        let updatedCart;

        if (existingIndex !== -1) {
            updatedCart = cart.map((cartItem, index) => {
                if (index === existingIndex) {
                    return { ...cartItem, qty: cartItem.qty + 1 };
                }
                return cartItem;
            });
        } else {
            updatedCart = [...cart, { ...item, qty: 1 }];
        }

        setCart(updatedCart);
        updateTotal(updatedCart);
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
                    sx={{
                        position: 'fixed',
                        bottom: 24,
                        right: 24,
                        zIndex: 1200,
                        boxShadow: 4
                    }}
                    onClick={() => setOpenCart(true)}
                >
                    <Badge badgeContent={cart.reduce((acc, item) => acc + item.qty, 0)} color="secondary" invisible={cart.length === 0}>
                        <ShoppingCartIcon />
                    </Badge>
                </Fab>
            )}

            <Grid container spacing={4} justifyContent="center">
                {prod.map((val, index) => (
                    <Grid item key={index}>
                        <Card sx={{ maxWidth: 320, minHeight: 440, position: 'relative', borderRadius: 4, boxShadow: 6, backgroundColor: 'AppWorkspace' }}>
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
                                    <Fab size="small" aria-label="add" sx={{ boxShadow: 2, backgroundColor: 'white', '&:hover': { backgroundColor: '#222' } }} onClick={() => addToCart(val)}>
                                        <AddIcon sx={{ color: 'black','&:hover': { color:"#ffe082;" } }} />
                                    </Fab>
                                </div>

                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>

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
