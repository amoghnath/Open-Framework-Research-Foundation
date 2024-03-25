import React from "react";
import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    Link,
    Snackbar,
    Alert,
    Paper,
    Box,
    Grid,
    Typography,
    createTheme,
    ThemeProvider,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School"; // Icon for Solver (University)
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import BackgroundImage from "../../images/register-solver.jpg"; // Update this to a solver-related image

const theme = createTheme();

const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
        .min(8, "Must be 8 characters or more")
        .required("Required"),
    fullName: Yup.string().required("Required"),
    phoneNumber: Yup.string()
        .matches(/^[0-9]+$/, "Must be only digits")
        .required("Required"),
    universityName: Yup.string().required("Required"), // Updated field
    universityEmail: Yup.string()
        .email("Invalid university email address")
        .required("Required"), // Updated field
    universityAddress: Yup.string().required("Required"), // Updated field
});

export default function SolverSignUp() {
    // Component name updated
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState("");
    const [snackbarSeverity, setSnackbarSeverity] = React.useState("success");

    const handleCloseSnackbar = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpenSnackbar(false);
    };

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        setSubmitting(true);

        try {
            const response = await fetch(
                "http://localhost:3000/api/solvers/register", // Updated endpoint for solver registration
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
                }
            );

            if (response.ok) {
                const data = await response.json();
                setSnackbarMessage("Solver created successfully");
                setSnackbarSeverity("success");
                resetForm();
            } else {
                const errorData = await response.json();
                setSnackbarMessage(
                    errorData.message || "Failed to create solver"
                );
                setSnackbarSeverity("error");
            }
        } catch (error) {
            setSnackbarMessage("Network error");
            setSnackbarSeverity("error");
        }

        setOpenSnackbar(true);
        setSubmitting(false);
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: "100vh" }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: `url(${BackgroundImage})`,
                        backgroundRepeat: "no-repeat",
                        backgroundColor: (t) =>
                            t.palette.mode === "light"
                                ? t.palette.grey[50]
                                : t.palette.grey[900],
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />
                <Grid
                    item
                    xs={12}
                    sm={8}
                    md={5}
                    component={Paper}
                    elevation={6}
                    square
                >
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                            <SchoolIcon /> {/* Updated icon */}
                        </Avatar>
                        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
                            Solver Sign Up {/* Updated title */}
                        </Typography>
                        <Formik
                            initialValues={{
                                email: "",
                                password: "",
                                fullName: "",
                                phoneNumber: "",
                                universityName: "", // Updated field
                                universityEmail: "", // Updated field
                                universityAddress: "", // Updated field
                            }}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ errors, touched, isSubmitting }) => (
                                <Form sx={{ mt: 1 }}>
                                    <Field
                                        as={TextField}
                                        name="email"
                                        label="Email Address"
                                        fullWidth
                                        required
                                        error={touched.email && !!errors.email}
                                        helperText={
                                            touched.email && errors.email
                                        }
                                        sx={{ mb: 2 }} // Add margin-bottom to each field
                                    />
                                    <Field
                                        as={TextField}
                                        name="password"
                                        type="password"
                                        label="Password"
                                        fullWidth
                                        required
                                        error={
                                            touched.password &&
                                            !!errors.password
                                        }
                                        helperText={
                                            touched.password && errors.password
                                        }
                                        sx={{ mb: 2 }} // Add margin-bottom to each field
                                    />
                                    <Field
                                        as={TextField}
                                        name="fullName"
                                        label="Full Name"
                                        fullWidth
                                        required
                                        error={
                                            touched.fullName &&
                                            !!errors.fullName
                                        }
                                        helperText={
                                            touched.fullName && errors.fullName
                                        }
                                        sx={{ mb: 2 }} // Add margin-bottom to each field
                                    />
                                    <Field
                                        as={TextField}
                                        name="phoneNumber"
                                        label="Phone Number"
                                        fullWidth
                                        required
                                        error={
                                            touched.phoneNumber &&
                                            !!errors.phoneNumber
                                        }
                                        helperText={
                                            touched.phoneNumber &&
                                            errors.phoneNumber
                                        }
                                        sx={{ mb: 2 }} // Add margin-bottom to each field
                                    />
                                    <Field
                                        as={TextField}
                                        name="universityName"
                                        label="University Name"
                                        fullWidth
                                        required
                                        error={
                                            touched.universityName &&
                                            !!errors.universityName
                                        }
                                        helperText={
                                            touched.universityName &&
                                            errors.universityName
                                        }
                                        sx={{ mb: 2 }} // Add margin-bottom to each field
                                    />
                                    <Field
                                        as={TextField}
                                        name="universityEmail"
                                        label="University Email"
                                        fullWidth
                                        required
                                        error={
                                            touched.universityEmail &&
                                            !!errors.universityEmail
                                        }
                                        helperText={
                                            touched.universityEmail &&
                                            errors.universityEmail
                                        }
                                        sx={{ mb: 2 }} // Add margin-bottom to each field
                                    />
                                    <Field
                                        as={TextField}
                                        name="universityAddress"
                                        label="University Address"
                                        fullWidth
                                        required
                                        error={
                                            touched.universityAddress &&
                                            !!errors.universityAddress
                                        }
                                        helperText={
                                            touched.universityAddress &&
                                            errors.universityAddress
                                        }
                                        sx={{ mb: 2 }} // Add margin-bottom to each field
                                    />
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                        disabled={isSubmitting}
                                    >
                                        Sign Up
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="#" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: "top", horizontal: "center" }} // Adjusts the position of the Snackbar
                sx={{
                    // Adjusts the size of the Snackbar
                    "& .MuiSnackbarContent-root": { minWidth: "30%" },
                    "& .MuiPaper-root": { fontSize: "1.1rem" }, // Adjusts the font size inside the Snackbar
                }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbarSeverity}
                    sx={{ width: "100%", fontSize: "1rem" }} // Adjusts the font size of the Alert
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </ThemeProvider>
    );
}
