import React from 'react';
import { useAdminPlans } from '../../hooks/useAdmin'; // ✅ relative import

interface Plan {
  _id: string;
  name: string;
  price: number;
}

const AdminPlansPage = () => {
  const { data: plans = [], isLoading, isError } = useAdminPlans();

  if (isLoading) return <p>Loading plans...</p>;
  if (isError) return <p>Error loading plans.</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Plans</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map((plan: Plan) => (
          <div key={plan._id} className="border p-4 rounded shadow">
            <p><strong>Name:</strong> {plan.name}</p>
            <p><strong>Price:</strong> ₹{plan.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPlansPage;
