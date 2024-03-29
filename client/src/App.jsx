import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import UploaderRegistrationForm from './components/UploaderRegistration';
import SolverRegistrationForm from './components/SolverRegistration';
import Login from './components/Login';
import Footer from './components/Footer';
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider

function Home() {
  return <h2>Home Page</h2>;
}

function App() {
  return (
    <AuthProvider> {/* Wrap the Router and other components with AuthProvider */}
      <div className="App">
        <Router>
          <NavigationBar />
          <main style={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register/uploader" element={<UploaderRegistrationForm />} />
              <Route path="/register/solver" element={<SolverRegistrationForm />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </main>
          <Footer />
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
