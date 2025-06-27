import React, { useEffect, useState } from 'react';
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

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/profile"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/subscribe"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <SubscribePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/plans"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <PlansPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <AdminRoute isAuthenticated={isAuthenticated} isAdmin={isAdmin}>
              <AdminDashboard />
            </AdminRoute>
          }
        >
          <Route path="users" element={<AdminUsersPage />} />
          <Route path="plans" element={<AdminPlansPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
