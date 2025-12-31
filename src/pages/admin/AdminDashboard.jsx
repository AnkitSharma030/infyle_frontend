import { useEffect, useState } from "react";
// import API from "../services/api";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate= useNavigate();
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

  const handleLogout=()=>{
    localStorage.clear();
    navigate('/');
  }

  return (
    <div className="p-8">
      <div className="flex justify-between py-4">
  <h1 className="text-2xl font-bold mb-6">Pending Products</h1>
  <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center" onClick={handleLogout}>Logout</button>
</div>

  <div className="overflow-x-auto bg-white rounded shadow">
    <table className="min-w-full border border-gray-200">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border">
            Product Name
          </th>
          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border">
            Description
          </th>
          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border">
            Vendor
          </th>
          <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 border">
            Actions
          </th>
        </tr>
      </thead>

      <tbody>
        {products.length === 0 ? (
          <tr>
            <td
              colSpan="4"
              className="text-center py-6 text-gray-500"
            >
              No pending products
            </td>
          </tr>
        ) : (
          products.map((p) => (
            <tr key={p._id} className="hover:bg-gray-50">
              <td className="px-4 py-3 border font-medium">
                {p.name}
              </td>
              <td className="px-4 py-3 border text-sm text-gray-600">
                {p.description}
              </td>
              <td className="px-4 py-3 border text-sm text-gray-600">
                {p.vendorId?.name}
              </td>
              <td className="px-4 py-3 border text-center">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => updateStatus(p._id, "approved")}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateStatus(p._id, "rejected")}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                  >
                    Reject
                  </button>
                </div>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
</div>

  );
};

export default AdminDashboard;
