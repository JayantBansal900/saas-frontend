import { useEffect, useState } from 'react';
import axios from '../lib/axios';

interface Plan {
  _id: string;
  name: string;
  price: number;
}

const AdminPlansPage = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [editingPlanId, setEditingPlanId] = useState<string | null>(null);
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
    } catch (err) {
      console.error('Error fetching plans:', err);
    }
  };

  const handleEdit = (plan: Plan) => {
    setEditingPlanId(plan._id);
    setFormData({ name: plan.name, price: plan.price });
  };

  const handleUpdate = async (id: string) => {
    try {
      await axios.patch(`/admin/plans/${id}`, formData);
      setEditingPlanId(null);
      fetchPlans();
    } catch (err) {
      console.error('Error updating plan:', err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/admin/plans/${id}`);
      fetchPlans();
    } catch (err) {
      console.error('Error deleting plan:', err);
    }
  };

  const handleCreate = async () => {
    try {
      await axios.post('/admin/plans', formData);
      setFormData({ name: '', price: 0 });
      fetchPlans();
    } catch (err) {
      console.error('Error creating plan:', err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">All Plans</h2>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Create New Plan</h3>
        <input
          className="border px-2 py-1 mr-2"
          placeholder="Plan Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          className="border px-2 py-1 mr-2"
          placeholder="Price"
          type="number"
          value={formData.price}
          onChange={(e) =>
            setFormData({ ...formData, price: Number(e.target.value) })
          }
        />
        <button
          onClick={handleCreate}
          className="bg-green-600 text-white px-3 py-1 rounded"
        >
          Create
        </button>
      </div>

      <ul className="space-y-4">
        {plans.map((plan) => (
          <li key={plan._id} className="border p-4 rounded shadow">
            {editingPlanId === plan._id ? (
              <>
                <input
                  className="border px-2 py-1 mr-2"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
                <input
                  className="border px-2 py-1 mr-2"
                  type="number"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      price: Number(e.target.value),
                    })
                  }
                />
                <button
                  onClick={() => handleUpdate(plan._id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingPlanId(null)}
                  className="bg-gray-400 text-white px-3 py-1 rounded"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <p className="mb-1">
                  <strong>{plan.name}</strong> - ₹{plan.price}
                </p>
                <button
                  onClick={() => handleEdit(plan)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(plan._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPlansPage;
