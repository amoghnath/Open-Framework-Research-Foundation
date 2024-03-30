import React, { useState } from 'react'
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
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import LoginIcon from '@mui/icons-material/Login'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import SchoolIcon from '@mui/icons-material/School'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import LogoutIcon from '@mui/icons-material/Logout'
import FaceIcon from '@mui/icons-material/Face'
import { useAuth } from '../context/AuthContext'

export default function NavigationBar() {
    const [anchorEl, setAnchorEl] = useState(null)
    const [profileMenuAnchorEl, setProfileMenuAnchorEl] = useState(null)
    const [logoutDialogOpen, setLogoutDialogOpen] = useState(false)
    const navigate = useNavigate()
    const { isAuthenticated, currentUser, logout } = useAuth()

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

    const handleLogoutClick = () => {
        setLogoutDialogOpen(true)
    }

    const handleLogoutConfirm = () => {
        logout()
        handleNavigation('/')
        setLogoutDialogOpen(false)
    }

    const handleLogoutCancel = () => {
        setLogoutDialogOpen(false)
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position='static'
                elevation={0}
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
                                    padding: '8px',
                                    paddingLeft: '20px',
                                    paddingRight: '20px',
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
                                    padding: '8px',
                                    paddingLeft: '20px',
                                    paddingRight: '20px',
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
                                padding: '8px',
                                paddingLeft: '20px',
                                paddingRight: '20px',
                                color: 'white',
                                backgroundColor: 'black',
                                '&:hover': {
                                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                },
                            }}
                            startIcon={<AddCircleOutlineIcon />}
                            onClick={() => handleNavigation('/create-problem')}
                        >
                            Upload Problem
                        </Button>
                    )}

                    {isAuthenticated && (
                        <>
                            <Avatar
                                onClick={handleProfileMenuClick}
                                sx={{
                                    cursor: 'pointer',
                                    marginLeft: '10px',
                                    backgroundColor: 'black',
                                }}
                                alt='Profile'
                            />
                            <Menu
                                anchorEl={profileMenuAnchorEl}
                                open={Boolean(profileMenuAnchorEl)}
                                onClose={handleProfileMenuClose}
                            >
                                <MenuItem
                                    onClick={() =>
                                        handleNavigation('/my-profile')
                                    }
                                >
                                    <ListItemIcon>
                                        <FaceIcon />
                                    </ListItemIcon>
                                    <ListItemText>My Profile</ListItemText>
                                </MenuItem>
                                <MenuItem onClick={handleLogoutClick}>
                                    <ListItemIcon sx={{ color: 'red' }}>
                                        <LogoutIcon />
                                    </ListItemIcon>
                                    <ListItemText>Logout</ListItemText>
                                </MenuItem>
                            </Menu>

                            <Dialog
                                open={logoutDialogOpen}
                                onClose={handleLogoutCancel}
                                aria-labelledby='logout-dialog-title'
                                aria-describedby='logout-dialog-description'
                            >
                                <DialogTitle id='logout-dialog-title'>
                                    {'Confirm Logout'}
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText id='logout-dialog-description'>
                                        Are you sure you want to logout?
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleLogoutCancel}>
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={handleLogoutConfirm}
                                        autoFocus
                                        color='error'
                                    >
                                        Logout
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    )
}
