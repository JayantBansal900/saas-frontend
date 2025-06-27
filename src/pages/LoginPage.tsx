// frontend/src/pages/LoginPage.tsx

import React, { useState } from 'react';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await axios.post(
        'http://localhost:3000/auth/login',
        { email, password },
        { withCredentials: true }
      );
      alert('Login successful!');
      window.location.href = '/profile';
    } catch (err) {
      console.error('Login error', err);
      alert('Login failed');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 w-full mb-4"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 w-full mb-4"
      />
      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Login
      </button>
    </div>
  );
};

export default LoginPage;
