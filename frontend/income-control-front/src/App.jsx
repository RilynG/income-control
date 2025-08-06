import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Budget from './pages/Budget';
import Advisor from './pages/Advisor';
import Account from './pages/Account';
import AuthPage from './pages/AuthPage';  // Handles Login & Signup switching
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/budget" element={<Budget />} />
        <Route path="/advisor" element={<Advisor />} />
        <Route path="/account" element={<Account />} />
        <Route path="/login" element={<AuthPage />} />  {/* Use /login here */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

