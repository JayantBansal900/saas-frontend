import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// frontend/src/pages/LoginPage.tsx
import { useState } from 'react';
import axios from 'axios';
const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = async () => {
        try {
            await axios.post('http://localhost:3000/auth/login', { email, password }, { withCredentials: true });
            alert('Login successful!');
            window.location.href = '/profile';
        }
        catch (err) {
            console.error('Login error', err);
            alert('Login failed');
        }
    };
    return (_jsxs("div", { className: "p-6", children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "Login" }), _jsx("input", { type: "email", placeholder: "Email", value: email, onChange: (e) => setEmail(e.target.value), className: "border p-2 w-full mb-4" }), _jsx("input", { type: "password", placeholder: "Password", value: password, onChange: (e) => setPassword(e.target.value), className: "border p-2 w-full mb-4" }), _jsx("button", { onClick: handleLogin, className: "bg-blue-600 text-white px-4 py-2 rounded", children: "Login" })] }));
};
export default LoginPage;
