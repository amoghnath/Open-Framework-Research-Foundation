import React, { useState } from 'react';
import {
    Avatar,
    Button,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    Box,
    Typography,
    Container,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SchoolIcon from '@mui/icons-material/School';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '../context/AuthContext';
import { useSnackbar } from '../context/SnackBarContext';
import { Navigate } from 'react-router-dom';

const validationSchema = yup.object({
    email: yup.string().email('Enter a valid email').required('Email is required'),
    password: yup.string().required('Password is required'),
});

export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
    });
    const [role, setRole] = useState('uploader');
    const { login } = useAuth();
    const { openSnackbar } = useSnackbar();

    const onSubmit = async (data) => {
        try {
            await login({ ...data, role });
            return <Navigate to='/' />;
        } catch (error) {
            openSnackbar(error.message);
        }
    };

    return (
        <Container component='main' maxWidth='xs'>
            <UserForm
                onSubmit={handleSubmit(onSubmit)}
                register={register}
                errors={errors}
                role={role}
                setRole={setRole}
            />
        </Container>
    );
}

function UserForm({ onSubmit, register, errors, role, setRole }) {
    return (
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
            <Box component='form' noValidate onSubmit={onSubmit} sx={{ mt: 1 }}>
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
                <RoleToggleButton role={role} setRole={setRole} />
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
    );
}

function RoleToggleButton({ role, setRole }) {
    const handleRoleChange = (event, newRole) => {
        // Prevent unselecting the current role, ensuring one option is always selected
        if (newRole !== null) {
            setRole(newRole);
        }
    };

    return (
        <ToggleButtonGroup
            color='primary'
            value={role}
            exclusive
            onChange={handleRoleChange}
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
            <ToggleButton value='uploader' sx={{ flexGrow: 1 }}>
                <CloudUploadIcon sx={{ mr: 1 }} />
                Uploader
            </ToggleButton>
            <ToggleButton value='solver' sx={{ flexGrow: 1 }}>
                <SchoolIcon sx={{ mr: 1 }} />
                Solver
            </ToggleButton>
        </ToggleButtonGroup>
    );
}
