import { useEffect, useState } from "react";
// import API from "../services/api";
import API from "../../services/api";
// import { useNavigate } from "react-router-dom"; // Removed unused import

const Dashboard = () => {
    // const navigate = useNavigate(); // Removed as logout is in Sidebar
    const vendor = JSON.parse(localStorage.getItem("vendor"));
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (vendor?._id) {
            API.get(`/product/vendor/${vendor._id}`)
                .then((res) => setProducts(res.data))
                .catch(() => { });
        }
    }, [vendor?._id]); // Added dependency

    const badgeColor = (status) => {
        if (status === "approved") return "bg-green-100 text-green-700";
        if (status === "rejected") return "bg-red-100 text-red-700";
        return "bg-yellow-100 text-yellow-700";
    };

    return (
        <div className="space-y-6">
            {/* Header / Actions */}
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Product Dashboard</h2>
                <a
                    href="/add-product"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition shadow-sm flex items-center gap-2"
                >
                    + Add Product
                </a>
            </div>

            {/* Product List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                    <h3 className="font-semibold text-gray-700">Your Products</h3>
                </div>

                <div className="overflow-x-auto">
                    {products?.length === 0 ? (
                        <p className="p-8 text-center text-gray-500">No products submitted yet.</p>
                    ) : (
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-gray-600 font-medium text-sm uppercase tracking-wider">
                                <tr>
                                    <th className="p-4">Name</th>
                                    <th className="p-4">Description</th>
                                    <th className="p-4">Price</th>
                                    <th className="p-4">Category</th>
                                    <th className="p-4">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {products?.map((p) => (
                                    <tr key={p._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="p-4 font-medium text-gray-900">{p?.name}</td>
                                        <td className="p-4 text-gray-600 truncate max-w-xs" title={p?.description}>{p?.description}</td>
                                        <td className="p-4 text-gray-900">₹{p?.price}</td>
                                        <td className="p-4 text-gray-600">{p?.category}</td>
                                        <td className="p-4">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${badgeColor(
                                                    p?.status
                                                )}`}
                                            >
                                                {p?.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
