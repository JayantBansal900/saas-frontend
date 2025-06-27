import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useAdminPlans } from '../../hooks/useAdmin'; // ✅ relative import
const AdminPlansPage = () => {
    const { data: plans = [], isLoading, isError } = useAdminPlans();
    if (isLoading)
        return _jsx("p", { children: "Loading plans..." });
    if (isError)
        return _jsx("p", { children: "Error loading plans." });
    return (_jsxs("div", { className: "p-6", children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "All Plans" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: plans.map((plan) => (_jsxs("div", { className: "border p-4 rounded shadow", children: [_jsxs("p", { children: [_jsx("strong", { children: "Name:" }), " ", plan.name] }), _jsxs("p", { children: [_jsx("strong", { children: "Price:" }), " \u20B9", plan.price] })] }, plan._id))) })] }));
};
export default AdminPlansPage;
