import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Paper,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    CircularProgress,
    Grid,
    Stack,
    Avatar,
    IconButton,
    Chip
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EmailIcon from '@mui/icons-material/Email';
import BusinessIcon from '@mui/icons-material/Business';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ProblemIcon from '@mui/icons-material/QuestionMark';
import SolutionIcon from '@mui/icons-material/Insights';

function UserDetail({ title, Icon, detail, email = false }) {
    return (
        <Grid item xs={12} sm={6} md={4}>
            <Stack direction='column' alignItems='center' spacing={1}>
                <Typography variant='body2' sx={{ fontWeight: 'bold' }}>
                    {title}
                </Typography>
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                    <Icon />
                </Avatar>
                <Typography variant='body2'>
                    {email ? <a href={`mailto:${detail}`} style={{ textDecoration: 'none' }}>{detail}</a> : detail}
                </Typography>
            </Stack>
        </Grid>
    );
}

const UploaderProfile = () => {
    const [problems, setProblems] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProblems = async () => {
            try {
                const response = await fetch('/api/problem/uploader-profile', {
                    method: 'GET',
                    credentials: 'include',
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
        <Box sx={{ mx: 4 }}>
            <Typography variant="h4" sx={{ mb: 4 }}>
                Uploaded Problems
            </Typography>
            {problems.map((problem) => (
                <Accordion key={problem.problemId} sx={{ mb: 3 }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <ProblemIcon sx={{ mr: 2 }} />
                            <Typography variant="h5" sx={{ flex: 1 }}>{problem.problemTitle}</Typography>
                            <Chip
                                label={`${problem.Solutions.length} Solution${problem.Solutions.length === 1 ? '' : 's'} Submitted`}
                                color="secondary"
                                sx={{ ml: 1 }}
                            />
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                        {problem.Solutions.length > 0 ? (
                            problem.Solutions.map((solution) => (
                                <Accordion key={solution.solutionId} sx={{ mb: 1 }}>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                        <SolutionIcon sx={{ mr: 2 }} />
                                        <Typography>{solution.solutionTitle}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography variant="body2" sx={{ mb: 2 }} dangerouslySetInnerHTML={{ __html: solution.solutionDescription }} />
                                        <Grid container spacing={2}>
                                            <UserDetail
                                                title='Solver Name'
                                                Icon={PersonIcon}
                                                detail={solution.Solver.solverFullName}
                                            />
                                            <UserDetail
                                                title='Solver Email'
                                                Icon={EmailIcon}
                                                detail={solution.Solver.solverEmail}
                                                email
                                            />
                                            <UserDetail
                                                title='Phone Number'
                                                Icon={BusinessIcon}
                                                detail={solution.Solver.solverPhoneNumber}
                                            />
                                            <UserDetail
                                                title='University Email'
                                                Icon={EmailIcon}
                                                detail={solution.Solver.solverUniversityEmail}
                                                email
                                            />
                                            <UserDetail
                                                title='University Name'
                                                Icon={LocationOnIcon}
                                                detail={solution.Solver.solverUniversityName}
                                            />
                                            <UserDetail
                                                title='University Address'
                                                Icon={LocationOnIcon}
                                                detail={solution.Solver.solverUniversityAddress}
                                            />
                                        </Grid>
                                    </AccordionDetails>
                                </Accordion>
                            ))
                        ) : (
                            <Typography sx={{ mt: 2 }}>No solutions submitted yet.</Typography>
                        )}
                    </AccordionDetails>
                </Accordion>
            ))
            }
        </Box >
    );
};

export default UploaderProfile;
