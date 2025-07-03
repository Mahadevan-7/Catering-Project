import React, { useState, useEffect } from 'react';
import { Card, Button, Typography, Grid, TextField, Divider, Box } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      navigate('/');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage('');

    // Check for admin credentials
    if (email === 'admin@catering.com' && password === 'vmcj') {
      setMessage('Admin login successful!');
      sessionStorage.setItem('token', 'admin-token');
      sessionStorage.setItem('userRole', 'admin');
      window.location.href = '/dash'; // Force reload to dashboard
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || 'Login successful!');
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('userRole', 'user');
        window.location.href = '/'; // Force reload to home
      } else {
        setMessage(data.error || data.message || 'Login failed. Please check your credentials.');
        console.error('Login error:', data.error || data.message);
      }
    } catch (error) {
      setMessage('Network error. Please try again later.');
      console.error('Fetch error during login:', error);
    }
  };

  return (
    <div id='glass' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', padding: '20px 0' }}>
      <Card sx={{
        width: { xs: '95%', sm: 600, md: 700 },
        height: { xs: 'auto', md: 400 },
        borderRadius: 4,
        boxShadow: 6,
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        overflow: 'hidden'
      }}>
        <Box id='glass' sx={{
          width: { xs: '100%', md: '45%' },
          height: { xs: 200, md: '100%' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <img src="/signin.jpg" alt="Sign in visual" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </Box>
        <Box sx={{
          width: { xs: '100%', md: '55%' },
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <Typography variant="h5" fontWeight={700} mb={2} align="center" sx={{ fontSize: '1.6rem' }}>Sign In</Typography>
          <form onSubmit={handleSubmit}> {/* ADDED onSubmit handler */}
            <Grid container spacing={1.5} direction="column" alignItems="center" justifyContent="center">
              <Grid item xs={12} sx={{ width: { xs: '100%', sm: '80%' } }}>
                <TextField
                  label="Email" 
                  type="email" 
                  variant="outlined"
                  fullWidth
                  required
                  size="small"
                  InputLabelProps={{ style: { fontSize: '0.95rem' } }}
                  inputProps={{ style: { fontSize: '0.95rem' } }}
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                />
              </Grid>
              <Grid item xs={12} sx={{ width: { xs: '100%', sm: '80%' } }}>
                <TextField
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  required
                  size="small"
                  InputLabelProps={{ style: { fontSize: '0.95rem' } }}
                  inputProps={{ style: { fontSize: '0.95rem' } }}
                  value={password} // CONNECTED TO STATE
                  onChange={(e) => setPassword(e.target.value)} // UPDATES STATE
                />
              </Grid>
              <Grid item xs={12} sx={{ width: { xs: '100%', sm: '80%' } }}>
                <Button type="submit" variant="contained" color="primary" className='signup-button' fullWidth sx={{ py: 1, fontWeight: 700, fontSize: '1rem', mt: 1 }}>
                  Sign In
                </Button>
              </Grid>
              <Grid item xs={12} sx={{ width: { xs: '100%', sm: '80%' } }}>
                <Divider sx={{ my: 1.5, fontSize: '0.95rem' }}>or</Divider>
                <Button variant="outlined" color="primary" fullWidth startIcon={<GoogleIcon />} className="google-signin-button" sx={{ py: 1, fontWeight: 700, fontSize: '0.85rem' }}>
                  Sign in with Google
                </Button>
              </Grid>
              <Grid item xs={12} sx={{ width: '100%' }}>
                {message && (
                  <Typography color="error" align="center" mt={1.5} sx={{ fontSize: '0.95rem' }}>
                    {message}
                  </Typography>
                )}
                <Typography align="center" mt={1.5} sx={{ fontSize: '0.95rem' }}>
                  New User? <a href="/reg" className='a-link' >Sign up</a>
                </Typography>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Card>
    </div>
  );
}

export default Login;
