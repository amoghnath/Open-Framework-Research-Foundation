import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Alert } from "@mui/material";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { InputAdornment } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import withAuthVerification from "../../HOC/withAuthVerification";

const CreateProblem = () => {
    const [problemTitle, setproblemTitle] = useState("");
    const [deadlineDate, setdeadlineDate] = useState(null);
    const [reward, setReward] = useState("");
    const [problemDescription, setProblemDescription] = useState("");

    const navigate = useNavigate();

    const handleSave = () => {
        const data = {
            problemTitle,
            deadlineDate: deadlineDate ? deadlineDate.toISOString() : "", // Format date or handle null
            reward,
            problemDescription,
        };

        axios
            .post("http://localhost:3000/api/uploaders/create-problem", data, {
                withCredentials: true, // Ensure cookies are sent with the request
                headers: {
                    "Content-Type": "application/json", // Ensure the content type is set correctly
                },
            })
            .then(() => {
                console.log("Form submitted successfully");
                navigate("/");
            })
            .catch((error) => {
                console.log("Error submitting form:", error);
            });
    };

    return (
        <Container component="main">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography component="h1" variant="h5">
                    Create Problem
                </Typography>
                <Grid container spacing={3} sx={{ mt: 3, width: "100%" }}>
                    {" "}
                    {/* Adjusted for full width */}
                    {/* Left side of the form for Title, Deadline, and Reward */}
                    <Grid item xs={12} md={6}>
                        <TextField
                            required
                            fullWidth
                            id="title"
                            label="Problem Title"
                            autoFocus
                            value={problemTitle}
                            onChange={(e) => setproblemTitle(e.target.value)}
                            sx={{ mb: 2 }} // Margin bottom for spacing
                        />

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                fullWidth
                                label="Deadline Date"
                                id="deadlineDate"
                                value={deadlineDate}
                                onChange={(newValue) =>
                                    setdeadlineDate(newValue)
                                }
                                renderInput={(params) => (
                                    <TextField {...params} sx={{ mb: 2 }} />
                                )} // Margin bottom for spacing
                            />
                        </LocalizationProvider>

                        <TextField
                            label="Reward Amount"
                            id="reward"
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        INR
                                    </InputAdornment>
                                ),
                            }}
                            value={reward}
                            sx={{ mt: 2 }}
                            onChange={(e) => setReward(e.target.value)}
                        />
                        <Alert variant="outlined" severity="info" sx={{ mt: 2 }}>
                            <Typography variant="body2" sx={{ mt: 2 }}>
                                Please ensure your problem statement follows
                                these guidelines:
                                <ul>
                                    <li>
                                        Clearly define the objectives and
                                        expected outcomes.
                                    </li>
                                    <li>
                                        Provide all necessary context and
                                        background information.
                                    </li>
                                    <li>
                                        Mention any specific constraints or
                                        requirements.
                                    </li>
                                    <li>
                                        Use bullet points or numbered lists for
                                        better readability.
                                    </li>
                                    <li>
                                        Include all necessary information such
                                        as the context of the problem, specific
                                        questions, expected outcomes,
                                        constraints, etc. This description will
                                        help solvers understand what is required
                                        and provide accurate solutions.
                                    </li>
                                </ul>
                            </Typography>
                        </Alert>

                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3 }}
                            onClick={handleSave}
                        >
                            Create Problem
                        </Button>
                    </Grid>
                    {/* Right side of the form for Problem Description */}
                    <Grid item xs={12} md={6}>
                        <CKEditor
                            editor={ClassicEditor}
                            data={problemDescription}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setProblemDescription(data);
                            }}
                            config={{
                                placeholder: "Problem Description",
                            }}
                        />
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default withAuthVerification(CreateProblem, "uploader");
