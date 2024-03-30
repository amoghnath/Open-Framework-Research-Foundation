import React, { useState } from 'react';
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
    ListItemText
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function CreateProblemForm() {
    const [problemTitle, setProblemTitle] = useState('');
    const [problemDescription, setProblemDescription] = useState('');
    const [problemReward, setProblemReward] = useState('');
    const [problemDeadlineDate, setProblemDeadlineDate] = useState(null);
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        let tempErrors = {};
        tempErrors.problemTitle = problemTitle ? '' : 'Problem title is required';
        tempErrors.problemDescription = problemDescription ? '' : 'Problem description is required';
        tempErrors.problemReward = problemReward && !isNaN(problemReward) ? '' : 'Reward must be a number';
        tempErrors.problemDeadlineDate = problemDeadlineDate ? '' : 'Deadline date is required';

        setErrors(tempErrors);
        return Object.values(tempErrors).every(x => x === "");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateForm()) {
            alert('Form submitted, check the console for details.');
            console.log({
                problemTitle,
                problemDescription,
                problemReward,
                problemDeadlineDate: problemDeadlineDate?.format(), // Convert Dayjs object to string
            });
            // Here you would handle form submission, e.g., calling an API
        } else {
            console.log('Validation errors', errors);
        }
    };

    return (
        <Container maxWidth={false} component='main' sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Paper sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ p: 3, height: '100%' }}>
                    <Typography component='h1' variant='h5' mb={3}>
                        Create New Problem
                    </Typography>
                    <Grid container spacing={2}>
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
                            <Box component='form' noValidate onSubmit={handleSubmit}>
                                <TextField
                                    margin='normal'
                                    required
                                    fullWidth
                                    id='problemTitle'
                                    label='Problem Title'
                                    name='problemTitle'
                                    value={problemTitle}
                                    onChange={(e) => setProblemTitle(e.target.value)}
                                    error={!!errors.problemTitle}
                                    helperText={errors.problemTitle}
                                />
                                <FormControl fullWidth sx={{ mt: 2, mb: 2 }}>
                                    <InputLabel htmlFor='problemReward'>Reward</InputLabel>
                                    <OutlinedInput
                                        id='problemReward'
                                        startAdornment={<InputAdornment position='start'>$</InputAdornment>}
                                        value={problemReward}
                                        onChange={(e) => setProblemReward(e.target.value)}
                                        error={!!errors.problemReward}
                                    />
                                    <Typography variant="caption" color="error">
                                        {errors.problemReward}
                                    </Typography>
                                </FormControl>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label='Deadline Date'
                                        value={problemDeadlineDate}
                                        onChange={setProblemDeadlineDate}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                fullWidth
                                                sx={{ mt: 2 }}
                                                error={!!errors.problemDeadlineDate}
                                                helperText={errors.problemDeadlineDate}
                                            />
                                        )}
                                    />
                                </LocalizationProvider>
                                <Divider sx={{ mt: 2, mb: 2 }} />
                                <Typography variant='subtitle2' gutterBottom>
                                    Problem Description:
                                </Typography>
                                <CKEditor
                                    editor={ClassicEditor}
                                    data={problemDescription}
                                    onChange={(event, editor) => setProblemDescription(editor.getData())}
                                />
                                <Typography variant="caption" color="error">
                                    {errors.problemDescription}
                                </Typography>
                                <Button type='submit' fullWidth variant='contained' sx={{ mt: 3 }}>
                                    Create Problem
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Container >
    );
}

export default CreateProblemForm;
