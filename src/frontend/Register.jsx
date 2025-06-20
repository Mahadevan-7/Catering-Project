import * as React from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid, TextField, Divider, Box } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

const Register = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <Card sx={{ width: 800, height: 500, borderRadius: 4, boxShadow: 6, display: 'flex', flexDirection: 'row', overflow: 'hidden' }}>
        <Box sx={{ width: '45%', height: '100%', background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src="/signup.jpg" alt="Sign up visual" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </Box>
        <Box sx={{ width: '55%', p: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography variant="h5" fontWeight={700} mb={2} align="center" sx={{ fontSize: '1.6rem' }}>Sign Up</Typography>
          <form>
            <Grid container spacing={1.5} direction="column" alignItems="center" justifyContent="center">
              <Grid item xs={12} sx={{ width: '100%' }}>
                <Box display="flex" gap={1.5}>
                  <TextField label="First Name" variant="outlined" fullWidth required size="small" InputLabelProps={{ style: { fontSize: '0.95rem' } }} inputProps={{ style: { fontSize: '0.95rem' } }} />
                  <TextField label="Last Name" variant="outlined" fullWidth required size="small" InputLabelProps={{ style: { fontSize: '0.95rem' } }} inputProps={{ style: { fontSize: '0.95rem' } }} />
                </Box>
              </Grid>
              <Grid item xs={12} sx={{ width: '100%' }}>
                <TextField label="Email" type="email" variant="outlined" fullWidth required size="small" InputLabelProps={{ style: { fontSize: '0.95rem' } }} inputProps={{ style: { fontSize: '0.95rem' } }} />
              </Grid>
              <Grid item xs={12} sx={{ width: '100%' }}>
                <Box display="flex" gap={1.5}>
                  <TextField label="Password" type="password" variant="outlined" fullWidth required size="small" InputLabelProps={{ style: { fontSize: '0.95rem' } }} inputProps={{ style: { fontSize: '0.95rem' } }} />
                  <TextField label="Re-enter Password" type="password" variant="outlined" fullWidth required size="small" InputLabelProps={{ style: { fontSize: '0.95rem' } }} inputProps={{ style: { fontSize: '0.95rem' } }} />
                </Box>
              </Grid>
              <Grid item xs={12} sx={{ width: '100%' }}>
                <Button variant="contained" color="primary" fullWidth sx={{ py: 1, fontWeight: 700, fontSize: '1rem', mt: 1 }}>
                  Sign Up
                </Button>
              </Grid>
              <Grid item xs={12} sx={{ width: '100%' }}>
                <Divider sx={{ my: 1.5, fontSize: '0.95rem' }}>or</Divider>
                <Button variant="outlined" color="primary" fullWidth startIcon={<GoogleIcon />} sx={{ py: 1, fontWeight: 700, fontSize: '1rem' }}>
                  Sign up with Google
                </Button>
              </Grid>
              <Grid item xs={12} sx={{ width: '100%' }}>
                <Typography align="center" mt={1.5} sx={{ fontSize: '0.95rem' }}>
                  Already have an account? <a href="/log">Sign in</a>
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