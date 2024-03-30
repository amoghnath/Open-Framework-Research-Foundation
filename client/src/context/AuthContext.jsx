import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

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
                    throw new Error('Token verification failed');
                }
            } catch (error) {
                console.error('Error verifying token:', error);
                setCurrentUser(null);
                setIsAuthenticated(false);
            }
        };

        verifyToken();
    }, []);
    const login = (userData) => {
        setCurrentUser(userData);
        setIsAuthenticated(true);
        // The token is stored in HTTP-only cookies, so no need to manage it here
    };

    const logout = async () => {
        try {
            const response = await fetch('/api/auth/logout', {
                method: 'POST',
                credentials: 'include', // to include the HTTP-only cookies in the request
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
        logout
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};