import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

const Dashboard = () => {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className='con' style={{ height: '90vh', width: '70vw', margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', borderRadius: '18px', boxShadow: '0 0 18px 0 rgba(0, 0, 0, 0.18)', border: '2px solid rgb(255, 255, 255)', background: 'white' }}>
            <Box sx={{ width: '100%', typography: 'body1', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', p: 0 }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', p: 0, m: 0 }}>
                        <TabList
                            onChange={handleChange}
                            aria-label="lab API tabs example"
                            sx={{
                                minHeight: 48,
                                '& .MuiTab-root': {
                                    minHeight: 44,
                                    borderRadius: 2,
                                    background: 'transparent',
                                    transition: 'none',
                                }
                            }}
                        >
                            <Tab label="Orders" value="1" sx={{ minHeight: 44 }} />
                            <Tab label="Products" value="2" sx={{ minHeight: 44 }} />
                        </TabList>
                    </Box>
                    <TabPanel value="1" sx={{ flex: 1, color: 'black' }}>Item One</TabPanel>
                    <TabPanel value="2" sx={{ flex: 1, color: 'black' }}>Item Two</TabPanel>
                </TabContext>
            </Box>
        </div>
    )
}

export { Dashboard }