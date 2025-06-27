import { jsx as _jsx } from "react/jsx-runtime";
// frontend/src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(_jsx(StrictMode, { children: _jsx(QueryClientProvider, { client: queryClient, children: _jsx(AuthProvider, { children: _jsx(App, {}) }) }) }));
