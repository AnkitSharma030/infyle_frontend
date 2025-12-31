import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../../services/api";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/vendor/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("vendor", JSON.stringify(res.data.vendor));

      //Role based redirect
      if (res.data.vendor.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  console.log("url", process.env.REACT_APP_API_URL);

  const googleLogin = () => {
    window.location.href = `${process.env.REACT_APP_API_URL}/vendor/auth/google`;
  };

  return (
    <div className="w-full p-4">
      <h2 className="text-2xl font-bold text-center mb-2 text-gray-800">
        Vendor Login
      </h2>
      <p className="text-sm text-center text-gray-500 mb-6">
        Access your vendor dashboard
      </p>

      {error && (
        <p className="text-red-500 text-sm text-center mb-4 bg-red-50 p-2 rounded border border-red-200">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="email"
          type="email"
          placeholder="Email address"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          onChange={handleChange}
          required
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
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center my-6">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="px-3 text-sm text-gray-400">OR</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      {/* Google Login */}
      <button
        onClick={googleLogin}
        className="w-full border border-gray-300 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition text-gray-700 font-medium"
      >
        <img
          src="./google.png"
          alt="Google"
          className="w-5 h-5"
        />
        Continue with Google
      </button>

      {/* Signup */}
      <p className="text-sm text-center text-gray-600 mt-6">
        New user?{" "}
        <Link to="/signup" className="text-blue-600 hover:text-blue-700 font-medium hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  );
};

export default Login;
