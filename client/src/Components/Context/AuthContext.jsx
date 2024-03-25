import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Combine isAuthenticated and userRole into a single state object
    const [authState, setAuthState] = useState({
        isAuthenticated: false,
        userRole: null,
    });

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:3000/api/auth/verify",
                    { withCredentials: true }
                );
                if (response.status === 200) {
                    // Update both isAuthenticated and userRole simultaneously
                    setAuthState({
                        isAuthenticated: true,
                        userRole: response.data.role,
                    });
                }
            } catch (error) {
                setAuthState({ isAuthenticated: false, userRole: null });
            }
        };

        verifyToken();
    }, []);

    const login = async (email, password, role) => {
        try {
            const response = await axios.post(
                "http://localhost:3000/api/auth/login",
                { email, password, role },
                { withCredentials: true }
            );

            if (response.status === 200) {
                // On successful login, update both isAuthenticated and userRole
                setAuthState({
                    isAuthenticated: true,
                    userRole: role, // Assuming the role is determined at login
                });
            } else {
                // Handle unsuccessful login attempt
                throw new Error("Login failed");
            }
        } catch (error) {
            console.error("Login failed:", error);
            setAuthState({ isAuthenticated: false, userRole: null });
            throw error; // Rethrow to handle in component
        }
    };

    // Logout function to clear authentication state
    const logout = () => {
        setAuthState({ isAuthenticated: false, userRole: null });

    };

    return (
        <AuthContext.Provider value={{ ...authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
