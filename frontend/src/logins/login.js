import React, { useState } from 'react';
import { auth } from '../firebase/FirebaseConfig';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import './components/Auth.css';

const Login = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [resetEmail, setResetEmail] = useState(''); // State for reset email
  const [resetMessage, setResetMessage] = useState(''); // State for reset message
  const [showResetForm, setShowResetForm] = useState(false); // State to toggle reset form visibility
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, identifier, password);
      const user = userCredential.user;

      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identifier: user.email,
        }),
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
    setResetMessage(''); // Clear previous messages

    try {
      await sendPasswordResetEmail(auth, resetEmail);
      setResetMessage('Password reset email sent! Please check your inbox.');
      setResetEmail(''); // Clear the email input after sending
    } catch (error) {
      setResetMessage('Error sending password reset email. Please try again.');
    }
  };

  return (
    <div className="Authcontainer">
      <h2>Login</h2>
      {error && <p className="text-danger">{error}</p>}
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <br />
        <p>Create a new account? <a href='/signup'>Signup</a></p>
        <Button type="submit">Login</Button>
      </Form>

      {/* Forgot Password Link */}
      <div className="mt-3">
        <p onClick={() => setShowResetForm(!showResetForm)} style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}>
          Forgot your password?
        </p>
      </div>

      {/* Forgot Password Section */}
      {showResetForm && (
        <div className="mt-3">
          <p>Enter your email to reset your password</p>
          <Form onSubmit={handlePasswordReset}>
            <Form.Group>
              <Form.Control
                type="email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </Form.Group>
            <Button type="submit" className="mt-2">Reset Password</Button>
          </Form>
          {resetMessage && <p className="text-success">{resetMessage}</p>}
        </div>
      )}
    </div>
  );
};

export default Login;
