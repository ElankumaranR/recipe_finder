// src/components/Signup.js
import React, { useState } from 'react';
import { auth } from '../firebase/FirebaseConfig'; // Import Firebase auth
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import './components/Auth.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, uid: user.uid }), 
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Error creating user data.');
      }

      const data = await response.json();
      console.log(data.message); 

      navigate('/login'); 
    } catch (err) {
  if (err.code === 'auth/email-already-in-use') {
    setError('This email is already registered.');
  } else if (err.code === 'auth/weak-password') {
    setError('Password should be at least 6 characters.');
  } else {
    setError(err.message || 'Error creating account. Please try again.');
  }
}
  };

  return (
    <div className="Authcontainer">
      <h2>Sign Up</h2>
      {error && <p className="text-danger">{error}</p>}
      <Form onSubmit={handleSignup}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </Form.Group>
        <br />
        <p>Already have an account? <a href='/login'>Login</a></p>
        <Button type="submit">Sign Up</Button>
      </Form>
    </div>
  );
};

export default Signup;
