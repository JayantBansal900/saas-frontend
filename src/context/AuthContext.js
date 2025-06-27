import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useState } from 'react';
import API from '../lib/axios';
const AuthContext = createContext({
    isAuthenticated: false,
    loading: true,
    checkAuth: async () => { },
});
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const checkAuth = async () => {
        try {
            const res = await API.get('/auth/profile'); // protected route
            if (res.status === 200) {
                setIsAuthenticated(true);
            }
        }
        catch {
            setIsAuthenticated(false);
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        checkAuth();
    }, []);
    return (_jsx(AuthContext.Provider, { value: { isAuthenticated, loading, checkAuth }, children: children }));
};
export const useAuth = () => useContext(AuthContext);
