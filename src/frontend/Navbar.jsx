import { AppBar, Toolbar, Button, Box, IconButton, Drawer, List, ListItem, ListItemText, useTheme, useMediaQuery } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [isAuthenticated, setIsAuthenticated] = useState(!!sessionStorage.getItem('token'));
    const [isAdmin, setIsAdmin] = useState(sessionStorage.getItem('userRole') === 'admin');

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

    useEffect(() => {
        const handleStorage = () => {
            setIsAuthenticated(!!sessionStorage.getItem('token'));
            setIsAdmin(sessionStorage.getItem('userRole') === 'admin');
        };
        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, []);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleNavigation = (path) => {
        navigate(path);
        if (isMobile) {
            setMobileOpen(false);
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('userRole');
        setIsAuthenticated(false);
        setIsAdmin(false);
        navigate('/');
    };

    const navItems = [
        { text: 'Home', path: '/' },
        { text: 'Register/Login', path: '/log' },
        { text: 'Products', path: '/prod' },
        { text: 'About us', path: '/abt' },
        { text: 'Contact', path: '/contact' },
        { text: 'Dashboard', path: '/dash' }
    ];

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <List>
                {navItems.map((item) => (
                    <ListItem key={item.text} onClick={() => handleNavigation(item.path)}>
                        <ListItemText
                            primary={item.text}
                            sx={{
                                color: 'white',
                                '& .MuiListItemText-primary': {
                                    fontSize: '1.1rem',
                                    fontWeight: 500
                                }
                            }}
                        />
                    </ListItem>
                ))}
                <ListItem>
                    <Button
                        variant='contained'
                        color='#ffe082'
                        className='nav-btn-menu'
                        href='public/_Food Menu.pdf'
                        target="_blank"
                        sx={{ width: '100%' }}
                    >
                        View Menu
                    </Button>
                </ListItem>
            </List>
        </Box>
    );

    
    const handleLoginSuccess = () => {
        setIsAuthenticated(true);
        window.location.reload();
    };

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

                    
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                        <Button
                            variant={scrolled ? 'contained' : 'outlined'}
                            color={scrolled ? 'primary' : 'inherit'}
                            className={scrolled ? 'nav-btn-solid' : 'nav-btn-translucent'}
                            onClick={() => navigate('/')}
                            sx={{ margin: 1 }}
                        >
                            &nbsp;Home&nbsp;
                        </Button>
                        {!isAuthenticated && (
                            <Button
                                variant={scrolled ? 'contained' : 'outlined'}
                                color={scrolled ? 'primary' : 'inherit'}
                                className={scrolled ? 'nav-btn-solid' : 'nav-btn-translucent'}
                                onClick={() => navigate('/log')}
                                sx={{ margin: 1 }}
                            >
                                &nbsp;Register&nbsp;/&nbsp;Login&nbsp;
                            </Button>
                        )}

                        {isAuthenticated && (
                            <Button
                                variant={scrolled ? 'contained' : 'outlined'}
                                color={scrolled ? 'primary' : 'inherit'}
                                className={scrolled ? 'nav-btn-solid' : 'nav-btn-translucent'}
                                onClick={() => navigate('/prod')}
                                sx={{ margin: 1 }}
                            >
                                &nbsp;Products&nbsp;
                            </Button>
                        )}

                        {isAdmin && (
                            <Button
                                variant={scrolled ? 'contained' : 'outlined'}
                                color={scrolled ? 'primary' : 'inherit'}
                                className={scrolled ? 'nav-btn-solid' : 'nav-btn-translucent'}
                                onClick={() => navigate('/dash')}
                                sx={{ margin: 1 }}
                            >
                                &nbsp;Dashboard&nbsp;
                            </Button>
                        )}
                        <Button
                            variant={scrolled ? 'contained' : 'outlined'}
                            color={scrolled ? 'primary' : 'inherit'}
                            className={scrolled ? 'nav-btn-solid' : 'nav-btn-translucent'}
                            onClick={() => navigate('/abt')}
                            sx={{ margin: 1 }}
                        >
                            &nbsp;About us&nbsp;
                        </Button>
                        {isAuthenticated && (
                            <Button
                                variant={scrolled ? 'contained' : 'outlined'}
                                color={scrolled ? 'primary' : 'inherit'}
                                className={scrolled ? 'nav-btn-solid' : 'nav-btn-translucent'}
                                onClick={() => { handleLogout(); window.location.reload(); }}
                                sx={{ margin: 1 }}
                            >
                                &nbsp;Logout&nbsp;
                            </Button>
                        )}

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

                    
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ display: { xs: 'block', md: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, 
                }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: 240,
                        backgroundColor: 'rgba(20, 20, 20, 0.95)',
                        backdropFilter: 'blur(8px)'
                    },
                }}
            >
                {drawer}
            </Drawer>

            <div style={{ height: 64 }} /> 
        </div>
    );
};

export default Navbar;