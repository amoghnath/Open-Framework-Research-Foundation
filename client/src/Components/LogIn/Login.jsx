import React from "react";
import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    Link,
    Grid,
    Box,
    Typography,
    Container,
    createTheme,
    ThemeProvider,
    RadioGroup,
    FormControlLabel,
    Radio,
    Snackbar,
    FormHelperText,
    Alert,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload"; // Icon for Uploader
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext"; // Adjust the import path as necessary

const theme = createTheme();

const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required"),
    role: Yup.string()
        .oneOf(["solver", "uploader"], "Invalid role")
        .required("Required"),
});

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState("");

    const handleSnackbarClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpenSnackbar(false);
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            await login(values.email, values.password, values.role); // Use login method from context
            navigate("/"); // Redirect to home page on successful login
        } catch (error) {
            console.error(
                "Login error:",
                error.response?.data?.message || "An error occurred"
            );
            setSnackbarMessage(
                error.response?.data?.message || "An error occurred"
            );
            setOpenSnackbar(true);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Formik
                        initialValues={{ email: "", password: "", role: "" }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({
                            errors,
                            touched,
                            values,
                            setFieldValue,
                            handleChange,
                        }) => (
                            <Form sx={{ mt: 1 }}>
                                <Field
                                    as={TextField}
                                    name="email"
                                    label="Email Address"
                                    fullWidth
                                    required
                                    error={touched.email && !!errors.email}
                                    helperText={touched.email && errors.email}
                                    margin="normal"
                                    variant="outlined"
                                    autoComplete="email"
                                    autoFocus
                                />
                                <Field
                                    as={TextField}
                                    name="password"
                                    label="Password"
                                    type="password"
                                    fullWidth
                                    required
                                    error={
                                        touched.password && !!errors.password
                                    }
                                    helperText={
                                        touched.password && errors.password
                                    }
                                    margin="normal"
                                    variant="outlined"
                                    autoComplete="current-password"
                                />
                                <RadioGroup
                                    row
                                    name="role"
                                    value={values.role}
                                    onChange={handleChange}
                                >
                                    <FormControlLabel
                                        value="solver"
                                        control={<Radio />}
                                        label="Solver"
                                    />
                                    <FormControlLabel
                                        value="uploader"
                                        control={<Radio />}
                                        label="Uploader"
                                    />
                                </RadioGroup>
                                <ErrorMessage name="role">
                                    {(msg) => (
                                        <FormHelperText error>
                                            {msg}
                                        </FormHelperText>
                                    )}
                                </ErrorMessage>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Sign In
                                </Button>
                                <Grid
                                    container
                                    spacing={1}
                                    justifyContent="center"
                                >
                                    <Box textAlign="center" marginTop={2}>
                                        <Typography
                                            variant="body2"
                                            marginBottom={1}
                                        >
                                            {"Don't have an account?"}
                                        </Typography>
                                        <Grid
                                            container
                                            spacing={2}
                                            justifyContent="center"
                                        >
                                            <Grid item>
                                                <Link
                                                    href="/signup-uploader"
                                                    variant="body2"
                                                    display="flex"
                                                    alignItems="center"
                                                    justifyContent="center"
                                                >
                                                    <CloudUploadIcon
                                                        sx={{ marginRight: 1 }}
                                                    />
                                                    Sign Up as Uploader
                                                </Link>
                                            </Grid>
                                            <Grid item>
                                                <Link
                                                    href="/signup-solver"
                                                    variant="body2"
                                                    display="flex"
                                                    alignItems="center"
                                                    justifyContent="center"
                                                >
                                                    <EmojiObjectsIcon
                                                        sx={{ marginRight: 1 }}
                                                    />
                                                    Sign Up as Solver
                                                </Link>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Grid>
                            </Form>
                        )}
                    </Formik>
                </Box>

                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={6000}
                    onClose={handleSnackbarClose}
                >
                    <Alert
                        onClose={handleSnackbarClose}
                        severity="error"
                        sx={{ width: "100%" }}
                    >
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </Container>
        </ThemeProvider>
    );
}
