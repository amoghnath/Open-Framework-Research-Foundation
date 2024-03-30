import React, { useState } from 'react'
import {
    Avatar,
    Button,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    Box,
    Typography,
    Container,
    Snackbar,
    Alert,
} from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import SchoolIcon from '@mui/icons-material/School'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

const validationSchema = yup.object({
    email: yup
        .string()
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup.string().required('Password is required'),
})

export default function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    })
    const [role, setRole] = useState('uploader')
    const { login } = useAuth()
    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState('')

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setSnackbarOpen(false)
    }

    const onSubmit = async (data) => {
        try {
            await login({ ...data, role })
            Navigate('/')
        } catch (error) {
            setSnackbarMessage(error.message)
            setSnackbarOpen(true)
        }
    }

    return (
        <Container component='main' maxWidth='xs'>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    mt: -20,
                }}
            >
                <Avatar
                    src={`${process.env.PUBLIC_URL}/assets/logo.webp`}
                    alt='ORFC'
                    sx={{ width: 150, height: 150 }}
                />
                <Typography component='h1' variant='h5'>
                    Sign in
                </Typography>
                <Box
                    component='form'
                    noValidate
                    onSubmit={handleSubmit(onSubmit)}
                    sx={{ mt: 1 }}
                >
                    <TextField
                        {...register('email')}
                        margin='normal'
                        required
                        fullWidth
                        label='Email Address'
                        autoFocus
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                    <TextField
                        {...register('password')}
                        margin='normal'
                        required
                        fullWidth
                        label='Password'
                        type='password'
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />
                    <ToggleButtonGroup
                        color='primary'
                        value={role}
                        exclusive
                        onChange={(e, newRole) => setRole(newRole)}
                        fullWidth
                        sx={{
                            mt: 2,
                            '& .MuiToggleButton-root': { borderColor: 'black' },
                            '& .MuiToggleButton-root.Mui-selected': {
                                backgroundColor: 'black',
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                },
                            },
                        }}
                    >
                        <ToggleButton
                            value='uploader'
                            sx={{ flexGrow: 1, borderColor: 'black' }}
                        >
                            <CloudUploadIcon sx={{ mr: 1 }} />
                            Uploader
                        </ToggleButton>
                        <ToggleButton
                            value='solver'
                            sx={{ flexGrow: 1, borderColor: 'black' }}
                        >
                            <SchoolIcon sx={{ mr: 1 }} />
                            Solver
                        </ToggleButton>
                    </ToggleButtonGroup>
                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        startIcon={<SendIcon />}
                        sx={{
                            mt: 3,
                            padding: '15px',
                            backgroundColor: 'black',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            },
                        }}
                    >
                        Sign In
                    </Button>
                </Box>
            </Box>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity='error'
                    sx={{
                        width: '100%', // Adjust the width as needed
                        fontSize: '1.25rem', // Increase font size for bigger text
                        padding: '20px', // Add more padding to make the alert larger
                        border: '2px solid firebrick', // Add a border, change the color and size as needed
                        borderRadius: '4px', // Optional: add border radius for rounded corners
                    }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    )
}
