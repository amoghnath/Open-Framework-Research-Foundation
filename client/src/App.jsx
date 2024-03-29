import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import UploaderRegistrationForm from './components/UploaderRegistration';
import SolverRegistrationForm from './components/SolverRegistration';
import Footer from './components/Footer';

function Home() {
  return <h2>Home Page</h2>;
}

function App() {
  return (
    <div className="App">
      <Router>
        <NavigationBar />
        <main style={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register/uploader" element={<UploaderRegistrationForm />} />
            <Route path="/register/solver" element={<SolverRegistrationForm />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
