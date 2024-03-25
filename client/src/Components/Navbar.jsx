import React, { useState } from "react";
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    Button,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import BackupIcon from "@mui/icons-material/Backup"; // Icon for "Upload Problem"
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./Context/AuthContext"; // Adjust the path as necessary
import axios from "axios";
export function Navbar() {
    const navigate = useNavigate();
    const { isAuthenticated, userRole, logout, setIsAuthenticated } = useAuth();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleLogout = async () => {
        try {
            await axios.get("http://localhost:3000/api/auth/logout", {
                withCredentials: true,
            });
            logout(); // Call the logout function from context to update auth state
            navigate("/login", { replace: true }); // Redirect to login page
        } catch (error) {
            console.error("Logout failed:", error);
            // Handle logout failure, e.g., showing an error message
        }
    };

    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const handleTitleClick = () => {
        navigate("/"); // Navigate to the root path when the title is clicked
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, cursor: "pointer" }} // Add cursor pointer for better UX
                        onClick={handleTitleClick} // Add click handler to navigate to root
                    >
                        Open Research Foundation Framework Development
                    </Typography>
                    {isAuthenticated && userRole === "uploader" && (
                        <Button
                            color="inherit" // You might want to remove this to allow custom colors to take effect
                            startIcon={<BackupIcon />}
                            onClick={() => navigate("/create-problem")}
                            sx={{
                                mx: 1,
                                backgroundColor: "#4CAF50", // Example: A shade of green
                                color: "white",
                                "&:hover": {
                                    backgroundColor: "#388E3C", // Darker shade of green on hover
                                },
                                "&:disabled": {
                                    backgroundColor: "#A5D6A7", // Lighter shade when the button is disabled
                                    color: "#fff",
                                },
                            }}
                        >
                            Upload Problem
                        </Button>
                    )}
                    {!isAuthenticated ? (
                        <>
                            <Button
                                color="inherit"
                                variant="contained"
                                startIcon={<HowToRegIcon />}
                                sx={{
                                    mx: 1,
                                    backgroundColor: "white",
                                    color: "black",
                                    "&:hover": { backgroundColor: "#eee" },
                                }}
                                onClick={handleClick}
                            >
                                Sign Up
                            </Button>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem
                                    onClick={() => {
                                        navigate("/signup-uploader");
                                        handleClose();
                                    }}
                                >
                                    <ListItemIcon>
                                        <CloudUploadIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>
                                        Sign Up as a Problem Uploader
                                    </ListItemText>
                                </MenuItem>
                                <MenuItem
                                    onClick={() => {
                                        navigate("/signup-solver");
                                        handleClose();
                                    }}
                                >
                                    <ListItemIcon>
                                        <EmojiObjectsIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>
                                        Sign Up as a Problem Solver
                                    </ListItemText>
                                </MenuItem>
                            </Menu>
                            <Button
                                color="inherit"
                                variant="contained"
                                startIcon={<AccountCircleIcon />}
                                sx={{
                                    backgroundColor: "white",
                                    color: "black",
                                    "&:hover": { backgroundColor: "#eee" },
                                }}
                                onClick={() => navigate("/login")}
                            >
                                Log In
                            </Button>
                        </>
                    ) : (
                        <Button
                            color="inherit"
                            variant="contained"
                            startIcon={<LogoutIcon />}
                            sx={{
                                backgroundColor: "white",
                                color: "black",
                                "&:hover": { backgroundColor: "#eee" },
                            }}
                            onClick={handleLogout}
                        >
                            Log Out
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}
