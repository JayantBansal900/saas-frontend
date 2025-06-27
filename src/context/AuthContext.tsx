import React, { createContext, useContext, useEffect, useState } from 'react';
import API from '../lib/axios';

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  loading: true,
  checkAuth: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const res = await API.get('/auth/profile'); // protected route
      if (res.status === 200) {
        setIsAuthenticated(true);
      }
    } catch {
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
