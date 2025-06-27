import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useAdminUsers } from '../../hooks/useAdmin'; // ✅ relative import
const AdminUsersPage = () => {
    const { data: users = [], isLoading, isError } = useAdminUsers();
    if (isLoading)
        return _jsx("p", { children: "Loading users..." });
    if (isError)
        return _jsx("p", { children: "Error loading users." });
    return (_jsxs("div", { className: "p-6", children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "All Users" }), _jsx("div", { className: "space-y-4", children: users.map((user) => (_jsxs("div", { className: "border p-4 rounded shadow", children: [_jsxs("p", { children: [_jsx("strong", { children: "Name:" }), " ", user.fullName] }), _jsxs("p", { children: [_jsx("strong", { children: "Email:" }), " ", user.email] }), _jsxs("p", { children: [_jsx("strong", { children: "Role:" }), " ", user.isAdmin ? 'Admin' : 'User'] })] }, user._id))) })] }));
};
export default AdminUsersPage;
