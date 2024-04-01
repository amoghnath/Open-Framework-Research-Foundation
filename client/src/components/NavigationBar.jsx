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
import {
    PersonAdd as PersonAddIcon,
    Login as LoginIcon,
    CloudUpload as CloudUploadIcon,
    School as SchoolIcon,
    AddCircleOutline as AddCircleOutlineIcon,
    Logout as LogoutIcon,
    Face as FaceIcon,
} from '@mui/icons-material'
import { useAuth } from '../context/AuthContext'

export default function NavigationBar() {
    const [anchorEl, setAnchorEl] = useState(null)
    const [profileMenuAnchorEl, setProfileMenuAnchorEl] = useState(null)
    const [logoutDialogOpen, setLogoutDialogOpen] = useState(false)
    const navigate = useNavigate()
    const { isAuthenticated, currentUser, logout } = useAuth()

    const handleOpenMenu = (event, anchorSetter) => {
        anchorSetter(event.currentTarget)
    }

    const handleCloseMenu = (anchorSetter) => {
        anchorSetter(null)
    }

    const handleNavigate = (path) => {
        navigate(path)
        handleCloseMenu(setAnchorEl)
        handleCloseMenu(setProfileMenuAnchorEl)
    }

    const toggleLogoutDialog = (open) => {
        setLogoutDialogOpen(open)
    }

    const performLogout = () => {
        logout()
        handleNavigate('/')
        toggleLogoutDialog(false)
    }

    return (
        <Box sx={{ flexGrow: 1, mb: 2 }}>
            <AppBar
                position='static'
                elevation={0}
                sx={{ backgroundColor: 'white', color: 'black', borderBottom: '2px solid #333' }}
            >
                <Toolbar>
                    <Box sx={{ cursor: 'pointer' }} onClick={() => handleNavigate('/')}>
                        <img
                            src={`${process.env.PUBLIC_URL}/assets/logo.webp`}
                            alt='Logo'
                            style={{ height: 70 }}
                        />
                    </Box>
                    <Typography
                        variant='h6'
                        component='div'
                        sx={{ flexGrow: 1, cursor: 'pointer' }}
                        onClick={() => handleNavigate('/')}
                    >
                        Open Research Framework Foundation
                    </Typography>

                    {!isAuthenticated ? (
                        <>
                            <Button
                                variant='contained'
                                sx={{
                                    margin: 1,
                                    color: 'white',
                                    backgroundColor: 'black',
                                    '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
                                }}
                                startIcon={<PersonAddIcon />}
                                onClick={(e) => handleOpenMenu(e, setAnchorEl)}
                            >
                                Register
                            </Button>
                            <Menu
                                id='register-menu'
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={() => handleCloseMenu(setAnchorEl)}
                            >
                                <MenuItem onClick={() => handleNavigate('/register/uploader')}>
                                    <ListItemIcon>
                                        <CloudUploadIcon />
                                    </ListItemIcon>
                                    <ListItemText>Register as Problem Uploader</ListItemText>
                                </MenuItem>
                                <MenuItem onClick={() => handleNavigate('/register/solver')}>
                                    <ListItemIcon>
                                        <SchoolIcon />
                                    </ListItemIcon>
                                    <ListItemText>Register as Problem Solver</ListItemText>
                                </MenuItem>
                            </Menu>
                            <Button
                                variant='contained'
                                sx={{
                                    margin: 1,
                                    color: 'white',
                                    backgroundColor: 'black',
                                    '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
                                }}
                                startIcon={<LoginIcon />}
                                onClick={() => handleNavigate('/login')}
                            >
                                Login
                            </Button>
                        </>
                    ) : (
                        <>
                            {currentUser?.role === 'uploader' && (
                                <Button
                                    variant='contained'
                                    sx={{
                                        margin: 1,
                                        color: 'white',
                                        backgroundColor: 'black',
                                        '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
                                    }}
                                    startIcon={<AddCircleOutlineIcon />}
                                    onClick={() => handleNavigate('/create-problem')}
                                >
                                    Upload Problem
                                </Button>
                            )}
                            <Avatar
                                onClick={(e) => handleOpenMenu(e, setProfileMenuAnchorEl)}
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
                                onClose={() => handleCloseMenu(setProfileMenuAnchorEl)}
                            >
                                <MenuItem onClick={() => handleNavigate('/profile')}>
                                    <ListItemIcon>
                                        <FaceIcon />
                                    </ListItemIcon>
                                    <ListItemText>My Profile</ListItemText>
                                </MenuItem>
                                <MenuItem onClick={() => toggleLogoutDialog(true)}>
                                    <ListItemIcon sx={{ color: 'red' }}>
                                        <LogoutIcon />
                                    </ListItemIcon>
                                    <ListItemText>Logout</ListItemText>
                                </MenuItem>
                            </Menu>
                        </>
                    )}
                </Toolbar>
            </AppBar>

            <Dialog
                open={logoutDialogOpen}
                onClose={() => toggleLogoutDialog(false)}
                aria-labelledby='logout-dialog-title'
                aria-describedby='logout-dialog-description'
            >
                <DialogTitle id='logout-dialog-title'>{'Confirm Logout'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id='logout-dialog-description'>
                        Are you sure you want to logout?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => toggleLogoutDialog(false)}>Cancel</Button>
                    <Button onClick={performLogout} autoFocus color='error'>
                        Logout
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}