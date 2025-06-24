import { AppBar, Toolbar, Button, TextField, Box, InputAdornment } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';

const Navbar = () => {
    const navigate = useNavigate()
    const [search, setSearch] = useState('')
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setScrolled(true)
            } else {
                setScrolled(false)
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleSearch = (e) => {
        setSearch(e.target.value)
        console.log("Search:", e.target.value)
    }

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
                    <Box sx={{ flexGrow: 1}} />
                    <Button 
                        variant={scrolled ? 'contained' : 'outlined'}
                        color={scrolled ? 'primary' : 'inherit'}
                        className={scrolled ? 'nav-btn-solid' : 'nav-btn-translucent'}
                        id='btn'
                        onClick={() => navigate('/')}
                    >
                        &nbsp;Home&nbsp;
                    </Button>
                    &nbsp;&nbsp;&nbsp;
                    <Button 
                        variant={scrolled ? 'contained' : 'outlined'}
                        color={scrolled ? 'primary' : 'inherit'}
                        className={scrolled ? 'nav-btn-solid' : 'nav-btn-translucent'}
                        onClick={() => navigate('/log')}
                    >
                        &nbsp;Register&nbsp;/&nbsp;Login&nbsp;
                    </Button>
                    &nbsp;&nbsp;&nbsp;
                    <Button 
                        variant={scrolled ? 'contained' : 'outlined'}
                        color={scrolled ? 'primary' : 'inherit'}
                        className={scrolled ? 'nav-btn-solid' : 'nav-btn-translucent'}
                        onClick={() => navigate('/prod')}
                    >
                        &nbsp;Products&nbsp;
                    </Button>
                    &nbsp;&nbsp;&nbsp;
                    <Button 
                        variant={scrolled ? 'contained' : 'outlined'}
                        color={scrolled ? 'primary' : 'inherit'}
                        className={scrolled ? 'nav-btn-solid' : 'nav-btn-translucent'}
                        onClick={() => navigate('/abt')}
                    >
                        &nbsp;About us&nbsp;
                    </Button>
                    &nbsp;&nbsp;&nbsp;
                    <Button 
                        variant={scrolled ? 'contained' : 'outlined'}
                        color={scrolled ? 'primary' : 'inherit'}
                        className={scrolled ? 'nav-btn-solid' : 'nav-btn-translucent'}
                        onClick={() => navigate('/dash')}
                    >
                        &nbsp;Dashboard&nbsp;
                    </Button>
                    &nbsp;&nbsp;&nbsp;
                    <Button 
                        variant='contained'
                        color='#ffe082'
                        className= 'nav-btn-menu' 
                        href='public\_Food Menu.pdf'
                        target="_blank"
                    >
                        &nbsp;View Menu&nbsp;
                    </Button>
                    &nbsp;&nbsp;&nbsp;

                    {/* <TextField
                        variant="outlined"
                        size="small"
                        placeholder="Search"
                        value={search}
                        onChange={handleSearch}
                        sx={{
                            backgroundColor: 'white',
                            width:"200px",
                            borderRadius: 1,
                            '& .MuiOutlinedInput-root': {
                                '&.Mui-focused': {
                                    backgroundColor: 'white',
                                },
                            },
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    /> */}
                </Toolbar>
            </AppBar>
            <div style={{ height: 64 }} /> {/* Spacer for fixed navbar */}
        </div>
    )
}

export default Navbar

