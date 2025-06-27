import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// frontend/src/pages/AdminDashboard.tsx
import { useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { logout } from '../utils/logout';
import axios from '../lib/axios'; // ✅ Use your custom axios
const AdminDashboard = () => {
    useEffect(() => {
        axios
            .get('/auth/me')
            .then(() => { })
            .catch(() => {
            window.location.href = '/login';
        });
    }, []);
    return (_jsxs("div", { className: "p-4", children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "Admin Dashboard" }), _jsxs("nav", { className: "mb-4 space-x-4", children: [_jsx(NavLink, { to: "/admin/users", className: "text-blue-600", children: "Users" }), _jsx(NavLink, { to: "/admin/plans", className: "text-blue-600", children: "Plans" })] }), _jsx(Outlet, {}), _jsx("button", { onClick: logout, className: "bg-red-500 text-white px-4 py-2 rounded mt-4", children: "Logout" })] }));
};
export default AdminDashboard;
