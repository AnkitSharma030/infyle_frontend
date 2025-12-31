import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../../services/api";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post("/vendor/signup", form);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };


  const googleLogin = () => {
    window.location.href = `${process.env.REACT_APP_API_URL}/vendor/auth/google`;
  };

  return (
    <div className="w-full p-4">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
        Vendor Signup
      </h2>
      <p className="text-sm text-center text-gray-500 mb-6">
        Create your vendor account
      </p>

      {error && (
        <p className="text-red-500 text-sm text-center mb-4 bg-red-50 p-2 rounded border border-red-200">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="name"
          placeholder="Vendor Name"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email address"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          onChange={handleChange}
          required
        />

        <input
          name="phone"
          placeholder="Phone number"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          onChange={handleChange}
          required
        />

        <button
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-70"
        >
          {loading ? "Creating account..." : "Signup"}
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center my-6">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="px-3 text-sm text-gray-400">OR</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      {/* Google OAuth */}
      <button
        type="button"
        onClick={googleLogin}
        className="w-full border border-gray-300 py-3 rounded-lg flex justify-center items-center gap-2 hover:bg-gray-50 transition text-gray-700 font-medium"
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="google"
          className="w-5 h-5"
        />
        Continue with Google
      </button>

      <p className="text-sm text-center text-gray-600 mt-6">
        Already have an account?{" "}
        <Link to="/" className="text-blue-600 hover:text-blue-700 font-medium hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default Signup;
