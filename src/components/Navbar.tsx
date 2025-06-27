import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../lib/axios';

const Navbar = () => {
  const [user, setUser] = useState<{ name?: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('/auth/me')
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('/auth/logout');
      alert('Logged out successfully');
      navigate('/login');
    } catch (err) {
      console.error('Logout error:', err);
      alert('Logout failed.');
    }
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
      <div>
        <Link to="/" className="text-xl font-bold">SaaS Dashboard</Link>
      </div>
      <div className="space-x-4">
        <Link to="/plans" className="hover:underline">Plans</Link>
        <Link to="/subscribe" className="hover:underline">Subscribe</Link>
        <Link to="/profile" className="hover:underline">Profile</Link>

        {user ? (
          <>
            <span className="text-green-300">Welcome, {user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
