import React, { useState } from 'react';
import { auth } from '../firebase/FirebaseConfig';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [resetMessage, setResetMessage] = useState('');
  const [showResetForm, setShowResetForm] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, identifier, password);
      const user = userCredential.user;

      const response = await fetch(`${import.meta.env.VITE_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: user.email }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('user', JSON.stringify({
          uid: user.uid,
          email: user.email,
          username: user.username,
        }));
        navigate('/search');
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setResetMessage('');
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      setResetMessage('Password reset email sent! Please check your inbox.');
      setResetEmail('');
    } catch (error) {
      setResetMessage('Error sending password reset email. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      {error && <p className="text-red-600 mb-4 text-sm text-center">{error}</p>}
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="text-sm text-center">
          Don’t have an account? <a href="/signup" className="text-blue-600 hover:underline">Signup</a>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
        >
          Login
        </button>
      </form>

      <div className="mt-4 text-sm text-center">
        <button
          onClick={() => setShowResetForm(!showResetForm)}
          className="text-blue-600 hover:underline focus:outline-none"
        >
          Forgot your password?
        </button>
      </div>

      {showResetForm && (
        <div className="mt-4">
          <p className="text-sm text-gray-700">Enter your email to reset your password</p>
          <form onSubmit={handlePasswordReset} className="space-y-2 mt-2">
            <input
              type="email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="w-full py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition duration-200"
            >
              Reset Password
            </button>
          </form>
          {resetMessage && (
            <p className="text-green-600 text-sm mt-2">{resetMessage}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Login;
