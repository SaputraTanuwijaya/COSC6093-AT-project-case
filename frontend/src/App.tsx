import { Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { HomePage } from "./pages/HomePage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AdminRoute } from "./components/AdminRoute";
import { ProductPage } from "./pages/ProductPage";

const MyOrdersPage = () => <p>My Orders</p>;
const AdminPage = () => <p>Admin Dashboard</p>;

export function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductPage />} />

      {/* Protected Routes (Logged-in users only) */}
      <Route element={<ProtectedRoute />}>
        <Route path="/my-orders" element={<MyOrdersPage />} />
      </Route>

      {/* Admin Routes (Admin-only) */}
      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminPage />} />
      </Route>
    </Routes>
  );
}
