import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, Typography, Button, Grid, Paper, Alert, List, ListItem, ListItemText, TextField } from '@mui/material';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useSnackbar } from '../context/SnackBarContext';
import { useNavigate, useParams } from 'react-router-dom';

// Validation schema
const schema = yup.object({
    solutionTitle: yup.string().required('Solution title is required'),
    solutionDescription: yup.string().required('Solution description is required'),
}).required();

function CreateSolutionForm() {
    const { problemId } = useParams();
    const { openSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        try {
            const response = await fetch(`/api/solution/${problemId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Something went wrong');
            }

            openSnackbar('Solution submitted successfully');
            navigate(`/problems/${problemId}`);
        } catch (error) {
            console.error('Error submitting solution:', error);
            openSnackbar(error.message || 'Something went wrong');
        }
    };

    return (
        <Paper sx={{ height: '100%', ml: 2, mr: 2, p: 2 }}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Alert severity='info'>
                        <Typography variant='h5' gutterBottom>
                            Terms and Conditions for Solution Submission
                        </Typography>
                        <List sx={{ listStyleType: 'disc', pl: 2, '& .MuiListItem-root': { display: 'list-item' } }}>
                            <ListItem disablePadding>
                                <ListItemText primary='Solutions must be original and your own work.' />
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemText primary='Do not include any confidential or proprietary information in your solution.' />
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemText primary='Ensure your solution is clear, detailed, and addresses all aspects of the problem.' />
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemText primary='Respect intellectual property and privacy rights.' />
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemText primary='Follow ethical guidelines and professional conduct throughout the solution process.' />
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemText primary='Solutions should be feasible, implementable, and sustainable.' />
                            </ListItem>
                        </List>
                    </Alert>
                </Grid>
                <Grid item xs={6}>
                    <Typography component='h1' variant='h5'>
                        Submit Solution
                    </Typography>
                    <Box component='form' noValidate onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            margin='normal'
                            required
                            fullWidth
                            id='solutionTitle'
                            label='Solution Title'
                            {...register('solutionTitle')}
                            error={!!errors.solutionTitle}
                            helperText={errors.solutionTitle?.message}
                        />
                        <Typography variant='subtitle2' gutterBottom sx={{ mt: 2 }}>
                            Solution Description
                        </Typography>
                        <Controller
                            name='solutionDescription'
                            control={control}
                            defaultValue=''
                            render={({ field }) => (
                                <CKEditor
                                    editor={ClassicEditor}
                                    data={field.value}
                                    onChange={(event, editor) => {
                                        setValue('solutionDescription', editor.getData());
                                    }}
                                />
                            )}
                        />
                        {errors.solutionDescription && (
                            <Typography color='error' sx={{ mt: 2 }}>
                                {errors.solutionDescription.message}
                            </Typography>
                        )}
                        <Button
                            type='submit'
                            fullWidth
                            variant='contained'
                            sx={{ mt: 3, padding: '15px', backgroundColor: 'black', color: 'white', '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.8)' } }}
                        >
                            Submit Solution
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default CreateSolutionForm;
