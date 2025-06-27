import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
const AdminDashboard = () => {
    return (_jsxs("div", { className: "p-6 space-y-4", children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "Admin Dashboard" }), _jsx(Link, { to: "/admin/users", className: "block text-blue-600 underline", children: "View Users" }), _jsx(Link, { to: "/admin/plans", className: "block text-blue-600 underline", children: "View Plans" })] }));
};
export default AdminDashboard;
