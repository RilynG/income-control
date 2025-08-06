import React, { useState } from 'react';

const SignupPage = ({ onSignupSuccess, onSwitchToLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMsg('Signup successful! You can now log in.');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      } else {
        setError(data.message || 'Signup failed');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-md w-full bg-black rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-red-800 mb-6 text-center">
          Income Control Signup
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <p className="text-red-600 text-center font-semibold">{error}</p>}
          {successMsg && <p className="text-green-600 text-center font-semibold">{successMsg}</p>}
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
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-semibold text-white mb-1">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-red-800 focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="Confirm your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-800 text-white font-bold py-2 rounded-md hover:bg-red-900 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-white mt-6">
          Already have an account?{' '}
          <button
            type="button"
            className="text-red-600 font-semibold hover:underline focus:outline-none"
            onClick={onSwitchToLogin}
          >
            Log in
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
