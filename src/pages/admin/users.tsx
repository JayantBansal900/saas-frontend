import React from 'react';
import { useAdminUsers } from '../../hooks/useAdmin'; // ✅ relative import

interface User {
  _id: string;
  fullName: string;
  email: string;
  isAdmin: boolean;
}

const AdminUsersPage = () => {
  const { data: users = [], isLoading, isError } = useAdminUsers();

  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p>Error loading users.</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Users</h2>
      <div className="space-y-4">
        {users.map((user: User) => (
          <div key={user._id} className="border p-4 rounded shadow">
            <p><strong>Name:</strong> {user.fullName}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.isAdmin ? 'Admin' : 'User'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminUsersPage;
