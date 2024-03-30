import React, { useEffect, useState } from 'react';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Grid,
    CardActions,
    Button,
    Chip,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import VisibilityIcon from '@mui/icons-material/Visibility'; // Import appropriate icon
import NewIcon from '@mui/icons-material/NewReleases'; // Import New icon

function Home() {
    const [problems, setProblems] = useState([]);
    const navigate = useNavigate(); // Initialize the useNavigate hook

    useEffect(() => {
        const fetchProblems = async () => {
            try {
                const response = await fetch('/api/problem/');
                const data = await response.json();
                setProblems(data);
            } catch (error) {
                console.error('Error fetching problems:', error);
            }
        };

        fetchProblems();
    }, []);

    const handleViewDetails = (problemId) => {
        navigate(`/problems/${problemId}`); // Redirects the user to the /problemId route
    };

    const isNewProblem = (createdAt) => {
        const createdDate = new Date(createdAt);
        const currentDate = new Date();
        const differenceInDays = Math.floor(
            (currentDate - createdDate) / (1000 * 3600 * 24)
        );
        return differenceInDays <= 10;
    };

    return (
        <>
            <Grid
                container
                spacing={4}
                padding={2}
                style={{ marginTop: 5, paddingTop: 0 }}
            >
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
                                <Typography
                                    gutterBottom
                                    variant='h5'
                                    component='div'
                                >
                                    {problem.problemTitle}
                                </Typography>
                                {isNewProblem(problem.createdAt) && (
                                    <Chip
                                        icon={<NewIcon />}
                                        label="New"
                                        color="secondary"
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
                                    label={`Deadline: ${new Date(
                                        problem.problemDeadlineDate
                                    ).toLocaleDateString()}`}
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
                                            bgcolor: 'black', // No hover effect
                                        },
                                        padding: '10px',
                                    }}
                                    onClick={() =>
                                        handleViewDetails(problem.problemId)
                                    }
                                    startIcon={<VisibilityIcon />} // Include appropriate icon
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
