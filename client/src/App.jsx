import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import UploaderRegistrationForm from './components/UploaderRegistration';
import Footer from './components/Footer'; // Ensure this path is correct

function Home() {
  return <h2>Home Page</h2>;
}

function About() {
  return <h2>About Page</h2>;
}

function App() {
  return (
    <div className="App">
      <Router>
        <NavigationBar />
        <div style={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/register/uploader" element={<UploaderRegistrationForm />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>

  );
}

export default App;
