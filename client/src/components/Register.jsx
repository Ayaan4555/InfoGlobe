// Register.js
import React , { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/auth/register', { name, email, password });
      console.log('Registration successful');
      // Redirect to login page after successful registration
      navigate('/login');
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.response.data.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 bg">
      <form onSubmit={handleSubmit} className="bg-white p-8 shadow-md rounded-md">
        <h2 className="text-2xl mb-6 text-black">Register</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-4 p-2 border w-full input"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 p-2 border w-full input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 p-2 border w-full input"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 w-full">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;



