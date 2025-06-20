import { Button, Grid, IconButton } from '@mui/material';
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
        <div>
            <h1>Payment</h1>

            <div className='pay'>
                {/* <Grid container spacing={2}>
                    <Grid size={6}> */}
                <div className='inner-pay'>
                    <h2 style={{ color: "black", marginBottom: "50px" }}>CART</h2>
                    <ul style={{ color: "black", listStyle: "none", padding: 0 }}>
                        {cartItems.map((item, index) => (
                            <li key={index} style={{
                                color: "white",
                                marginBottom: "15px",
                                padding: "10px",
                                background: "black",
                                borderRadius: "10px",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                            }}>
                                <strong>{item.title}</strong><br />
                                ₹{item.price} × {item.qty} = ₹{(item.qty * item.price).toFixed(2)}
                                <div className='pay-icons' style={{ marginTop: "8px"}}>
                                    <IconButton size="medium" sx={{color:"white"}} onClick={() => handleRemove(index)}><RemoveIcon /></IconButton>
                                    <IconButton size="medium" sx={{color:"white"}} onClick={() => handleAdd(index)}><AddIcon /></IconButton>
                                    <IconButton size="medium" onClick={() => handleDelete(index)}><DeleteIcon color="error" /></IconButton>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <p style={{ color: "black" }}>Total: ₹{total.toFixed(2)}</p>
                    <Button sx={{ marginTop: "200px", marginBottom: "20px" }} variant='contained' color='info'>Pay</Button>
                </div>
                {/* </Grid>
                </Grid> */}
            </div>

            {/* <h2>Items:</h2>
            <ul>
                {cart.map((item, index) => (
                    <li key={index}>
                        {item.title} × {item.qty} @ ₹{item.price} = ₹{(item.qty * item.price).toFixed(2)}
                    </li>
                ))}
            </ul>
            <p>Total: ₹{t.toFixed(2)}</p>

            <Button variant='contained' color='info'>Pay</Button> */}
        </div>
    );
};

export default Payment;
