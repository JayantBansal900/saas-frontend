import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import axios from '../lib/axios';
const AdminPlansPage = () => {
    const [plans, setPlans] = useState([]);
    const [editingPlanId, setEditingPlanId] = useState(null);
    const [formData, setFormData] = useState({ name: '', price: 0 });
    useEffect(() => {
        axios.get('/auth/me').then(fetchPlans).catch(() => {
            window.location.href = '/login';
        });
    }, []);
    const fetchPlans = async () => {
        try {
            const res = await axios.get('/admin/plans');
            setPlans(res.data);
        }
        catch (err) {
            console.error('Error fetching plans:', err);
        }
    };
    const handleEdit = (plan) => {
        setEditingPlanId(plan._id);
        setFormData({ name: plan.name, price: plan.price });
    };
    const handleUpdate = async (id) => {
        try {
            await axios.patch(`/admin/plans/${id}`, formData);
            setEditingPlanId(null);
            fetchPlans();
        }
        catch (err) {
            console.error('Error updating plan:', err);
        }
    };
    const handleDelete = async (id) => {
        try {
            await axios.delete(`/admin/plans/${id}`);
            fetchPlans();
        }
        catch (err) {
            console.error('Error deleting plan:', err);
        }
    };
    const handleCreate = async () => {
        try {
            await axios.post('/admin/plans', formData);
            setFormData({ name: '', price: 0 });
            fetchPlans();
        }
        catch (err) {
            console.error('Error creating plan:', err);
        }
    };
    return (_jsxs("div", { className: "p-4", children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "All Plans" }), _jsxs("div", { className: "mb-6", children: [_jsx("h3", { className: "text-lg font-semibold mb-2", children: "Create New Plan" }), _jsx("input", { className: "border px-2 py-1 mr-2", placeholder: "Plan Name", value: formData.name, onChange: (e) => setFormData({ ...formData, name: e.target.value }) }), _jsx("input", { className: "border px-2 py-1 mr-2", placeholder: "Price", type: "number", value: formData.price, onChange: (e) => setFormData({ ...formData, price: Number(e.target.value) }) }), _jsx("button", { onClick: handleCreate, className: "bg-green-600 text-white px-3 py-1 rounded", children: "Create" })] }), _jsx("ul", { className: "space-y-4", children: plans.map((plan) => (_jsx("li", { className: "border p-4 rounded shadow", children: editingPlanId === plan._id ? (_jsxs(_Fragment, { children: [_jsx("input", { className: "border px-2 py-1 mr-2", value: formData.name, onChange: (e) => setFormData({ ...formData, name: e.target.value }) }), _jsx("input", { className: "border px-2 py-1 mr-2", type: "number", value: formData.price, onChange: (e) => setFormData({
                                    ...formData,
                                    price: Number(e.target.value),
                                }) }), _jsx("button", { onClick: () => handleUpdate(plan._id), className: "bg-blue-500 text-white px-3 py-1 rounded mr-2", children: "Save" }), _jsx("button", { onClick: () => setEditingPlanId(null), className: "bg-gray-400 text-white px-3 py-1 rounded", children: "Cancel" })] })) : (_jsxs(_Fragment, { children: [_jsxs("p", { className: "mb-1", children: [_jsx("strong", { children: plan.name }), " - \u20B9", plan.price] }), _jsx("button", { onClick: () => handleEdit(plan), className: "bg-yellow-500 text-white px-3 py-1 rounded mr-2", children: "Edit" }), _jsx("button", { onClick: () => handleDelete(plan._id), className: "bg-red-600 text-white px-3 py-1 rounded", children: "Delete" })] })) }, plan._id))) })] }));
};
export default AdminPlansPage;
