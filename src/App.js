import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/page";
import Dashboard from "./pages/Dashboard/page";
import ProtectedRoute from "./component/ProtectedRoute";
import AddProduct from "./pages/addProduct/page";
import ProtectedAdmin from "./component/ProtectedAdmin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Signup from "./pages/register/page";
import AuthCallback from "./pages/auth/AuthCallback";
import NotFound from "./component/PgaeNotFound";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/auth/callback" element={<AuthCallback />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-product"
          element={
            <ProtectedRoute>
              <AddProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedAdmin>
              <AdminDashboard />
            </ProtectedAdmin>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>


    </BrowserRouter>
  );
}

export default App;
