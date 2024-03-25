import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Grid,
    Card,
    CardContent,
    Typography,
    Chip,
    Box,
    Modal,
    Button,
} from "@mui/material";
import { useNavigate, useLocation } from 'react-router-dom';

import {
    MonetizationOn as MonetizationOnIcon,
    Close as CloseIcon,
    AccessTime as AccessTimeIcon, // Icon for the deadline
} from "@mui/icons-material";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    maxWidth: "80%", // Making the modal width 80% of the viewport width
    bgcolor: "background.paper",
    p: 4,
    overflowY: "auto", // Adding scroll for overflow content
};

export function Home() {
    const [problems, setProblems] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [selectedProblem, setSelectedProblem] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();
    const getQueryParams = () => new URLSearchParams(location.search);
    
    useEffect(() => {
        const fetchProblems = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:3000/api/uploaders/view-all-problems"
                );
                setProblems(response.data.data);
            } catch (error) {
                console.error("Failed to fetch problems:", error);
            }
        };

        fetchProblems();
    }, []);

    useEffect(() => {
        const queryParams = getQueryParams();
        const problemId = queryParams.get('problemId');

        if (problemId) {
            const problem = problems.find(p => p.id === problemId);
            if (problem) {
                setSelectedProblem(problem);
                setOpenModal(true);
            }
        }
    }, [location, problems]);

    const handleOpenModal = (problem) => {
        setSelectedProblem(problem);
        setOpenModal(true);
        // Update the URL with the problem ID
        navigate(`${window.location.pathname}?problemId=${problem.id}`, {
            replace: true,
        });
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        // Navigate back to the original path without the problem ID
        navigate(window.location.pathname, { replace: true });
    };

    const truncateDescription = (description) => {
        // Truncate the description to 100 characters
        return description.length > 100
            ? description.substring(0, 100) + "..."
            : description;
    };

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <Box sx={{ margin: 2 }}>
            <Grid container spacing={3}>
                {problems.map((problem) => (
                    <Grid item xs={12} sm={6} md={4} key={problem.id}>
                        <Card
                            sx={{
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                border: "1px solid rgba(0, 0, 0, 0.12)",
                            }}
                            onClick={() => handleOpenModal(problem)}
                        >
                            <CardContent
                                sx={{ flexGrow: 1, cursor: "pointer" }}
                            >
                                <Typography variant="h5" component="div">
                                    {problem.problemTitle}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    dangerouslySetInnerHTML={{
                                        __html: truncateDescription(
                                            problem.problemDescription
                                        ),
                                    }}
                                    sx={{ mt: 2 }}
                                />
                                <Chip
                                    icon={<MonetizationOnIcon />}
                                    label={`Reward: ${problem.reward}`}
                                    variant="outlined"
                                    color="primary"
                                    sx={{ mt: 2 }}
                                />
                                <Chip
                                    icon={<AccessTimeIcon />}
                                    label={`Deadline: ${formatDate(
                                        problem.deadlineDate
                                    )}`}
                                    variant="outlined"
                                    color="error" // Use the 'error' color from the theme for a red color
                                    sx={{ mt: 2, ml: 1 }} // Added margin left for spacing between chips
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Modal for displaying selected problem details */}
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Button
                        onClick={handleCloseModal}
                        sx={{ position: "absolute", right: 8, top: 8 }}
                    >
                        <CloseIcon />
                    </Button>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        {selectedProblem?.problemTitle}
                    </Typography>
                    <Typography
                        id="modal-modal-description"
                        sx={{ mt: 2 }}
                        dangerouslySetInnerHTML={{
                            __html: selectedProblem?.problemDescription,
                        }}
                    />
                    <Chip
                        icon={<MonetizationOnIcon />}
                        label={`Reward: ${selectedProblem?.reward}`}
                        variant="outlined"
                        color="primary"
                        sx={{ mt: 2 }}
                    />
                    <Chip
                        icon={<AccessTimeIcon />}
                        label={`Deadline: ${formatDate(
                            selectedProblem?.deadlineDate
                        )}`}
                        variant="outlined"
                        color="error" // Use the 'error' color from the theme for a red color
                        sx={{ mt: 2, ml: 1 }} // Added margin left for spacing between chips
                    />
                </Box>
            </Modal>
        </Box>
    );
}
