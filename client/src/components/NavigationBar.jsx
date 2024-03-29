import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LoginIcon from '@mui/icons-material/Login';
import logo from '../assets/logo.webp'; // Adjust the path as necessary

export default function ButtonAppBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: 'white', color: 'black' }}>
                <Toolbar>
                    <img
                        src={logo}
                        alt="Logo"
                        style={{ height: 70 }} // Adjust size and spacing as needed
                    />
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Open Research Framework Foundation
                    </Typography>
                    <Button
                        variant="contained"
                        sx={{
                            margin: 1,
                            color: 'white',
                            backgroundColor: 'black',
                            '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                            }
                        }}
                        startIcon={<PersonAddIcon style={{ color: 'white' }} />}
                    >
                        Register
                    </Button>
                    <Button
                        variant="contained"
                        sx={{
                            color: 'white',
                            backgroundColor: 'black',
                            '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                            }
                        }}
                        startIcon={<LoginIcon style={{ color: 'white' }} />}
                    >
                        Login
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
