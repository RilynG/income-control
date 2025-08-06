import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Account = () => {
  const navigate = useNavigate();

  const storedUserRaw = localStorage.getItem('user');
  let user = null;

  if (storedUserRaw) {
    try {
      user = JSON.parse(storedUserRaw);
    } catch (err) {
      console.error('Failed to parse user:', err);
    }
  }

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (!user) return null;  // Wait until redirect

  return (
    <div>

      <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded mt-10">
        <h2 className="text-2xl font-bold mb-4">Account Information</h2>
        <p className="text-lg"><strong>Email:</strong> {user.email}</p>
        <p className="text-lg"><strong>User ID:</strong> {user._id}</p>

        <button
          onClick={handleLogout}
          className="mt-6 w-full bg-red-800 text-white font-bold py-2 rounded-md hover:bg-red-900 transition"
        >
          Log Out
        </button>
      </div>

    </div>
  );
};

export default Account;
