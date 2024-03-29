import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LoginIcon from '@mui/icons-material/Login';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SchoolIcon from '@mui/icons-material/School';
import { useNavigate } from 'react-router-dom';

export default function ButtonAppBar() {
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();

    const handleRegisterClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleNavigation = (path) => {
        navigate(path);
        handleClose();
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{
                backgroundColor: 'white',
                color: 'black',
                borderBottom: '2px solid #333'
            }}>
                <Toolbar>
                    <img
                        src={`${process.env.PUBLIC_URL}/assets/logo.webp`}
                        alt="Logo"
                        style={{ height: 70 }}
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
                        onClick={handleRegisterClick}
                    >
                        Register
                    </Button>
                    <Menu
                        id="register-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={() => handleNavigation('/register/uploader')}>
                            <ListItemIcon>
                                <CloudUploadIcon />
                            </ListItemIcon>
                            <ListItemText>Register as Problem Uploader</ListItemText>
                        </MenuItem>
                        <MenuItem onClick={() => handleNavigation('/register/solver')}>
                            <ListItemIcon>
                                <SchoolIcon />
                            </ListItemIcon>
                            <ListItemText>Register as Problem Solver</ListItemText>
                        </MenuItem>
                    </Menu>
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