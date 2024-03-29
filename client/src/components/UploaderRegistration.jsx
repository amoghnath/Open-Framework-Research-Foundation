import React, { useState } from 'react';
import {
    Avatar, Button, CssBaseline, TextField, Paper, Box, Grid, Typography, createTheme, ThemeProvider, Alert, Alert as MUIAlert, List, ListItem, ListItemText, InputAdornment, Snackbar
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Icon from '@mui/material/Icon';

const theme = createTheme();

const validationSchema = yup.object({
    uploaderEmail: yup.string().email('Must be a valid email').required('Email is required'),
    uploaderPassword: yup.string().min(8, 'Password must be at least 8 characters long').required('Password is required'),
    uploaderFullName: yup.string().required('Full name is required'),
    uploaderPhoneNumber: yup.string().matches(/^[0-9]{10}$/, 'Phone number must be 10 digits long').required('Phone number is required'),
    uploaderBusinessName: yup.string().required('Business name is required'),
    uploaderBusinessEmail: yup.string().email('Must be a valid email').required('Business email is required'),
    uploaderBusinessAddress: yup.string().required('Business address is required')
});

export default function UploaderRegistrationForm() {
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema)
    });
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const onSubmit = async (data) => {
        try {
            const response = await fetch('http://localhost:3000/api/register/uploader', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message || 'Something went wrong');
            }
            alert('Registration successful');
        } catch (error) {
            setSnackbarMessage(`${error.message}`);
            setSnackbarOpen(true);
        }
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Grid container component="main" sx={{ height: '100vh' }}>
                <Grid item xs={false} sm={4} md={7} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 4,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            height: '90vh',
                            overflowY: 'auto',
                        }}
                    >
                        <Alert
                            severity="info"
                            sx={{
                                border: '2px solid #1976d2', // Adjust the color as needed
                            }}
                        >
                            <Typography variant="h5" gutterBottom>
                                Terms and Conditions
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                By registering, you agree to the following terms:
                            </Typography>
                            <List
                                sx={{
                                    listStyleType: 'disc',
                                    pl: 2,
                                    '& .MuiListItem-root': {
                                        display: 'list-item',
                                    },
                                }}
                            >
                                <ListItem disablePadding>
                                    <ListItemText primary="You must be at least 18 years old to register." />
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemText primary="Provide accurate and complete registration information." />
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemText primary="You should have valid business credentials for registration." />
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemText primary="Ensure that the business email and business address provided are valid and currently in use." />
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemText primary="Passwords must be at least 8 characters long and should include a mix of letters, numbers, and symbols." />
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemText primary="Maintain the security of your password and identification." />
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemText primary="Accept all risks of unauthorized access to information and Registration Data." />
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemText primary="You are responsible for all activity on your account." />
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemText primary="Do not engage in any activities that would disrupt, damage, or harm the service or experience of other users." />
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemText primary="All registered content will be moderated and must comply with our content guidelines." />
                                </ListItem>

                            </List>
                        </Alert>
                    </Box>
                </Grid>

                <Grid item xs={12} sm={8} md={5} component={Paper} square>
                    <Box sx={{
                        my: 4,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                        <Avatar
                            src={`${process.env.PUBLIC_URL}/assets/logo.webp`} // Access image from public/assets
                            alt="ORFC"
                            sx={{
                                width: 100, // Increase width as needed
                                height: 100, // Increase height as needed
                            }}
                        />
                        <Typography component="h1" variant="h5">
                            Problem Uploader Registration
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
                            <Controller
                                name="uploaderEmail"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label="Email Address"
                                        margin="normal"
                                        error={!!errors.uploaderEmail}
                                        helperText={errors.uploaderEmail?.message}
                                    />
                                )}
                            />

                            <Controller
                                name="uploaderPassword"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label="Password"
                                        type="password"
                                        margin="normal"
                                        error={!!errors.uploaderPassword}
                                        helperText={errors.uploaderPassword?.message}
                                    />
                                )}
                            />

                            <Controller
                                name="uploaderFullName"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label="Full Name"
                                        margin="normal"
                                        error={!!errors.uploaderFullName}
                                        helperText={errors.uploaderFullName?.message}
                                    />
                                )}
                            />

                            <Controller
                                name="uploaderPhoneNumber"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label="Phone Number"
                                        margin="normal"
                                        error={!!errors.uploaderPhoneNumber}
                                        helperText={errors.uploaderPhoneNumber?.message}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Icon>
                                                        <img src="/assets/india.jpg" alt="IN" style={{ width: 24, height: 16 }} />
                                                    </Icon>
                                                    +91
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                )}
                            />

                            <Controller
                                name="uploaderBusinessName"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label="Business Name"
                                        margin="normal"
                                        error={!!errors.uploaderBusinessName}
                                        helperText={errors.uploaderBusinessName?.message}
                                    />
                                )}
                            />

                            <Controller
                                name="uploaderBusinessEmail"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label="Business Email"
                                        margin="normal"
                                        error={!!errors.uploaderBusinessEmail}
                                        helperText={errors.uploaderBusinessEmail?.message}
                                    />
                                )}
                            />

                            <Controller
                                name="uploaderBusinessAddress"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label="Business Address"
                                        margin="normal"
                                        error={!!errors.uploaderBusinessAddress}
                                        helperText={errors.uploaderBusinessAddress?.message}
                                    />
                                )}
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                startIcon={<SendIcon />} // Use Send icon
                                sx={{
                                    mt: 3,
                                    padding: '15px',
                                    backgroundColor: 'black', // Set background color to black
                                    color: 'white', // Set text color to white
                                    '&:hover': {
                                        backgroundColor: 'rgba(0, 0, 0, 0.8)', // Subtle black on hover
                                    }
                                }}
                            >
                                Submit
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <MUIAlert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </MUIAlert>
            </Snackbar>
        </ThemeProvider>
    );
}