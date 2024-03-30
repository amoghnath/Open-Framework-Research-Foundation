import React, { createContext, useContext, useState, useEffect } from 'react';
import { CircularProgress, Box } from '@mui/material';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);  // Add a loading state

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const response = await fetch('/api/auth/verifyToken', {
                    method: 'GET',
                    credentials: 'include',
                });
                if (response.ok) {
                    const data = await response.json();
                    setCurrentUser(data.user);
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                setIsAuthenticated(false);
            } finally {
                setLoading(false);  // Set loading to false after the check
            }
        };

        verifyToken();
    }, []);

    const login = async ({ email, password, role }) => {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, role }),
                credentials: 'include',
            });

            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message || 'An error occurred');
            }

            setCurrentUser({ ...result.user, role });  // Include role in user data
            setIsAuthenticated(true);
        } catch (error) {
            throw error;
        }
    };

    const logout = async () => {
        try {
            const response = await fetch('/api/auth/logout', {
                method: 'POST',
                credentials: 'include',
            });
            if (response.ok) {
                setCurrentUser(null);
                setIsAuthenticated(false);
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    const value = {
        currentUser,
        isAuthenticated,
        login,
        logout,
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress color="inherit" />
            </Box>
        );
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
