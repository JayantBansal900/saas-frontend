import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import axios from '../lib/axios';
import { logout } from '../utils/logout';
const ProfilePage = () => {
    const [profile, setProfile] = useState({ name: '', email: '' });
    const [form, setForm] = useState({ name: '', password: '' });
    const [loading, setLoading] = useState(true);
    const [subscription, setSubscription] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [userRes, subRes] = await Promise.all([
                    axios.get('/users/me'),
                    axios.get('/subscriptions'),
                ]);
                setProfile(userRes.data);
                setForm({ name: userRes.data.name, password: '' });
                if (subRes.data.length > 0) {
                    setSubscription(subRes.data[0]);
                }
            }
            catch (err) {
                console.error('Error loading profile/subscription', err);
            }
            finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    useEffect(() => {
        axios
            .get('http://localhost:3000/auth/me', { withCredentials: true })
            .catch(() => {
            window.location.href = '/login';
        });
    }, []);
    const handleUpdate = () => {
        axios
            .put('/users/me', { name: form.name, password: form.password })
            .then((res) => {
            alert('Profile updated');
            setProfile(res.data);
            setForm({ name: res.data.name, password: '' });
        })
            .catch((err) => {
            console.error('Update error', err);
        });
    };
    const handleDelete = () => {
        if (!confirm('Are you sure you want to delete your account?'))
            return;
        axios
            .delete('/users/me')
            .then(() => {
            alert('Account deleted');
            window.location.href = '/login';
        })
            .catch((err) => {
            console.error('Delete error', err);
        });
    };
    const handleCancelSubscription = async () => {
        try {
            if (!subscription)
                return;
            await axios.patch(`/subscriptions/${subscription._id}/cancel`);
            alert('Subscription cancelled.');
            setSubscription({ ...subscription, status: 'cancelled' });
        }
        catch (err) {
            console.error('Cancel subscription error', err);
            alert('Failed to cancel subscription.');
        }
    };
    if (loading)
        return _jsx("p", { children: "Loading..." });
    return (_jsxs("div", { className: "p-6", children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "Profile" }), _jsxs("div", { className: "mb-6", children: [_jsx("h3", { className: "font-semibold text-lg mb-2", children: "Subscription Status" }), subscription ? (_jsxs("div", { children: [_jsxs("p", { children: ["Plan:", ' ', _jsx("span", { className: "font-medium text-blue-600", children: subscription.plan?.name || 'Unknown' })] }), _jsxs("p", { children: ["Status:", ' ', _jsx("span", { className: subscription.status === 'active'
                                            ? 'text-green-600'
                                            : 'text-red-600', children: subscription.status })] }), subscription.status === 'active' && (_jsx("button", { className: "mt-2 px-4 py-2 bg-red-600 text-white rounded", onClick: handleCancelSubscription, children: "Cancel Subscription" }))] })) : (_jsx("p", { className: "text-gray-500", children: "No active subscription." }))] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { className: "block font-medium", children: "Email" }), _jsx("input", { type: "text", value: profile.email, disabled: true, className: "border p-2 w-full mb-4" }), _jsx("label", { className: "block font-medium", children: "Name" }), _jsx("input", { type: "text", value: form.name, onChange: (e) => setForm({ ...form, name: e.target.value }), className: "border p-2 w-full mb-4" }), _jsx("label", { className: "block font-medium", children: "New Password" }), _jsx("input", { type: "password", value: form.password, onChange: (e) => setForm({ ...form, password: e.target.value }), className: "border p-2 w-full mb-4" }), _jsx("button", { onClick: handleUpdate, className: "bg-blue-600 text-white px-4 py-2 rounded mr-4", children: "Save Changes" }), _jsx("button", { onClick: handleDelete, className: "bg-red-600 text-white px-4 py-2 rounded", children: "Delete Account" })] }), _jsx("button", { onClick: logout, className: "bg-red-500 text-white px-4 py-2 rounded mt-4", children: "Logout" })] }));
};
export default ProfilePage;
