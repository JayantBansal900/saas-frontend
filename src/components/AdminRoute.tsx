import React from 'react';
import { Navigate } from 'react-router-dom';

interface AdminRouteProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ isAuthenticated, isAdmin, children }) => {
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/" replace />;
  return <>{children}</>;
};

export default AdminRoute;
