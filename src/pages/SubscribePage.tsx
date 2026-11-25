import { useEffect, useState } from 'react';
import { useFetchPlans } from '../hooks/usePlans';
import axios from 'axios';

interface Plan {
  _id: string;
  name: string;
  price: number;
}

interface Subscription {
  _id: string;
  /** Plan id, or the full plan when the API populates it */
  planId: string | { _id: string; name: string };
  status: string;
}

const SubscribePage = () => {
  const { data: plans = [], isLoading, isError, error } = useFetchPlans();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loadingSub, setLoadingSub] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost:3000/subscriptions', { withCredentials: true })
      .then((res) => {
        const active = (res.data as Subscription[]).find((sub) => sub.status === 'active');
        setSubscription(active || null);
      })
      .catch((err) => console.error('Error fetching subscription:', err))
      .finally(() => setLoadingSub(false));
  }, []);

  const handleSubscribe = async (planId: string) => {
    try {
      await axios.post(
        'http://localhost:3000/subscriptions',
        { planId },
        { withCredentials: true }
      );
      alert('Subscription successful!');
      window.location.reload();
    } catch (error) {
      console.error('Subscription failed:', error);
      alert('Subscription failed. Check console for details.');
    }
  };

  const handleCancel = async () => {
    if (!subscription) return;
    try {
      await axios.patch(
        `http://localhost:3000/subscriptions/${subscription._id}/cancel`,
        {},
        { withCredentials: true }
      );
      alert('Subscription cancelled!');
      window.location.reload();
    } catch (error) {
      console.error('Cancel failed:', error);
      alert('Cancel failed.');
    }
  };

  if (isLoading || loadingSub) return <p>Loading plans...</p>;
  if (isError) return <p>Failed to load plans. Error: {error instanceof Error ? error.message : String(error)}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Choose a Plan</h2>

      {subscription && (
        <div className="bg-green-100 text-green-800 p-4 rounded mb-6">
          ✅ Subscribed to: <strong>
            {typeof subscription.planId === 'object' ? subscription.planId.name : subscription.planId}
          </strong>
          <br />
          Status: <strong>{subscription.status}</strong>
          <br />
          <button
            onClick={handleCancel}
            className="mt-2 bg-red-600 text-white px-4 py-2 rounded"
          >
            Cancel Subscription
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map((plan: Plan) => (
          <div key={plan._id} className="border p-4 rounded shadow">
            <h3 className="text-lg font-semibold">{plan.name}</h3>
            <p className="text-gray-700 mb-2">₹{plan.price}</p>
            {subscription && subscription.status === 'active' ? (
              <button
                disabled
                className="bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed"
              >
                Already Subscribed
              </button>
            ) : (
              <button
                onClick={() => handleSubscribe(plan._id)}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Subscribe
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscribePage;
