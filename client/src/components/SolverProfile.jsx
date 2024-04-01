import React, { useEffect, useState } from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Chip,
    Stack,
    Paper,
    Button,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import EventIcon from '@mui/icons-material/Event';
import UpdateIcon from '@mui/icons-material/Update';
import CreateIcon from '@mui/icons-material/Create';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'; // Icon for the button
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

const SolutionItem = ({ solution }) => {
    const navigate = useNavigate();

    const goToProblemDetails = () => {
        navigate(`/problems/${solution.problemId}`);
    };

    return (
        <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">{solution.Problem.problemTitle}</Typography>
                <Stack direction="row" spacing={1} marginLeft={2}>
                    <Chip icon={<MonetizationOnIcon />} label={`Reward: ${solution.Problem.problemReward}`} />
                    <Chip icon={<EventIcon />} label={`Deadline: ${formatDate(solution.Problem.problemDeadlineDate)}`} />
                    <Chip icon={<CreateIcon />} label={`Created: ${formatDate(solution.createdAt)}`} />
                    <Chip icon={<UpdateIcon />} label={`Updated: ${formatDate(solution.updatedAt)}`} />
                </Stack>
            </AccordionSummary>
            <AccordionDetails>
                <Stack direction="column" spacing={1}>
                    <Button
                        variant="contained"
                        endIcon={<ArrowForwardIcon />}
                        onClick={goToProblemDetails}
                        sx={{
                            mb: 5,
                            color: 'white',
                            backgroundColor: 'black',
                            '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
                        }}
                    >
                        Go to Problem
                    </Button>
                    <Paper sx={{ p: 2, mt: 2 }} elevation={1}>
                        <Typography variant="h5">{solution.solutionTitle}</Typography>
                        <Typography
                            variant="body1"
                            component="div"
                            dangerouslySetInnerHTML={{ __html: solution.solutionDescription }}
                        />
                    </Paper>

                </Stack>
            </AccordionDetails>
        </Accordion>
    );
};

const SolutionsProfile = () => {
    const [solutions, setSolutions] = useState([]);
    const { currentUser } = useAuth();

    useEffect(() => {
        const fetchSolutions = async () => {
            try {
                const response = await fetch('/api/solution/solver-profile', {
                    method: 'GET',
                    credentials: 'include',
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Failed to fetch solutions');
                }

                const data = await response.json();
                setSolutions(data);
            } catch (error) {
                console.error('Error fetching solutions:', error);
            }
        };

        if (currentUser?.role === 'solver') {
            fetchSolutions();
        }
    }, [currentUser]);

    if (currentUser?.role !== 'solver') {
        return null;
    }

    return (
        <Paper sx={{ m: 2, p: 2 }} elevation={0}>
            <Typography variant="h4" gutterBottom sx={{ pt: 2 }}>
                Solutions Submitted
            </Typography>
            {solutions.length > 0 ? (
                solutions.map((solution) => (
                    <SolutionItem key={solution.solutionId} solution={solution} />
                ))
            ) : (
                <Typography sx={{ mt: 2 }}>No solutions uploaded yet.</Typography>
            )}
        </Paper>
    );
};

export default SolutionsProfile;
