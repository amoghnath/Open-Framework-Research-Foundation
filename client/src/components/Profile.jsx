import React, { useEffect, useState } from 'react';
import { Paper, Accordion, AccordionSummary, AccordionDetails, Typography, Chip, Stack } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import EventIcon from '@mui/icons-material/Event';
import UpdateIcon from '@mui/icons-material/Update';
import CreateIcon from '@mui/icons-material/Create';
import { useSnackbar } from '../context/SnackBarContext';
import { useAuth } from '../context/AuthContext';

const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

const SolutionItem = ({ solution }) => {
    return (
        <Accordion>
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
                    <Typography variant="h5">{solution.solutionTitle}</Typography>
                    <Typography
                        variant="body1"
                        component="div"
                        dangerouslySetInnerHTML={{ __html: solution.solutionDescription }}
                    />
                </Stack>
            </AccordionDetails>
        </Accordion>
    );
};

// Placeholder for a component shown to uploaders
const UploaderComponent = () => {
    return (
        <Typography variant="h5">
            This is a special section for uploaders.
        </Typography>
    );
};

const SolutionsList = () => {
    const [solutions, setSolutions] = useState([]);
    const [isFetched, setIsFetched] = useState(false);  // State to track if solutions have been fetched
    const { openSnackbar } = useSnackbar();
    const { isAuthenticated, currentUser } = useAuth();

    useEffect(() => {
        if (currentUser?.role === 'solver' && !isFetched) {
            const fetchSolutions = async () => {
                try {
                    const response = await fetch('/api/solution', {
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
                    openSnackbar(error.message);
                } finally {
                    setIsFetched(true);  // Mark as fetched to prevent re-fetching
                }
            };

            fetchSolutions();
        }
    }, [openSnackbar, currentUser, isFetched]);  // Add isFetched to the dependency array

    return (
        <Paper sx={{ m: 2, mt: -45, p: 2 }}>
            {currentUser?.role === 'solver' && (
                <>
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
                </>
            )}
            {currentUser?.role === 'uploader' && <UploaderComponent />}
        </Paper>
    );
};

export default SolutionsList;