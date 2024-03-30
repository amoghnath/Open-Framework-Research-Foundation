import React, { useState, useEffect } from 'react'
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    Button,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Avatar,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import LoginIcon from '@mui/icons-material/Login'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import SchoolIcon from '@mui/icons-material/School'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import { useAuth } from '../context/AuthContext'

export default function NavigationBar() {
    const [anchorEl, setAnchorEl] = useState(null)
    const [profileMenuAnchorEl, setProfileMenuAnchorEl] = useState(null)
    const navigate = useNavigate()
    const { isAuthenticated, currentUser, logout } = useAuth()

    useEffect(() => {
        if (isAuthenticated && currentUser?.role === 'uploader') {
            // Logic to handle the visibility of the Create Problem button
            // This can trigger a re-render if needed
        }
    }, [isAuthenticated, currentUser])

    const handleRegisterClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleProfileMenuClick = (event) => {
        setProfileMenuAnchorEl(event.currentTarget)
    }

    const handleProfileMenuClose = () => {
        setProfileMenuAnchorEl(null)
    }

    const handleNavigation = (path) => {
        navigate(path)
        handleClose()
        handleProfileMenuClose()
    }

    const handleLogout = () => {
        logout()
        handleNavigation('/')
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position='static'
                sx={{
                    backgroundColor: 'white',
                    color: 'black',
                    borderBottom: '2px solid #333',
                }}
            >
                <Toolbar>
                    <img
                        src={`${process.env.PUBLIC_URL}/assets/logo.webp`}
                        alt='Logo'
                        style={{ height: 70 }}
                    />
                    <Typography
                        variant='h6'
                        component='div'
                        sx={{ flexGrow: 1 }}
                    >
                        Open Research Framework Foundation
                    </Typography>

                    {!isAuthenticated && (
                        <>
                            <Button
                                variant='contained'
                                sx={{
                                    margin: 1,
                                    color: 'white',
                                    backgroundColor: 'black',
                                    '&:hover': {
                                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                    },
                                }}
                                startIcon={
                                    <PersonAddIcon style={{ color: 'white' }} />
                                }
                                onClick={handleRegisterClick}
                            >
                                Register
                            </Button>
                            <Menu
                                id='register-menu'
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem
                                    onClick={() =>
                                        handleNavigation('/register/uploader')
                                    }
                                >
                                    <ListItemIcon>
                                        <CloudUploadIcon />
                                    </ListItemIcon>
                                    <ListItemText>
                                        Register as Problem Uploader
                                    </ListItemText>
                                </MenuItem>
                                <MenuItem
                                    onClick={() =>
                                        handleNavigation('/register/solver')
                                    }
                                >
                                    <ListItemIcon>
                                        <SchoolIcon />
                                    </ListItemIcon>
                                    <ListItemText>
                                        Register as Problem Solver
                                    </ListItemText>
                                </MenuItem>
                            </Menu>
                            <Button
                                variant='contained'
                                sx={{
                                    margin: 1,
                                    color: 'white',
                                    backgroundColor: 'black',
                                    '&:hover': {
                                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                    },
                                }}
                                startIcon={
                                    <LoginIcon style={{ color: 'white' }} />
                                }
                                onClick={() => handleNavigation('/login')}
                            >
                                Login
                            </Button>
                        </>
                    )}

                    {isAuthenticated && currentUser?.role === 'uploader' && (
                        <Button
                            variant='contained'
                            sx={{
                                margin: 1,
                                color: 'white',
                                backgroundColor: 'black',
                                '&:hover': {
                                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                },
                            }}
                            startIcon={<AddCircleOutlineIcon />}
                            onClick={() => handleNavigation('/create-problem')}
                        >
                            Create Problem
                        </Button>
                    )}

                    {isAuthenticated && (
                        <>
                            <Avatar
                                onClick={handleProfileMenuClick}
                                sx={{ cursor: 'pointer', marginLeft: '10px' }}
                                alt='Profile'
                                src='/path/to/your/avatar/image.jpg' // Update path to your profile image
                            />
                            <Menu
                                anchorEl={profileMenuAnchorEl}
                                open={Boolean(profileMenuAnchorEl)}
                                onClose={handleProfileMenuClose}
                            >
                                <MenuItem onClick={handleLogout}>
                                    <ListItemIcon>
                                        <ExitToAppIcon />
                                    </ListItemIcon>
                                    <ListItemText>Logout</ListItemText>
                                </MenuItem>
                            </Menu>
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    )
}
