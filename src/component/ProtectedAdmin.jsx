import { Navigate } from "react-router-dom";

const ProtectedAdmin = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("vendor"));

  return user?.role === "admin" ? children : <Navigate to="/login" />;
};

export default ProtectedAdmin;
