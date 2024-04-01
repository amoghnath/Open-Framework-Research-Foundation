import React, { useEffect, useState } from 'react';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Grid,
    Button,
    Chip,
    useTheme,
    Paper,
    Box,
    IconButton,
    CardActions // Import CardActions
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import VisibilityIcon from '@mui/icons-material/Visibility';
import NewIcon from '@mui/icons-material/NewReleases';
import HistoryIcon from '@mui/icons-material/History';
import SortIcon from '@mui/icons-material/Sort';

function Home() {
    const [problems, setProblems] = useState([]);
    const navigate = useNavigate();
    const theme = useTheme();

    useEffect(() => {
        fetchProblems();
    }, []);

    const fetchProblems = async () => {
        try {
            const response = await fetch('/api/problem/');
            const data = await response.json();
            setProblems(data);
        } catch (error) {
            console.error('Error fetching problems:', error);
        }
    };

    const handleViewDetails = (problemId) => {
        navigate(`/problems/${problemId}`);
    };

    // Function to determine if a problem is new
    const isNewProblem = (createdAt) => {
        const createdDate = new Date(createdAt);
        const currentDate = new Date();
        const differenceInDays = Math.floor((currentDate - createdDate) / (1000 * 3600 * 24));
        return differenceInDays <= 10;
    };

    const sortProblemsByReward = () => {
        setProblems([...problems].sort((a, b) => b.problemReward - a.problemReward));
    };

    const sortProblemsByDeadline = () => {
        setProblems([...problems].sort((a, b) => new Date(a.problemDeadlineDate) - new Date(b.problemDeadlineDate)));
    };

    const highestReward = problems.length > 0 ? Math.max(...problems.map(p => p.problemReward)) : 0;
    const closestDeadline = problems.reduce((closest, problem) => {
        const currentDate = new Date();
        const problemDate = new Date(problem.problemDeadlineDate);
        return problemDate > currentDate && (!closest || problemDate < new Date(closest.problemDeadlineDate)) ? problem : closest;
    }, null);

    return (
        <>
            <Paper sx={{ padding: theme.spacing(3), margin: theme.spacing(3, 1) }}>
                <Typography variant="h4" gutterBottom>
                    Problem Dashboard
                </Typography>
                <Typography variant="h6">
                    Total Problems: {problems.length}
                </Typography>
                <Typography variant="h6">
                    Highest Reward: ₹{new Intl.NumberFormat('en-IN').format(highestReward)}
                </Typography>
                <Typography variant="h6">
                    Closest Deadline: {closestDeadline ? new Date(closestDeadline.problemDeadlineDate).toLocaleDateString() : 'N/A'}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                    <Typography variant="h6" sx={{ mr: 1 }}>
                        Sort By:
                    </Typography>
                    <IconButton onClick={sortProblemsByReward}>
                        <MonetizationOnIcon />
                    </IconButton>
                    <IconButton onClick={sortProblemsByDeadline}>
                        <EventIcon />
                    </IconButton>
                </Box>
            </Paper>
            <Grid container spacing={4} padding={2} style={{ marginTop: 5, paddingTop: 0 }}>
                {problems.map((problem) => (
                    <Grid item xs={12} sm={6} md={4} key={problem.problemId}>
                        <Card>
                            <CardMedia
                                component='img'
                                alt={problem.problemTitle}
                                height='140'
                                image={`/assets/card.jpg`}
                            />
                            <CardContent>
                                <Typography gutterBottom variant='h5' component='div'>
                                    {problem.problemTitle}
                                </Typography>
                                {isNewProblem(problem.createdAt) ? (
                                    <Chip
                                        icon={<NewIcon />}
                                        label="New"
                                        color="secondary"
                                        variant="outlined"
                                        sx={{ marginTop: '8px' }}
                                    />
                                ) : (
                                    <Chip
                                        icon={<HistoryIcon />}  // Use an appropriate icon for old items
                                        label="Old"
                                        color="default"
                                        variant="outlined"
                                        sx={{ marginTop: '8px' }}
                                    />
                                )}
                            </CardContent>
                            <div
                                style={{
                                    display: 'flex',
                                    padding: '0 16px 16px',
                                }}
                            >
                                <Chip
                                    icon={<MonetizationOnIcon />}
                                    label={`Reward: ₹${new Intl.NumberFormat('en-IN').format(
                                        problem.problemReward
                                    )}`}
                                    variant='outlined'
                                />
                                <Chip
                                    icon={<EventIcon />}
                                    label={`Deadline: ${new Date(problem.problemDeadlineDate).toLocaleDateString('en-US', {
                                        weekday: 'long', // "Monday"
                                        year: 'numeric', // "2023"
                                        month: 'long', // "July"
                                        day: 'numeric' // "20"
                                    })}`}
                                    variant='outlined'
                                />
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    padding: '0 16px 16px',
                                }}
                            >
                                <Chip
                                    icon={<AccessTimeIcon />}
                                    label={`Created: ${new Date(
                                        problem.createdAt
                                    ).toLocaleString()}`}
                                    variant='outlined'
                                    sx={{ mr: 1 }} // Add right margin
                                />
                                <Chip
                                    icon={<AccessTimeIcon />}
                                    label={`Updated: ${new Date(
                                        problem.updatedAt
                                    ).toLocaleString()}`}
                                    variant='outlined'
                                    sx={{ mr: 1 }} // Add right margin
                                />
                            </div>
                            <CardActions>
                                <Button
                                    fullWidth
                                    size='small'
                                    sx={{
                                        bgcolor: 'black',
                                        color: 'white',
                                        '&:hover': {
                                            bgcolor: 'black',
                                        },
                                        padding: '10px',
                                    }}
                                    onClick={() => handleViewDetails(problem.problemId)}
                                    startIcon={<VisibilityIcon />}
                                >
                                    View Details
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    );
}

export default Home;
