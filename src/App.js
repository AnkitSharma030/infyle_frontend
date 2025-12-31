import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/page";
import Dashboard from "./pages/Dashboard/page";
import ProtectedRoute from "./component/ProtectedRoute";
import AddProduct from "./pages/addProduct/page";
import ProtectedAdmin from "./component/ProtectedAdmin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Signup from "./pages/register/page";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

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

      </Routes>


    </BrowserRouter>
  );
}

export default App;
