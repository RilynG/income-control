import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Budget from './pages/Budget';
import Advisor from './pages/Advisor';
import Account from './pages/Account';
import AuthPage from './pages/AuthPage'; // Import AuthPage instead of LoginPage

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/budget" element={<Budget />} />
        <Route path="/advisor" element={<Advisor />} />
        <Route path="/loginpage" element={<AuthPage />} />  {/* Use AuthPage here */}
      </Routes>
    </Router>
  );
}

export default App;
