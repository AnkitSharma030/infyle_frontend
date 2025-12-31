import { useEffect, useState } from "react";
// import API from "../services/api";
import API from "../../services/api";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);

  const fetchPending = async () => {
    const res = await API.get("/admin/products/pending");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchPending();
  }, []);

  const updateStatus = async (id, status) => {
    await API.put(`/admin/product/${id}`, { status });
    fetchPending();
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Pending Products</h1>

      <div className="grid gap-4">
        {products.map((p) => (
          <div key={p._id} className="border p-4 rounded bg-white">
            <h2 className="font-semibold">{p.name}</h2>
            <p>{p.description}</p>
            <p className="text-sm text-gray-500">
              Vendor: {p.vendorId.name}
            </p>

            <div className="mt-3 flex gap-2">
              <button
                onClick={() => updateStatus(p._id, "approved")}
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                Approve
              </button>

              <button
                onClick={() => updateStatus(p._id, "rejected")}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
