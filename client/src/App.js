import React from "react";
import "./App.css";
import { Navbar } from "./Components/Navbar";
import { Home } from "./Components/Home";
import UploaderSignUp from "./Components/SignUp/UploaderSignUp";
import SolverSignUp from "./Components/SignUp/SolverSignUp";
import Login from "./Components/LogIn/Login";
import CreateProblem from "./Components/CreateProblem/CreateProblem";
import { AuthProvider } from "./Components/Context/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
    return (
        <Router>
            {" "}
            <div>
                <AuthProvider>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route
                            path="/signup-uploader"
                            element={<UploaderSignUp />}
                        />
                        <Route
                            path="/signup-solver"
                            element={<SolverSignUp />}
                        />
                        <Route
                            path="/create-problem"
                            element={<CreateProblem />}
                        />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </AuthProvider>
            </div>
        </Router>
    );
}

export default App;
