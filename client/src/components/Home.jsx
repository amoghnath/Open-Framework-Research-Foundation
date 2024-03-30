import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Grid, CardActions, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

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

    return (
        <Grid container spacing={4} padding={2} style={{ marginTop: 5, paddingTop: 0 }}>
            {problems.map((problem) => (
                <Grid item xs={12} sm={6} md={4} key={problem.problemId}>
                    <Card>
                        <CardMedia
                            component="img"
                            alt={problem.problemTitle}
                            height="140"
                            image={`/assets/card.jpg`}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {problem.problemTitle}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" dangerouslySetInnerHTML={{ __html: problem.problemDescription }} />
                            <Typography variant="body1">
                                Reward: ₹{new Intl.NumberFormat('en-IN').format(problem.problemReward)}
                            </Typography>
                            <Typography variant="body1">
                                Deadline: {new Date(problem.problemDeadlineDate).toLocaleDateString()}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" onClick={() => handleViewDetails(problem.problemId)}>View Details</Button>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}

export default Home;
