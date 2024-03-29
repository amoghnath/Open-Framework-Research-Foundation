import React from "react";
import { Box, Container, Typography } from "@mui/material";

const Footer = () => {
    return (
        <Box
            sx={{
                width: '100%',
                bgcolor: 'black', // Set background color to black
                color: 'white', // Set text color to white
                padding: '1rem 0' // Add vertical padding
            }}
        >
            <Container maxWidth="lg">
                <Typography variant="subtitle1" color="inherit" align="center">
                    Open Research Framework Foundation | {new Date().getFullYear()}
                </Typography>
                <Typography variant="body2" color="inherit" align="center" sx={{ mt: 0.5 }}>
                    Advancing Open Science & Collaboration
                </Typography>
            </Container>
        </Box>
    );
};

export default Footer;
