// frontend/src/pages/AdminDashboard.tsx
import React, { useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { logout } from '../utils/logout';
import axios from '../lib/axios'; // ✅ Use your custom axios

const AdminDashboard = () => {
  useEffect(() => {
    axios
      .get('/auth/me')
      .then(() => {})
      .catch(() => {
        window.location.href = '/login';
      });
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <nav className="mb-4 space-x-4">
        <NavLink to="/admin/users" className="text-blue-600">Users</NavLink>
        <NavLink to="/admin/plans" className="text-blue-600">Plans</NavLink>
      </nav>

      <Outlet />

      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-2 rounded mt-4"
      >
        Logout
      </button>
    </div>
  );
};

export default AdminDashboard;
