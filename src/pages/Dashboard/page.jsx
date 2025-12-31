import { useEffect, useState } from "react";
// import API from "../services/api";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();
    const vendor = JSON.parse(localStorage.getItem("vendor"));
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (vendor?._id) {
            API.get(`/product/vendor/${vendor._id}`)
                .then((res) => setProducts(res.data))
                .catch(() => { });
        }
    }, []);

    const badgeColor = (status) => {
        if (status === "approved") return "bg-green-100 text-green-700";
        if (status === "rejected") return "bg-red-100 text-red-700";
        return "bg-yellow-100 text-yellow-700";
    };
    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    }
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            {/* Vendor Info */}
            <div className="flex flex-col sm:flex-row justify-between bg-white p-6 rounded shadow mb-6">
                <div className="">
                    <h2 className="text-2xl font-bold">Welcome, {vendor?.name}</h2>
                    <p className="text-gray-600">{vendor?.email}</p>
                </div>
                <div>
                    <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center" onClick={handleLogout}>Logout</button>
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mb-6">
                <a
                    href="/add-product"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Add Product
                </a>
            </div>


            {/* Product List */}
            <div className="bg-white rounded shadow">
                <h3 className="text-xl font-semibold p-4 border-b">
                    Your Products
                </h3>

                {products?.length === 0 ? (
                    <p className="p-4 text-gray-500">No products submitted yet</p>
                ) : (
                    <table className="w-full text-left">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="p-3">Name</th>
                                <th className="p-3">Description</th>
                                <th className="p-3">Price</th>
                                <th className="p-3">Category</th>
                                <th className="p-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products?.map((p) => (
                                <tr key={p._id} className="border-t">
                                    <td className="p-3">{p?.name}</td>
                                    <td className="p-3">{p?.description}</td>
                                    <td className="p-3">₹{p?.price}</td>
                                    <td className="p-3">{p?.category}</td>
                                    <td className="p-3">
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm ${badgeColor(
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
    );
};

export default Dashboard;
