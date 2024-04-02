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
    Grid,
    Avatar
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import EventIcon from '@mui/icons-material/Event';
import UpdateIcon from '@mui/icons-material/Update';
import CreateIcon from '@mui/icons-material/Create';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

// const UserInfo = ({ user }) => (
//     <Paper elevation={3} sx={{ p: 3, mb: 4, mt: 2 }}>
//         <Grid container spacing={2} alignItems="center">
//             <Grid item xs={12} sm={3} display="flex" justifyContent="center">
//                 <Avatar sx={{ width: 100, height: 100 }}>
//                     <PersonIcon sx={{ fontSize: 60 }} />
//                 </Avatar>
//             </Grid>
//             <Grid item xs={12} sm={9}>
//                 <Typography variant="h6" sx={{ mb: 1 }}>
//                     {user.solverFullName}
//                 </Typography>
//                 <Typography variant="body1">
//                     <EmailIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
//                     {user.solverEmail}
//                 </Typography>
//                 <Typography variant="body1">
//                     <EmailIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
//                     {user.solverPhoneNumber}
//                 </Typography>
//             </Grid>
//         </Grid>
//     </Paper>
// );

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
            if (!currentUser || currentUser.role !== 'solver') {
                return;
            }

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

        fetchSolutions();
    }, [currentUser]); // Ensure currentUser is in the dependency array

    if (!currentUser || currentUser.role !== 'solver') {
        return null;
    }

    return (
        <Paper sx={{ m: 2, p: 2 }} elevation={0}>
            {/* {currentUser && <UserInfo user={currentUser} />} */}
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
