import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Paper,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    CircularProgress,
    Chip,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const UploaderProfile = () => {
    const [problems, setProblems] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProblems = async () => {
            try {
                const response = await fetch('/api/problem/uploader-profile', {
                    method: 'GET',
                    credentials: 'include', // to send the HTTP-only cookie
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch problems');
                }
                const data = await response.json();
                setProblems(data);
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProblems();
    }, []);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    if (!problems || problems.length === 0) {
        return <Typography variant="h6" textAlign="center">No problems found.</Typography>;
    }

    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 2 }}>
                Uploaded Problems
            </Typography>
            {problems.map((problem) => (
                <Paper key={problem.problemId} sx={{ mb: 2, p: 2 }}>
                    <Typography variant="h5">{problem.problemTitle}</Typography>
                    {problem.Solutions.length > 0 && (
                        <Box mt={2}>
                            <Typography variant="h6">Solutions:</Typography>
                            {problem.Solutions.map((solution) => (
                                <Accordion key={solution.solutionId}>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                        <Typography>{solution.solutionTitle}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography variant="body2">{solution.solutionDescription}</Typography>
                                    </AccordionDetails>
                                </Accordion>
                            ))}
                        </Box>
                    )}
                </Paper>
            ))}
        </Box>
    );
};

export default UploaderProfile;
