import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useFetchPlans, useCreatePlan, useDeletePlan, useUpdatePlan, } from '../hooks/usePlans';
const PlansPage = () => {
    const { data: plans = [], isLoading } = useFetchPlans();
    const createPlan = useCreatePlan();
    const deletePlan = useDeletePlan();
    const updatePlan = useUpdatePlan();
    const [form, setForm] = useState({ name: '', price: '' });
    if (isLoading)
        return _jsx("p", { children: "Loading..." });
    return (_jsxs("div", { className: "p-6", children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "Plans" }), _jsxs("div", { className: "mb-4", children: [_jsx("input", { type: "text", placeholder: "Plan Name", value: form.name, onChange: (e) => setForm({ ...form, name: e.target.value }), className: "border p-2 mr-2" }), _jsx("input", { type: "number", placeholder: "Price", value: form.price, onChange: (e) => setForm({ ...form, price: e.target.value }), className: "border p-2 mr-2" }), _jsx("button", { onClick: () => createPlan.mutate(form), className: "bg-blue-500 text-white px-4 py-2", children: "Add Plan" })] }), _jsx("ul", { children: plans.map((plan) => (_jsxs("li", { className: "mb-2 flex justify-between items-center", children: [_jsxs("span", { children: [plan.name, " - \u20B9", plan.price] }), _jsxs("div", { children: [_jsx("button", { onClick: () => updatePlan.mutate({
                                        id: plan._id,
                                        data: { name: 'Updated Plan' },
                                    }), className: "text-yellow-500 mr-2", children: "Edit" }), _jsx("button", { onClick: () => deletePlan.mutate(plan._id), className: "text-red-500", children: "Delete" })] })] }, plan._id))) })] }));
};
export default PlansPage;
