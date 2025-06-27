import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../lib/axios';
const Navbar = () => {
    const [user, setUser] = useState(null);
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
        }
        catch (err) {
            console.error('Logout error:', err);
            alert('Logout failed.');
        }
    };
    return (_jsxs("nav", { className: "bg-gray-900 text-white px-6 py-4 flex justify-between items-center", children: [_jsx("div", { children: _jsx(Link, { to: "/", className: "text-xl font-bold", children: "SaaS Dashboard" }) }), _jsxs("div", { className: "space-x-4", children: [_jsx(Link, { to: "/plans", className: "hover:underline", children: "Plans" }), _jsx(Link, { to: "/subscribe", className: "hover:underline", children: "Subscribe" }), _jsx(Link, { to: "/profile", className: "hover:underline", children: "Profile" }), user ? (_jsxs(_Fragment, { children: [_jsxs("span", { className: "text-green-300", children: ["Welcome, ", user.name] }), _jsx("button", { onClick: handleLogout, className: "bg-red-600 px-3 py-1 rounded hover:bg-red-700", children: "Logout" })] })) : (_jsx(Link, { to: "/login", className: "bg-blue-600 px-3 py-1 rounded hover:bg-blue-700", children: "Login" }))] })] }));
};
export default Navbar;
