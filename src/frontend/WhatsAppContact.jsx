import React from 'react';
import { Fab, Tooltip } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const WhatsAppContact = () => {
    const handleWhatsAppClick = () => {
        const phoneNumber = '+1234567890'; 
        const message = 'Hello! I would like to inquire about your catering services.';
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <div style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 1000
        }}>
            <Tooltip title="Contact us on WhatsApp" placement="left">
                <Fab
                    color="success"
                    aria-label="WhatsApp"
                    onClick={handleWhatsAppClick}
                    sx={{
                        backgroundColor: '#25D366',
                        '&:hover': {
                            backgroundColor: '#128C7E',
                        },
                        boxShadow: '0 4px 12px rgba(37, 211, 102, 0.4)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            transform: 'scale(1.1)',
                            boxShadow: '0 6px 16px rgba(37, 211, 102, 0.6)',
                        }
                    }}
                >
                    <WhatsAppIcon sx={{ fontSize: 28 }} />
                </Fab>
            </Tooltip>
        </div>
    );
};

export default WhatsAppContact; 