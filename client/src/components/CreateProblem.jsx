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

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Here you would handle form submission, e.g., calling an API
        alert('Form submitted, check the console for details.');
        console.log({
            problemTitle,
            problemDescription,
            problemReward,
            problemDeadlineDate: problemDeadlineDate?.format(), // Convert Dayjs object to string
        });
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
                                        <ListItemText primary='You must be at least 18 years old to register.' />
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <ListItemText primary='Provide accurate and complete registration information.' />
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <ListItemText primary='You should have valid business credentials for registration.' />
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <ListItemText primary='Ensure that the business email and business address provided are valid and currently in use.' />
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
                                        <ListItemText primary='Do not engage in any activities that would disrupt, damage, or harm the service or experience of other users.' />
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <ListItemText primary='All registered content will be moderated and must comply with our content guidelines.' />
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
                                />
                                <FormControl fullWidth sx={{ mt: 2, mb: 2 }}>
                                    <InputLabel htmlFor='problemReward'>Reward</InputLabel>
                                    <OutlinedInput
                                        id='problemReward'
                                        startAdornment={<InputAdornment position='start'>$</InputAdornment>}
                                        value={problemReward}
                                        onChange={(e) => setProblemReward(e.target.value)}
                                    />
                                </FormControl>
                                <LocalizationProvider dateAdapter={AdapterDayjs} >
                                    <DatePicker
                                        label='Deadline Date'
                                        value={problemDeadlineDate}
                                        onChange={setProblemDeadlineDate}
                                        renderInput={(params) => <TextField {...params} fullWidth sx={{ mt: 2 }} />}
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