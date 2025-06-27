import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useFetchPlans } from '../hooks/usePlans';
import axios from 'axios';
const SubscribePage = () => {
    const { data: plans = [], isLoading, isError, error } = useFetchPlans();
    const [subscription, setSubscription] = useState(null);
    const [loadingSub, setLoadingSub] = useState(true);
    useEffect(() => {
        axios
            .get('http://localhost:3000/subscriptions', { withCredentials: true })
            .then((res) => {
            const active = res.data.find((sub) => sub.status === 'active');
            setSubscription(active || null);
        })
            .catch((err) => console.error('Error fetching subscription:', err))
            .finally(() => setLoadingSub(false));
    }, []);
    const handleSubscribe = async (planId) => {
        try {
            await axios.post('http://localhost:3000/subscriptions', { planId }, { withCredentials: true });
            alert('Subscription successful!');
            window.location.reload();
        }
        catch (error) {
            console.error('Subscription failed:', error);
            alert('Subscription failed. Check console for details.');
        }
    };
    const handleCancel = async () => {
        if (!subscription)
            return;
        try {
            await axios.patch(`http://localhost:3000/subscriptions/${subscription._id}/cancel`, {}, { withCredentials: true });
            alert('Subscription cancelled!');
            window.location.reload();
        }
        catch (error) {
            console.error('Cancel failed:', error);
            alert('Cancel failed.');
        }
    };
    if (isLoading || loadingSub)
        return _jsx("p", { children: "Loading plans..." });
    if (isError)
        return _jsxs("p", { children: ["Failed to load plans. Error: ", error?.message] });
    return (_jsxs("div", { className: "p-6", children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "Choose a Plan" }), subscription && (_jsxs("div", { className: "bg-green-100 text-green-800 p-4 rounded mb-6", children: ["\u2705 Subscribed to: ", _jsx("strong", { children: subscription.planId?.name || subscription.planId }), _jsx("br", {}), "Status: ", _jsx("strong", { children: subscription.status }), _jsx("br", {}), _jsx("button", { onClick: handleCancel, className: "mt-2 bg-red-600 text-white px-4 py-2 rounded", children: "Cancel Subscription" })] })), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: plans.map((plan) => (_jsxs("div", { className: "border p-4 rounded shadow", children: [_jsx("h3", { className: "text-lg font-semibold", children: plan.name }), _jsxs("p", { className: "text-gray-700 mb-2", children: ["\u20B9", plan.price] }), subscription && subscription.status === 'active' ? (_jsx("button", { disabled: true, className: "bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed", children: "Already Subscribed" })) : (_jsx("button", { onClick: () => handleSubscribe(plan._id), className: "bg-blue-600 text-white px-4 py-2 rounded", children: "Subscribe" }))] }, plan._id))) })] }));
};
export default SubscribePage;
