import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("vendor")); // or "user"

  if (!token) {
    return <Navigate to="/" />;
  }

  // Redirect admin to admin dashboard
  if (user?.role === "admin") {
    return <Navigate to="/admin" />;
  }

  // Normal vendor
  return children;
};

export default ProtectedRoute;
