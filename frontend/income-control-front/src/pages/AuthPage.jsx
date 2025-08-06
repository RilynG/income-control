import React, { useState } from 'react';
import LoginPage from './Login';
import SignupPage from './SignupPage';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleLoginSuccess = (user) => {
    alert('Login successful!');
    console.log('Logged in user:', user);
    // optional: redirect here instead of inside LoginPage
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
