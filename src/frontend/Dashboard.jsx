import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import './Dashboard.css';

const Dashboard = () => {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className='dashboard-container'>
            <div className='glass-morphism-card'>
                <Box sx={{ width: '100%', typography: 'body1', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', p: 0 }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'rgba(255, 255, 255, 0.2)', p: 0, m: 0 }}>
                            <TabList
                                onChange={handleChange}
                                aria-label="lab API tabs example"
                                sx={{
                                    minHeight: 48,
                                    '& .MuiTab-root': {
                                        minHeight: 44,
                                        borderRadius: 2,
                                        background: 'transparent',
                                        transition: 'all 0.3s ease',
                                        color: 'rgba(255, 255, 255, 0.8)',
                                        '&:hover': {
                                            background: 'rgba(255, 255, 255, 0.1)',
                                            color: 'rgba(255, 255, 255, 1)',
                                        },
                                        '&.Mui-selected': {
                                            color: 'rgba(255, 255, 255, 1)',
                                            background: 'rgba(255, 255, 255, 0.15)',
                                        }
                                    },
                                    '& .MuiTabs-indicator': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                    }
                                }}
                            >
                                <Tab label="Orders" value="1" sx={{ minHeight: 44 }} />
                                <Tab label="Products" value="2" sx={{ minHeight: 44 }} />
                            </TabList>
                        </Box>
                        <TabPanel value="1" sx={{ flex: 1, color: 'rgba(255, 255, 255, 0.9)' }}>Item One</TabPanel>
                        <TabPanel value="2" sx={{ flex: 1, color: 'rgba(255, 255, 255, 0.9)' }}>Item Two</TabPanel>
                    </TabContext>
                </Box>
            </div>
        </div>
    )
}

export { Dashboard }