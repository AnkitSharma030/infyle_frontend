import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login/page";
import Dashboard from "./pages/Dashboard/page";
import ProtectedRoute from "./component/ProtectedRoute";
import AddProduct from "./pages/addProduct/page";
import ProtectedAdmin from "./component/ProtectedAdmin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Signup from "./pages/register/page";
import AuthCallback from "./pages/auth/AuthCallback";
import NotFound from "./component/PgaeNotFound";
import AuthLayout from "./layout/AuthLayout";
import MainLayout from "./layout/MainLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes with AuthLayout */}
        <Route element={<AuthLayout><Navigate to="/" replace /></AuthLayout>} />
        <Route path="/" element={<AuthLayout><Login /></AuthLayout>} />
        <Route path="/signup" element={<AuthLayout><Signup /></AuthLayout>} />
        <Route path="/auth/callback" element={<AuthCallback />} />

        {/* Protected Routes with MainLayout */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-product"
          element={
            <ProtectedRoute>
              <MainLayout>
                <AddProduct />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedAdmin>
              <MainLayout>
                <AdminDashboard />
              </MainLayout>
            </ProtectedAdmin>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
