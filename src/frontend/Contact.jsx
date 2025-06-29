import React, { useState } from 'react';
import { 
    TextField, 
    Button, 
    Box, 
    Typography, 
    Container, 
    Grid, 
    Paper,
    Snackbar,
    Alert
} from '@mui/material';
import { 
    Phone, 
    Email, 
    LocationOn, 
    AccessTime 
} from '@mui/icons-material';
import WhatsAppContact from './WhatsAppContact';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the form data to your backend
        console.log('Form submitted:', formData);
        
        // Show success message
        setSnackbar({
            open: true,
            message: 'Thank you for your message! We will get back to you soon.',
            severity: 'success'
        });

        // Reset form
        setFormData({
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: ''
        });
    };

    const handleCloseSnackbar = () => {
        setSnackbar(prev => ({ ...prev, open: false }));
    };

    return (
        <div className="contact-container">
            <WhatsAppContact />
            
            <Box sx={{ display: 'flex', minHeight: 'calc(100vh - 200px)', mt: 8 }}>
                {/* Left Half - Contact Information */}
                <Box 
                    sx={{ 
                        width: '50%',
                        background: 'rgba(0, 0, 0, 0.8)',
                        color: 'white',
                        p: 6,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        backdropFilter: 'blur(10px)'
                    }}
                >
                    <Typography 
                        variant="h1" 
                        gutterBottom 
                        sx={{ 
                            fontSize: '48px',
                            fontWeight: 'bolder',
                            color: '#ffd54f',
                            mb: 4,
                            fontFamily: 'system-ui, Avenir, Helvetica, Arial, sans-serif'
                        }}
                    >
                        We'd love to hear from you!
                    </Typography>
                    
                    <Typography 
                        variant="body1" 
                        paragraph 
                        sx={{ 
                            fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)',
                            lineHeight: '1.6',
                            color: 'white',
                            mb: 6,
                            fontFamily: 'system-ui, Avenir, Helvetica, Arial, sans-serif'
                        }}
                    >
                        Whether you're planning a wedding, corporate event, birthday celebration, or any special occasion, 
                        we're here to help make your event delicious and memorable. Get in touch with us for custom menus, 
                        pricing, bookings, or any other inquiries.
                    </Typography>

                    <Box sx={{ mb: 6 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                            <LocationOn sx={{ mr: 3, color: '#ffd54f', fontSize: '1.8rem' }} />
                            <Typography 
                                variant="body1" 
                                sx={{ 
                                    fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)',
                                    color: 'white',
                                    fontFamily: 'system-ui, Avenir, Helvetica, Arial, sans-serif'
                                }}
                            >
                                Address: 123 Food Street, Flavor Town
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                            <Phone sx={{ mr: 3, color: '#ffd54f', fontSize: '1.8rem' }} />
                            <Typography 
                                variant="body1" 
                                sx={{ 
                                    fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)',
                                    color: 'white',
                                    fontFamily: 'system-ui, Avenir, Helvetica, Arial, sans-serif'
                                }}
                            >
                                Phone: +91 98765 43210
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                            <Email sx={{ mr: 3, color: '#ffd54f', fontSize: '1.8rem' }} />
                            <Typography 
                                variant="body1" 
                                sx={{ 
                                    fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)',
                                    color: 'white',
                                    fontFamily: 'system-ui, Avenir, Helvetica, Arial, sans-serif'
                                }}
                            >
                                Email: contact@silverspoon.com
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 6 }}>
                            <AccessTime sx={{ mr: 3, color: '#ffd54f', fontSize: '1.8rem' }} />
                            <Typography 
                                variant="body1" 
                                sx={{ 
                                    fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)',
                                    color: 'white',
                                    fontFamily: 'system-ui, Avenir, Helvetica, Arial, sans-serif'
                                }}
                            >
                                Working Hours: Mon–Sun | 9:00 AM – 9:00 PM
                            </Typography>
                        </Box>
                    </Box>

                    <Typography 
                        variant="body1" 
                        paragraph 
                        sx={{ 
                            fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)',
                            lineHeight: '1.6',
                            color: 'white',
                            mb: 4,
                            fontFamily: 'system-ui, Avenir, Helvetica, Arial, sans-serif'
                        }}
                    >
                        You can also fill out the form on the right and we'll get back to you as soon as possible.
                    </Typography>

                    <Typography 
                        variant="body1" 
                        sx={{ 
                            fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)',
                            lineHeight: '1.6',
                            color: '#C0C0C0',
                            fontStyle: 'italic',
                            fontFamily: 'system-ui, Avenir, Helvetica, Arial, sans-serif'
                        }}
                    >
                        Thank you for choosing Silver Spoon Catering – where every dish is made with love!
                    </Typography>
                </Box>

                
                <Box 
                    sx={{ 
                        width: '50%',
                        p: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        background: 'translucent',
                        backdropFilter: 'blur(10px)',
                        pt: 8
                    }}
                >
                    <Typography 
                        variant="h3" 
                        gutterBottom 
                        sx={{ 
                            fontSize: '40px',
                            fontWeight: 'bold',
                            color: '#ffd54f',
                            mb: 6,
                            mr: 8,
                            fontFamily: 'system-ui, Avenir, Helvetica, Arial, sans-serif'
                        }}
                    >
                        Send us a Message
                    </Typography>
                    
                    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
                        <Grid container spacing={2}>
                            <Grid item md={6} xs={12} sm={6} sx={{ml:1.5}}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    sx={{ 
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: '#ffd54f',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#ffd54f',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#ffd54f',
                                            },
                                        },
                                        '& .MuiInputLabel-root': {
                                            color: '#C0C0C0',
                                            fontFamily: 'system-ui, Avenir, Helvetica, Arial, sans-serif'
                                        },
                                        '& .MuiInputLabel-root.Mui-focused': {
                                            color: '#ffd54f',
                                        },
                                        '& .MuiInputBase-input': {
                                            color: 'white',
                                            fontFamily: 'system-ui, Avenir, Helvetica, Arial, sans-serif'
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item md={6} xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Email Address"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    sx={{ 
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: '#ffd54f',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#ffd54f',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#ffd54f',
                                            },
                                        },
                                        '& .MuiInputLabel-root': {
                                            color: '#C0C0C0',
                                            fontFamily: 'system-ui, Avenir, Helvetica, Arial, sans-serif'
                                        },
                                        '& .MuiInputLabel-root.Mui-focused': {
                                            color: '#ffd54f',
                                        },
                                        '& .MuiInputBase-input': {
                                            color: 'white',
                                            fontFamily: 'system-ui, Avenir, Helvetica, Arial, sans-serif'
                                        }
                                    }}
                                />
                            </Grid>
                            
                            <Grid item size={{md:10,xs:10, sm:6}}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    multiline
                                    rows={6}
                                    variant="outlined"
                                    sx={{ 
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: '#ffd54f',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#ffd54f',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#ffd54f',
                                            },
                                        },
                                        '& .MuiInputLabel-root': {
                                            color: '#C0C0C0',
                                            fontFamily: 'system-ui, Avenir, Helvetica, Arial, sans-serif'
                                        },
                                        '& .MuiInputLabel-root.Mui-focused': {
                                            color: '#ffd54f',
                                        },
                                        '& .MuiInputBase-input': {
                                            color: 'white',
                                            fontFamily: 'system-ui, Avenir, Helvetica, Arial, sans-serif'
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} sx={{ 
                                ml: { xs: 1, sm: 2, md: 20 },
                                mt: 2
                            }}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    size="large"
                                    sx={{
                                        py: 2,
                                        fontSize: '1rem',
                                        fontWeight: 'bold',
                                        backgroundColor: '#ffd54f',
                                        color: '#000',
                                        fontFamily: 'system-ui, Avenir, Helvetica, Arial, sans-serif',
                                        '&:hover': {
                                            backgroundColor: '#f57f17',
                                            transform: 'scale(1.02)',
                                            transition: 'all 0.3s ease'
                                        }
                                    }}
                                >
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Box>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert 
                    onClose={handleCloseSnackbar} 
                    severity={snackbar.severity} 
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Contact; 