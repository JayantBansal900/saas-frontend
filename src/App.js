import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import PlansPage from './pages/PlansPage';
import SubscribePage from './pages/SubscribePage';
import AdminDashboard from './pages/AdminDashboard';
import AdminUsersPage from './pages/AdminUsersPage';
import AdminPlansPage from './pages/AdminPlansPage';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import axios from './lib/axios';
function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
        axios
            .get('/auth/me')
            .then((res) => {
            setIsAuthenticated(true);
            setIsAdmin(res.data.isAdmin);
        })
            .catch(() => {
            setIsAuthenticated(false);
            setIsAdmin(false);
        });
    }, []);
    return (_jsxs(Router, { children: [_jsx(Navbar, {}), _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(HomePage, {}) }), _jsx(Route, { path: "/login", element: _jsx(LoginPage, {}) }), _jsx(Route, { path: "/profile", element: _jsx(ProtectedRoute, { isAuthenticated: isAuthenticated, children: _jsx(ProfilePage, {}) }) }), _jsx(Route, { path: "/subscribe", element: _jsx(ProtectedRoute, { isAuthenticated: isAuthenticated, children: _jsx(SubscribePage, {}) }) }), _jsx(Route, { path: "/plans", element: _jsx(ProtectedRoute, { isAuthenticated: isAuthenticated, children: _jsx(PlansPage, {}) }) }), _jsxs(Route, { path: "/admin", element: _jsx(AdminRoute, { isAuthenticated: isAuthenticated, isAdmin: isAdmin, children: _jsx(AdminDashboard, {}) }), children: [_jsx(Route, { path: "users", element: _jsx(AdminUsersPage, {}) }), _jsx(Route, { path: "plans", element: _jsx(AdminPlansPage, {}) })] })] })] }));
}
export default App;
