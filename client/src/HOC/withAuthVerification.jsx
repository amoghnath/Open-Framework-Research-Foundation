import React, { useState, useEffect } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const withAuthVerification = (WrappedComponent, expectedRole) => {
    return (props) => {
        const [isVerified, setIsVerified] = useState(false);
        const [isLoading, setIsLoading] = useState(true);
        const [snackbarOpen, setSnackbarOpen] = useState(false);
        const navigate = useNavigate(); // Use useNavigate hook

        useEffect(() => {
            const verifyToken = async () => {
                try {
                    const response = await axios.get(
                        "http://localhost:3000/api/auth/verify",
                        { withCredentials: true }
                    );
                    if (
                        response.status === 200 &&
                        response.data.role === expectedRole
                    ) {
                        setIsVerified(true);
                    } else {
                        throw new Error("Role mismatch");
                    }
                } catch (error) {
                    console.error("Access denied:", error);
                    setIsVerified(false);
                    setSnackbarOpen(true);
                    setTimeout(() => {
                        navigate("/login"); // Redirect to login after a delay
                    }, 2000); // Wait for the Snackbar to auto-hide
                } finally {
                    setIsLoading(false);
                }
            };

            verifyToken();
        }, [navigate]); // Include navigate in the dependency array

        const handleSnackbarClose = (event, reason) => {
            if (reason === "clickaway") {
                return;
            }
            setSnackbarOpen(false);
            navigate("/login"); // Redirect to login when the Snackbar is manually closed
        };

        if (isLoading) {
            return (
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="100vh"
                >
                    <CircularProgress />
                </Box>
            );
        }

        return (
            <>
                {isVerified ? (
                    <WrappedComponent {...props} />
                ) : (
                    <Snackbar
                        open={snackbarOpen}
                        autoHideDuration={6000}
                        onClose={handleSnackbarClose}
                    >
                        <Alert
                            onClose={handleSnackbarClose}
                            severity="error"
                            sx={{ width: "100%" }}
                        >
                            Access denied. Incorrect role or not logged in.
                        </Alert>
                    </Snackbar>
                )}
            </>
        );
    };
};

export default withAuthVerification;
