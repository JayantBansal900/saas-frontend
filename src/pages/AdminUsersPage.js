import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import axios from '../lib/axios';
const AdminUsersPage = () => {
    const [users, setUsers] = useState([]);
    const [editingUserId, setEditingUserId] = useState(null);
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
        }
        catch (err) {
            console.error('Error fetching users:', err);
        }
    };
    const handleEdit = (user) => {
        setEditingUserId(user._id);
        setFormData({ fullName: user.fullName, isAdmin: user.isAdmin });
    };
    const handleUpdate = async (id) => {
        try {
            await axios.patch(`/admin/users/${id}`, formData);
            setEditingUserId(null);
            fetchUsers();
        }
        catch (err) {
            console.error('Error updating user:', err);
        }
    };
    const handleDelete = async (id) => {
        try {
            await axios.delete(`/admin/users/${id}`);
            fetchUsers();
        }
        catch (err) {
            console.error('Error deleting user:', err);
        }
    };
    return (_jsxs("div", { className: "p-4", children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "All Users" }), _jsx("ul", { className: "space-y-4", children: users.map((user) => (_jsx("li", { className: "border p-4 rounded shadow", children: editingUserId === user._id ? (_jsxs(_Fragment, { children: [_jsx("input", { className: "border px-2 py-1 mr-2", value: formData.fullName, onChange: (e) => setFormData({ ...formData, fullName: e.target.value }) }), _jsxs("label", { className: "mr-2", children: [_jsx("input", { type: "checkbox", checked: formData.isAdmin, onChange: (e) => setFormData({ ...formData, isAdmin: e.target.checked }) }), ' ', "Admin"] }), _jsx("button", { onClick: () => handleUpdate(user._id), className: "bg-blue-500 text-white px-3 py-1 rounded mr-2", children: "Save" }), _jsx("button", { onClick: () => setEditingUserId(null), className: "bg-gray-400 text-white px-3 py-1 rounded", children: "Cancel" })] })) : (_jsxs(_Fragment, { children: [_jsxs("p", { className: "mb-1", children: [_jsx("strong", { children: user.fullName }), " - ", user.email] }), _jsxs("p", { className: "mb-2 text-sm text-gray-600", children: ["Role: ", user.isAdmin ? 'Admin' : 'User'] }), _jsx("button", { onClick: () => handleEdit(user), className: "bg-yellow-500 text-white px-3 py-1 rounded mr-2", children: "Edit" }), _jsx("button", { onClick: () => handleDelete(user._id), className: "bg-red-600 text-white px-3 py-1 rounded", children: "Delete" })] })) }, user._id))) })] }));
};
export default AdminUsersPage;
