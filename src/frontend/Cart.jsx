import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import RemoveIcon from '@mui/icons-material/Remove';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';

const Cart = ({ cart, setCart, total, setTotal, onClose }) => {
    // Count quantities of each item
    const items = cart;
    const navigate = useNavigate()

    const n = (t, cart) => {
        navigate('/pay', { state: { t, cart } });
    };


    const removeItem = (id) => {
        const updatedCart = cart.map(item => {
            if (item.id === id) {
                return { ...item, qty: item.qty - 1 };
            }
            return item;
        }).filter(item => item.qty > 0);

        setCart(updatedCart);
        const newTotal = updatedCart.reduce((acc, item) => acc + item.price * item.qty, 0);
        setTotal(newTotal);
    };


    return (
        <Paper elevation={4} sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            p: 2,
            bgcolor: 'white',
            zIndex: 1000,
            borderRadius: 2,
            minWidth: 280,
            maxHeight: 400,
            overflowY: 'auto',
        }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" gutterBottom>🛒 Cart</Typography>
                <IconButton size="small" onClick={onClose}><CloseIcon /></IconButton>
            </Box>
            {items.length === 0 ? (
                <Typography color="text.secondary" align="center" sx={{ my: 4 }}>
                    Your cart is empty.
                </Typography>
            ) : (
                items.map((item) => (
                    <Box key={item.id} sx={{ mb: 1 }}>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Typography variant="body2">
                                {item.title.substring(0, 20)}... × {item.qty}
                            </Typography>
                            <IconButton size="small" onClick={() => removeItem(item.id)}>
                                <RemoveIcon fontSize="small" />
                            </IconButton>
                        </Box>
                        <Divider />
                    </Box>
                ))
            )}
            <Typography sx={{ mt: 2, fontWeight: 600 }}>
                Total: ₹{total.toFixed(2)}
            </Typography>
            {items.length > 0 && (
                <Button
                    variant="contained"
                    color="success"
                    style={{ color: "white" }}
                    onClick={() => n(total, cart)}
                >
                    Proceed to pay
                </Button>
            )}
        </Paper>
    );
};

export default Cart;
