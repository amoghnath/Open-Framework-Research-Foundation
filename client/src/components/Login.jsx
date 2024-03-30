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
} from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import SchoolIcon from '@mui/icons-material/School'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useAuth } from '../context/AuthContext'

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

    const onSubmit = async (data) => {
        try {
            await login({ ...data, role })
            alert('Login successful')
        } catch (error) {
            alert(`Login failed: ${error.message}`)
        }
    }

    return (
        <Container component='main' maxWidth='xs'>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
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
        </Container>
    )
}
