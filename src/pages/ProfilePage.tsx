import { useEffect, useState } from 'react';
import axios from '../lib/axios';
import { logout } from '../utils/logout';

interface Subscription {
  _id: string;
  status: string;
  plan?: { name: string };
}

const ProfilePage = () => {
  const [profile, setProfile] = useState({ name: '', email: '' });
  const [form, setForm] = useState({ name: '', password: '' });
  const [loading, setLoading] = useState(true);
  const [subscription, setSubscription] = useState<Subscription | null>(null);

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
      } catch (err) {
        console.error('Error loading profile/subscription', err);
      } finally {
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
    if (!confirm('Are you sure you want to delete your account?')) return;

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
      if (!subscription) return;
      await axios.patch(`/subscriptions/${subscription._id}/cancel`);
      alert('Subscription cancelled.');
      setSubscription({ ...subscription, status: 'cancelled' });
    } catch (err) {
      console.error('Cancel subscription error', err);
      alert('Failed to cancel subscription.');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>

      <div className="mb-6">
        <h3 className="font-semibold text-lg mb-2">Subscription Status</h3>
        {subscription ? (
          <div>
            <p>
              Plan:{' '}
              <span className="font-medium text-blue-600">
                {subscription.plan?.name || 'Unknown'}
              </span>
            </p>
            <p>
              Status:{' '}
              <span
                className={
                  subscription.status === 'active'
                    ? 'text-green-600'
                    : 'text-red-600'
                }
              >
                {subscription.status}
              </span>
            </p>

            {subscription.status === 'active' && (
              <button
                className="mt-2 px-4 py-2 bg-red-600 text-white rounded"
                onClick={handleCancelSubscription}
              >
                Cancel Subscription
              </button>
            )}
          </div>
        ) : (
          <p className="text-gray-500">No active subscription.</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block font-medium">Email</label>
        <input
          type="text"
          value={profile.email}
          disabled
          className="border p-2 w-full mb-4"
        />

        <label className="block font-medium">Name</label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 w-full mb-4"
        />

        <label className="block font-medium">New Password</label>
        <input
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="border p-2 w-full mb-4"
        />

        <button
          onClick={handleUpdate}
          className="bg-blue-600 text-white px-4 py-2 rounded mr-4"
        >
          Save Changes
        </button>

        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Delete Account
        </button>
      </div>

      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-2 rounded mt-4"
      >
        Logout
      </button>
    </div>
  );
};

export default ProfilePage;
