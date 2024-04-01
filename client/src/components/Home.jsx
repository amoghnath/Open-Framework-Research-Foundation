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
    Stack,
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

    const sortProblemsByReward = (ascending = true) => {
        setProblems([...problems].sort((a, b) => ascending ? a.problemReward - b.problemReward : b.problemReward - a.problemReward));
    };

    const sortProblemsByDeadline = (nearest = true) => {
        setProblems([...problems].sort((a, b) => nearest ? new Date(a.problemDeadlineDate) - new Date(b.problemDeadlineDate) : new Date(b.problemDeadlineDate) - new Date(a.problemDeadlineDate)));
    };

    const highestReward = problems.length > 0 ? Math.max(...problems.map(p => p.problemReward)) : 0;
    const closestDeadline = problems.reduce((closest, problem) => {
        const currentDate = new Date();
        const problemDate = new Date(problem.problemDeadlineDate);
        return problemDate > currentDate && (!closest || problemDate < new Date(closest.problemDeadlineDate)) ? problem : closest;
    }, null);

    return (
        <>
            <Paper elevation={0} sx={{ padding: theme.spacing(1), display: 'flex', justifyContent: 'center' }}>
                <Stack direction="row" spacing={2} alignItems="center">
                    <Chip
                        icon={<SortIcon sx={{ color: '#33a2ff !important', }} />}
                        label={`Total Problems: ${problems.length}`}
                        color="primary"
                        variant="filled" // Use filled variant for background color
                        sx={{
                            borderRadius: 0,
                            backgroundColor: 'black',
                            color: 'white',
                            fontSize: "25px",
                            padding: "25px"
                        }}
                    />
                    <Chip
                        icon={<MonetizationOnIcon sx={{ color: '#ffee85 !important' }} />}
                        label={`Highest Reward: ₹${new Intl.NumberFormat('en-IN').format(highestReward)}`}
                        color="success"
                        variant="filled"
                        sx={{
                            borderRadius: 0,
                            backgroundColor: 'black', // Set the background color
                            color: 'white',
                            fontSize: "25px",
                            padding: "25px"
                        }}
                    />
                    <Chip
                        icon={<EventIcon sx={{ color: '#ff8585 !important' }} />}
                        label={`Closest Deadline: ${closestDeadline
                            ? new Date(closestDeadline.problemDeadlineDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                            : 'N/A'
                            }`}
                        color="warning"
                        variant="filled"
                        sx={{
                            borderRadius: 0,
                            backgroundColor: 'black',
                            color: 'white',
                            fontSize: "25px",
                            padding: "25px"
                        }}
                    />



                </Stack>
            </Paper>
            <Paper elevation={0} sx={{ ml: 2 }}>

                <Stack direction="row" alignItems="center" sx={{ mt: 2, mb: 1 }}>
                    <SortIcon sx={{ mr: 1 }} />
                    <Typography variant="h6" sx={{ mr: 1 }}>
                        Sort By:
                    </Typography>
                    <Button
                        variant="outlined"
                        startIcon={<MonetizationOnIcon />}
                        onClick={() => sortProblemsByReward()}
                        sx={{ mr: 1 }}
                    >
                        Lowest Reward
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<MonetizationOnIcon />}
                        onClick={() => sortProblemsByReward(false)}
                        sx={{ mr: 1 }}
                    >
                        Highest Reward
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<EventIcon />}
                        onClick={() => sortProblemsByDeadline()}
                        sx={{ mr: 1 }}
                    >
                        Closest Deadline
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<EventIcon />}
                        onClick={() => sortProblemsByDeadline(false)}
                    >
                        Farthest Deadline
                    </Button>
                </Stack>

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
                                        label="New Problem"
                                        color="secondary"
                                        variant="outlined"
                                        sx={{ marginTop: '8px' }}
                                    />
                                ) : (
                                    <Chip
                                        icon={<HistoryIcon />}  // Use an appropriate icon for old items
                                        label="Old Problem"
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
