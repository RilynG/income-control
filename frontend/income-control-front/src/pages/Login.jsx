import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ onSwitchToSignup }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Logged in user:', data.user);  // Debugging log
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));  // Save user object
        navigate('/budget');  // Redirect to Budget page after login
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Network error, please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-md w-full bg-black rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-red-800 mb-6 text-center">
          Income Control Login
        </h2>

        {error && (
          <div className="mb-4 text-center text-red-600 font-semibold">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-white mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-red-800 focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-white mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-red-800 focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-800 text-white font-bold py-2 rounded-md hover:bg-red-900 transition"
          >
            Log In
          </button>
        </form>

        <p className="text-center text-white mt-6">
          Don't have an account?{' '}
          <button
            type="button"
            className="text-red-600 font-semibold hover:underline focus:outline-none"
            onClick={onSwitchToSignup}
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
