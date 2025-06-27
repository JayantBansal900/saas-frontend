import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <Link to="/admin/users" className="block text-blue-600 underline">View Users</Link>
      <Link to="/admin/plans" className="block text-blue-600 underline">View Plans</Link>
    </div>
  );
};

export default AdminDashboard;
