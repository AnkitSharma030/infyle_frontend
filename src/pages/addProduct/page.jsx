import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import API from "../services/api";
import API from "../../services/api";

const AddProduct = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/product/add", form);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add product");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-4">Add Product</h2>

        {error && <p className="text-red-500 mb-3">{error}</p>}

        <input
          name="name"
          placeholder="Product Name"
          className="w-full p-2 border mb-3"
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          className="w-full p-2 border mb-3"
          onChange={handleChange}
          required
        />

        <input
          name="price"
          type="number"
          placeholder="Price"
          className="w-full p-2 border mb-3"
          onChange={handleChange}
          required
        />

        <input
          name="category"
          placeholder="Category"
          className="w-full p-2 border mb-3"
          onChange={handleChange}
          required
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded">
          Submit Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
