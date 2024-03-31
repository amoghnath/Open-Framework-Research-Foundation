import React, { useState } from 'react'
import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    Paper,
    Box,
    Grid,
    Typography,
    createTheme,
    ThemeProvider,
    Alert,
    List,
    ListItem,
    ListItemText,
    InputAdornment,
} from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Icon from '@mui/material/Icon'
import { Navigate } from 'react-router-dom'
import { useSnackbar } from '../context/SnackBarContext'

const theme = createTheme()

const validationSchema = yup.object({
    solverEmail: yup.string().email('Must be a valid email').required('Email is required'),
    solverPassword: yup
        .string()
        .min(8, 'Password must be at least 8 characters long')
        .required('Password is required'),
    solverFullName: yup.string().required('Full name is required'),
    solverPhoneNumber: yup
        .string()
        .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits long')
        .required('Phone number is required'),
    solverUniversityName: yup.string().required('University name is required'),
    solverUniversityEmail: yup
        .string()
        .email('Must be a valid email')
        .required('University email is required'),
    solverUniversityAddress: yup.string().required('University address is required'),
})

export default function SolverRegistrationForm() {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    })
    const [loggedIn, setLoggedIn] = useState(false)
    const { openSnackbar } = useSnackbar()

    const onSubmit = async (data) => {
        try {
            const response = await fetch('/api/register/solver', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            const result = await response.json()
            if (!response.ok) {
                throw new Error(result.message || 'Something went wrong')
            }
            setLoggedIn(true)
            openSnackbar('You have successfully registered as a solver')
        } catch (error) {
            openSnackbar(error.message || 'Something went wrong')
        }
    }

    // Redirect to /login if loggedIn is true
    if (loggedIn) {
        return <Navigate to='/login' />
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Grid container component='main' sx={{ height: '100vh' }}>
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
                            severity='info'
                            sx={{
                                border: '2px solid #1976d2', // Adjust the color as needed
                            }}
                        >
                            <Typography variant='h5' gutterBottom>
                                Terms and Conditions
                            </Typography>
                            <Typography variant='body2' gutterBottom>
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
                                    <ListItemText primary='You must be at least 18 years old to register.' />
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemText primary='Provide accurate and complete registration information.' />
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemText primary='You must possess valid university credentials to register.' />
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemText primary='Ensure that your university email and address provided are valid and currently in use.' />
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemText primary='Passwords must be at least 8 characters long and should include a mix of letters, numbers, and symbols.' />
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemText primary='Maintain the security of your password and identification.' />
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemText primary='Accept all risks of unauthorized access to information and Registration Data.' />
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemText primary='You are responsible for all activity on your account.' />
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemText primary="Engage respectfully and constructively, avoiding activities that would disrupt or harm the service or others' experience." />
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemText primary='All submitted problems and solutions will be moderated according to academic standards and university policies.' />
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemText primary='Adhere to academic integrity and avoid plagiarism in problem submissions and solutions.' />
                                </ListItem>
                            </List>
                        </Alert>
                    </Box>
                </Grid>

                <Grid item xs={12} sm={8} md={5} component={Paper} square>
                    <Box
                        sx={{
                            my: 4,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar
                            src={`${process.env.PUBLIC_URL}/assets/logo.webp`} // Access image from public/assets
                            alt='ORFC'
                            sx={{
                                width: 100, // Increase width as needed
                                height: 100, // Increase height as needed
                            }}
                        />

                        <Typography component='h1' variant='h5'>
                            Problem Solver Registration
                        </Typography>
                        <Box
                            component='form'
                            noValidate
                            onSubmit={handleSubmit(onSubmit)}
                            sx={{ mt: 1 }}
                        >
                            <Controller
                                name='solverEmail'
                                control={control}
                                defaultValue=''
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label='Email Address'
                                        margin='normal'
                                        error={!!errors.solverEmail}
                                        helperText={errors.solverEmail?.message}
                                    />
                                )}
                            />

                            <Controller
                                name='solverPassword'
                                control={control}
                                defaultValue=''
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label='Password'
                                        type='password'
                                        margin='normal'
                                        error={!!errors.solverPassword}
                                        helperText={errors.solverPassword?.message}
                                    />
                                )}
                            />

                            <Controller
                                name='solverFullName'
                                control={control}
                                defaultValue=''
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label='Full Name'
                                        margin='normal'
                                        error={!!errors.solverFullName}
                                        helperText={errors.solverFullName?.message}
                                    />
                                )}
                            />

                            <Controller
                                name='solverPhoneNumber'
                                control={control}
                                defaultValue=''
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label='Phone Number'
                                        margin='normal'
                                        error={!!errors.solverPhoneNumber}
                                        helperText={errors.solverPhoneNumber?.message}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position='start'>
                                                    <Icon>
                                                        <img
                                                            src='/assets/india.jpg'
                                                            alt='IN'
                                                            style={{
                                                                width: 24,
                                                                height: 16,
                                                            }}
                                                        />
                                                    </Icon>
                                                    +91
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                )}
                            />

                            <Controller
                                name='solverUniversityName'
                                control={control}
                                defaultValue=''
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label='University Name'
                                        margin='normal'
                                        error={!!errors.solverUniversityName}
                                        helperText={errors.solverUniversityName?.message}
                                    />
                                )}
                            />

                            <Controller
                                name='solverUniversityEmail'
                                control={control}
                                defaultValue=''
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label='University Email'
                                        margin='normal'
                                        error={!!errors.solverUniversityEmail}
                                        helperText={errors.solverUniversityEmail?.message}
                                    />
                                )}
                            />

                            <Controller
                                name='solverUniversityAddress'
                                control={control}
                                defaultValue=''
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label='University Address'
                                        margin='normal'
                                        error={!!errors.solverUniversityAddress}
                                        helperText={errors.solverUniversityAddress?.message}
                                    />
                                )}
                            />

                            <Button
                                type='submit'
                                fullWidth
                                variant='contained'
                                startIcon={<SendIcon />} // Use Send icon
                                sx={{
                                    mt: 3,
                                    padding: '15px',
                                    backgroundColor: 'black', // Set background color to black
                                    color: 'white', // Set text color to white
                                    '&:hover': {
                                        backgroundColor: 'rgba(0, 0, 0, 0.8)', // Subtle black on hover
                                    },
                                }}
                            >
                                Submit
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    )
}
