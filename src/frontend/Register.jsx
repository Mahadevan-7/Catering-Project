import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid, TextField, Divider, Box } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  // State for form inputs
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [reEnterPassword, setReEnterPassword] = useState('');
  // State for displaying messages to the user
  const [message, setMessage] = useState('');
  // Hook for programmatic navigation
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      navigate('/');
    }
  }, [navigate]);

  // Handle form submission for registration
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default browser form submission

    setMessage(''); // Clear any previous messages

    // Client-side password confirmation check
    if (password !== reEnterPassword) {
      setMessage('Passwords do not match!');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `${firstName} ${lastName}`, // Combine first and last name
          email,
          password,
        }),
      });

      const data = await response.json(); // Parse the JSON response from the backend

      if (response.ok) { // If the response status is in the 2xx range (e.g., 201 Created)
        setMessage(data.message || 'Registration successful!');
        // Redirect the user to the login page after successful registration
        navigate('/log'); // Navigating to /log (login page)
      } else { // If the response status is an error (e.g., 409 Conflict, 400 Bad Request)
        setMessage(data.message || 'Registration failed. Please try again.');
        console.error('Registration error:', data.message);
      }
    } catch (error) { // Catch network errors or other exceptions
      setMessage('Network error. Please try again later.');
      console.error('Fetch error during registration:', error);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', padding: '20px 0' }}>
      <Card sx={{
        width: { xs: '95%', sm: 600, md: 800 },
        height: { xs: 'auto', md: 500 },
        borderRadius: 4,
        boxShadow: 6,
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        overflow: 'hidden'
      }}>
        <Box sx={{
          width: { xs: '100%', md: '45%' },
          height: { xs: 200, md: '100%' },
          background: '#f5f5f5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <img src="/signup.jpg" alt="Sign up visual" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </Box>
        <Box sx={{
          width: { xs: '100%', md: '55%' },
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <Typography variant="h5" fontWeight={700} mb={2} align="center" sx={{ fontSize: '1.6rem' }}>Sign Up</Typography>
          <form onSubmit={handleSubmit}> {/* ADDED onSubmit handler */}
            <Grid container spacing={1.5} direction="column" alignItems="center" justifyContent="center">
              <Grid item xs={12} sx={{ width: '100%' }}>
                <Box display="flex" gap={1.5} sx={{ flexDirection: { xs: 'column', sm: 'row' } }}>
                  <TextField
                    label="First Name"
                    variant="outlined"
                    fullWidth
                    required
                    size="small"
                    InputLabelProps={{ style: { fontSize: '0.95rem' } }}
                    inputProps={{ style: { fontSize: '0.95rem' } }}
                    value={firstName} // CONNECTED TO STATE
                    onChange={(e) => setFirstName(e.target.value)} // UPDATES STATE
                  />
                  <TextField
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                    required
                    size="small"
                    InputLabelProps={{ style: { fontSize: '0.95rem' } }}
                    inputProps={{ style: { fontSize: '0.95rem' } }}
                    value={lastName} // CONNECTED TO STATE
                    onChange={(e) => setLastName(e.target.value)} // UPDATES STATE
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sx={{ width: '100%' }}>
                <TextField
                  label="Email"
                  type="email"
                  variant="outlined"
                  fullWidth
                  required
                  size="small"
                  InputLabelProps={{ style: { fontSize: '0.95rem' } }}
                  inputProps={{ style: { fontSize: '0.95rem' } }}
                  value={email} // CONNECTED TO STATE
                  onChange={(e) => setEmail(e.target.value)} // UPDATES STATE
                />
              </Grid>
              <Grid item xs={12} sx={{ width: '100%' }}>
                <Box display="flex" gap={1.5} sx={{ flexDirection: { xs: 'column', sm: 'row' } }}>
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
                  <TextField
                    label="Re-enter Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    required
                    size="small"
                    InputLabelProps={{ style: { fontSize: '0.95rem' } }}
                    inputProps={{ style: { fontSize: '0.95rem' } }}
                    value={reEnterPassword} // CONNECTED TO STATE
                    onChange={(e) => setReEnterPassword(e.target.value)} // UPDATES STATE
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sx={{ width: '100%' }}>
                <Button type="submit" variant="contained" color="primary" fullWidth className='signup-button' sx={{ py: 1, fontWeight: 700, fontSize: '1rem', mt: 1 }}>
                  Sign Up
                </Button>
              </Grid>
              <Grid item xs={12} sx={{ width: '100%' }}>
                <Divider sx={{ my: 1.5, fontSize: '0.95rem' }}>or</Divider>
                <Button variant="outlined" color="primary" fullWidth startIcon={<GoogleIcon />} className="google-signin-button" sx={{ py: 1, fontWeight: 700, fontSize: '1rem' }}>
                  Sign up with Google
                </Button>
              </Grid>
              <Grid item xs={12} sx={{ width: '100%' }}>
                {message && (
                  <Typography color="error" align="center" mt={1.5} sx={{ fontSize: '0.95rem' }}>
                    {message}
                  </Typography>
                )}
                <Typography align="center" mt={1.5} sx={{ fontSize: '0.95rem' }}>
                  Already have an account? <a className='a-link' href="/log">Sign in</a>
                </Typography>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Card>
    </div>
  );
}

export default Register;
