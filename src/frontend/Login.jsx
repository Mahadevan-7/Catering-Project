import React from 'react';
import { Card, Button, Typography, Grid, TextField, Divider, Box } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

const Login = () => {
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
          <form>
            <Grid container spacing={1.5} direction="column" alignItems="center" justifyContent="center">
              <Grid item xs={12} sx={{ width: { xs: '100%', sm: '80%' } }}>
                <TextField label="Full Name" variant="outlined" fullWidth required size="small" InputLabelProps={{ style: { fontSize: '0.95rem' } }} inputProps={{ style: { fontSize: '0.95rem' } }} />
              </Grid>
              <Grid item xs={12} sx={{ width: { xs: '100%', sm: '80%' } }}>
                <TextField label="Password" type="password" variant="outlined" fullWidth required size="small" InputLabelProps={{ style: { fontSize: '0.95rem' } }} inputProps={{ style: { fontSize: '0.95rem' } }} />
              </Grid>
              <Grid item xs={12} sx={{ width: { xs: '100%', sm: '80%' } }}>
                <Button variant="contained" color="primary" className='signup-button' fullWidth sx={{ py: 1, fontWeight: 700, fontSize: '1rem', mt: 1 }}>
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
                <Typography align="center" mt={1.5} sx={{ fontSize: '0.95rem' }}>
                  New User? <a href="/reg">Sign up</a>
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