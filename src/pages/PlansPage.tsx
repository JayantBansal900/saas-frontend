import { useState } from 'react';
import {
  useFetchPlans,
  useCreatePlan,
  useDeletePlan,
  useUpdatePlan,
} from '../hooks/usePlans';

interface Plan {
  _id: string;
  name: string;
  price: number;
}

const PlansPage = () => {
  const { data: plans = [], isLoading } = useFetchPlans();
  const createPlan = useCreatePlan();
  const deletePlan = useDeletePlan();
  const updatePlan = useUpdatePlan();

  const [form, setForm] = useState({ name: '', price: '' });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Plans</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Plan Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="border p-2 mr-2"
        />
        <button
          onClick={() => createPlan.mutate(form)}
          className="bg-blue-500 text-white px-4 py-2"
        >
          Add Plan
        </button>
      </div>

      <ul>
        {plans.map((plan: Plan) => (
          <li key={plan._id} className="mb-2 flex justify-between items-center">
            <span>
              {plan.name} - ₹{plan.price}
            </span>
            <div>
              <button
                onClick={() =>
                  updatePlan.mutate({
                    id: plan._id,
                    data: { name: 'Updated Plan' },
                  })
                }
                className="text-yellow-500 mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => deletePlan.mutate(plan._id)}
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlansPage;
