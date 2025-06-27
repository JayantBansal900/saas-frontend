import { useEffect, useState } from 'react';
import axios from '../lib/axios';

interface User {
  _id: string;
  fullName: string;
  email: string;
  isAdmin: boolean;
}

const AdminUsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ fullName: '', isAdmin: false });

  useEffect(() => {
    axios.get('/auth/me').then(fetchUsers).catch(() => {
      window.location.href = '/login';
    });
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('/admin/users');
      setUsers(res.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  const handleEdit = (user: User) => {
    setEditingUserId(user._id);
    setFormData({ fullName: user.fullName, isAdmin: user.isAdmin });
  };

  const handleUpdate = async (id: string) => {
    try {
      await axios.patch(`/admin/users/${id}`, formData);
      setEditingUserId(null);
      fetchUsers();
    } catch (err) {
      console.error('Error updating user:', err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/admin/users/${id}`);
      fetchUsers();
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">All Users</h2>
      <ul className="space-y-4">
        {users.map((user) => (
          <li key={user._id} className="border p-4 rounded shadow">
            {editingUserId === user._id ? (
              <>
                <input
                  className="border px-2 py-1 mr-2"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
                <label className="mr-2">
                  <input
                    type="checkbox"
                    checked={formData.isAdmin}
                    onChange={(e) =>
                      setFormData({ ...formData, isAdmin: e.target.checked })
                    }
                  />{' '}
                  Admin
                </label>
                <button
                  onClick={() => handleUpdate(user._id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingUserId(null)}
                  className="bg-gray-400 text-white px-3 py-1 rounded"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <p className="mb-1">
                  <strong>{user.fullName}</strong> - {user.email}
                </p>
                <p className="mb-2 text-sm text-gray-600">
                  Role: {user.isAdmin ? 'Admin' : 'User'}
                </p>
                <button
                  onClick={() => handleEdit(user)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminUsersPage;
