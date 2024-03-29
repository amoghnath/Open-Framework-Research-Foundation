import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import UploaderRegistrationForm from './components/UploaderRegistration';
import SolverRegistrationForm from './components/SolverRegistration';
import Login from './components/Login';
import Footer from './components/Footer';
import { AuthProvider, useAuth } from './context/AuthContext';

function AuthRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/" /> : children;
}

// Then use <AuthRoute> in your App.js around the protected routes

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Router>
          <NavigationBar />
          <main style={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/login" element={<AuthRoute><Login /></AuthRoute>} />
              <Route path="/register/uploader" element={<AuthRoute><UploaderRegistrationForm /></AuthRoute>} />
              <Route path="/register/solver" element={<AuthRoute><SolverRegistrationForm /></AuthRoute>} />
              {/* Add other routes here */}
            </Routes>
          </main>
          <Footer />
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
