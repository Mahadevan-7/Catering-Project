import React from 'react';
import { Box, Typography, Button, Card, CardContent } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'backgroundColor' }}>
      <Card sx={{ minWidth: 350, maxWidth: 420, borderRadius: 4, boxShadow: 6, p: 2, background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(4px)' }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 6 }}>
          <CheckCircleOutlineIcon sx={{ fontSize: 80, color: 'green', mb: 2 }} />
          <Typography variant="h4" fontWeight={700} color="Black" gutterBottom>
            Payment Successful!
          </Typography>
          <Typography variant="body1" color="Black" mb={3} align="center">
            Thank you for your payment. Your order has been placed successfully.
          </Typography>
          <Button variant="contained" color="primary" onClick={() => navigate('/')}>Go to Home</Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PaymentSuccess; 