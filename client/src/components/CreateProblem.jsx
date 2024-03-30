import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    Grid,
    Paper,
    Divider,
    Alert,
    List,
    ListItem,
    ListItemText,
    CircularProgress
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useSnackbar } from '../context/SnackBarContext';
import { useNavigate } from 'react-router-dom';

// Yup schema
const schema = yup.object({
    problemTitle: yup.string().required('Problem title is required'),
    problemDescription: yup.string().required('Problem description is required'),
    problemReward: yup.number().positive('Reward must be a positive number').required('Reward is required'),
    problemDeadlineDate: yup.date().required('Deadline date is required').nullable(),
}).required();

function CreateProblemForm() {
    const { openSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const { register, handleSubmit, control, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data) => {
        const { problemTitle, problemDescription, problemReward, problemDeadlineDate } = data;

        try {
            const response = await fetch('/api/problem/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    problemTitle,
                    problemDescription,
                    problemReward,
                    problemDeadlineDate: problemDeadlineDate?.toISOString(), // Use ISO string format for date
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            openSnackbar('Problem created successfully');
            navigate('/');
        } catch (error) {
            console.error('Error creating problem:', error);
            openSnackbar('Error creating problem');
        }
    };

    return (
        <Container maxWidth={false} component='main' sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Paper sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ p: 3, height: '100%' }}>
                    <Grid container spacing={2}>
                        {/* Terms and conditions and form fields here */}
                        <Grid item xs={6}>
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
                                    By registering, you agree to the following
                                    terms:
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
                                        <ListItemText primary='Industry representatives must have valid business credentials to upload problems.' />
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <ListItemText primary='The problem statement must be clear, concise, and not exceed 200 words.' />
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <ListItemText primary='Provide a detailed introduction that sets the context for the problem, including industry relevance.' />
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <ListItemText primary='Clearly outline the objectives, goals, and success criteria for the solution.' />
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <ListItemText primary='Include necessary technical details, data, and resources to aid in solving the problem.' />
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <ListItemText primary='Specify any constraints like budget, time, technology, or resources that solvers must adhere to.' />
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <ListItemText primary='State the expected solution format, such as report, prototype, code, etc.' />
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <ListItemText primary='Ensure that the content adheres to the platform’s guidelines and is appropriate for a professional audience.' />
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <ListItemText primary='Maintain the confidentiality of sensitive information and do not disclose proprietary data.' />
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <ListItemText primary='Accept responsibility for the accuracy and completeness of the submitted problem and its details.' />
                                    </ListItem>

                                </List>
                            </Alert>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography component='h1' variant='h5' mb={3}>
                                Create New Problem
                            </Typography>
                            <Box component='form' noValidate onSubmit={handleSubmit(onSubmit)}>
                                <TextField
                                    margin='normal'
                                    required
                                    fullWidth
                                    id='problemTitle'
                                    label='Problem Title'
                                    {...register('problemTitle')}
                                    error={!!errors.problemTitle}
                                    helperText={errors.problemTitle?.message}
                                />
                                <FormControl fullWidth sx={{ mt: 2, mb: 2 }}>
                                    <InputLabel htmlFor='problemReward'>Reward</InputLabel>
                                    <OutlinedInput
                                        id='problemReward'
                                        startAdornment={<InputAdornment position='start'>$</InputAdornment>}
                                        {...register('problemReward')}
                                        error={!!errors.problemReward}
                                        aria-describedby="problemReward-text"
                                    />
                                    <Typography variant="caption" color="error" id="problemReward-text">
                                        {errors.problemReward?.message}
                                    </Typography>
                                </FormControl>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <Controller
                                        name="problemDeadlineDate"
                                        control={control}
                                        defaultValue={null}
                                        render={({ field }) => (
                                            <DatePicker
                                                label="Deadline Date"
                                                {...field}
                                                renderInput={(params) => <TextField {...params} error={!!errors.problemDeadlineDate} helperText={errors.problemDeadlineDate?.message} />}
                                            />
                                        )}
                                    />
                                </LocalizationProvider>
                                <Typography variant='subtitle2' gutterBottom sx={{ mt: 2 }}>
                                    Problem Description
                                </Typography>
                                <Controller
                                    name="problemDescription"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <CKEditor
                                            editor={ClassicEditor}
                                            data={field.value}
                                            onChange={(event, editor) => {
                                                setValue('problemDescription', editor.getData());
                                            }}
                                        />
                                    )}
                                />
                                {errors.problemDescription && (
                                    <Typography color="error">
                                        {errors.problemDescription.message}
                                    </Typography>
                                )}
                                <Button type='submit' fullWidth variant='contained' sx={{
                                    mt: 3,
                                    padding: '15px',
                                    backgroundColor: 'black', // Set background color to black
                                    color: 'white', // Set text color to white
                                    '&:hover': {
                                        backgroundColor: 'rgba(0, 0, 0, 0.8)', // Subtle black on hover
                                    },
                                }}>
                                    Create Problem
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Container>
    );
}

export default CreateProblemForm;
