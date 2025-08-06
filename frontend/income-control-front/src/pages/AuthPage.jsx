import React, { useState } from 'react';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState(null); // you can use this to track logged in user info

  const handleLoginSuccess = (data) => {
    setUser(data);
    alert('Login successful!');
    // You can redirect or update UI here as needed
  };

  const handleSignupSuccess = () => {
    alert('Signup successful! Please log in.');
    setIsLogin(true);
  };

  return (
    <>
      {isLogin ? (
        <LoginPage
          onLoginSuccess={handleLoginSuccess}
          onSwitchToSignup={() => setIsLogin(false)}
        />
      ) : (
        <SignupPage
          onSignupSuccess={handleSignupSuccess}
          onSwitchToLogin={() => setIsLogin(true)}
        />
      )}
    </>
  );
};

export default AuthPage;
