import { AppBar, Toolbar, Button, Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div>
            <AppBar
                elevation={scrolled ? 4 : 0}
                position="fixed"
                className={scrolled ? 'navbar-solid' : 'navbar-translucent'}
            >
                <Toolbar>
                    <div className='Nav-head'>
                        <h2><span>Silver Spoon</span> Catering</h2>
                    </div>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                        <Button
                            variant={scrolled ? 'contained' : 'outlined'}
                            color={scrolled ? 'primary' : 'inherit'}
                            className={scrolled ? 'nav-btn-solid' : 'nav-btn-translucent'}
                            onClick={() => navigate('/')}
                            sx={{ margin: 1 }}
                        >
                            &nbsp;Home&nbsp;
                        </Button>
                        <Button
                            variant={scrolled ? 'contained' : 'outlined'}
                            color={scrolled ? 'primary' : 'inherit'}
                            className={scrolled ? 'nav-btn-solid' : 'nav-btn-translucent'}
                            onClick={() => navigate('/log')}
                            sx={{ margin: 1 }}
                        >
                            &nbsp;Register&nbsp;/&nbsp;Login&nbsp;
                        </Button>
                        <Button
                            variant={scrolled ? 'contained' : 'outlined'}
                            color={scrolled ? 'primary' : 'inherit'}
                            className={scrolled ? 'nav-btn-solid' : 'nav-btn-translucent'}
                            onClick={() => navigate('/prod')}
                            sx={{ margin: 1 }}
                        >
                            &nbsp;Products&nbsp;
                        </Button>
                        <Button
                            variant={scrolled ? 'contained' : 'outlined'}
                            color={scrolled ? 'primary' : 'inherit'}
                            className={scrolled ? 'nav-btn-solid' : 'nav-btn-translucent'}
                            onClick={() => navigate('/abt')}
                            sx={{ margin: 1 }}
                        >
                            &nbsp;About us&nbsp;
                        </Button>
                        <Button
                            variant={scrolled ? 'contained' : 'outlined'}
                            color={scrolled ? 'primary' : 'inherit'}
                            className={scrolled ? 'nav-btn-solid' : 'nav-btn-translucent'}
                            onClick={() => navigate('/dash')}
                            sx={{ margin: 1 }}
                        >
                            &nbsp;Dashboard&nbsp;
                        </Button>
                        <Button
                            variant='contained'
                            color='#ffe082'
                            className='nav-btn-menu'
                            href='public/_Food Menu.pdf'
                            target="_blank"
                            sx={{ margin: 1 }}
                        >
                            &nbsp;View Menu&nbsp;
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
            <div style={{ height: 64 }} /> {/* Spacer for fixed navbar */}
        </div>
    );
};

export default Navbar;