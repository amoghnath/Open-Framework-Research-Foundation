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
    InputAdornment
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

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
        <Container component='main' maxWidth='md'>
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component='h1' variant='h5'>
                    Create New Problem
                </Typography>
                <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
                    <TextField
                        margin='normal'
                        required
                        fullWidth
                        name='problemDescription'
                        label='Problem Description'
                        id='problemDescription'
                        multiline
                        rows={4}
                        value={problemDescription}
                        onChange={(e) => setProblemDescription(e.target.value)}
                    />
                    <FormControl fullWidth sx={{ mt: 2 }}>
                        <InputLabel htmlFor='problemReward'>Reward</InputLabel>
                        <OutlinedInput
                            id='problemReward'
                            startAdornment={<InputAdornment position='start'>$</InputAdornment>}
                            value={problemReward}
                            onChange={(e) => setProblemReward(e.target.value)}
                        />
                    </FormControl>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label='Deadline Date'
                            value={problemDeadlineDate}
                            onChange={setProblemDeadlineDate}
                            renderInput={(params) => <TextField {...params} fullWidth sx={{ mt: 2 }} />}
                        />
                    </LocalizationProvider>
                    <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                        Create Problem
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

export default CreateProblemForm;
