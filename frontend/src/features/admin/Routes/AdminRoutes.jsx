import { Route } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";
import AdminLayout from "../components/AdminLayout";

import AdminHomePage from "../components/AdminHomePage";
import UserManagement from "../components/UserManagement";
import ProductManagement from "../components/ProductManagement";
import EditProduct from "../components/EditProduct";
import OrderManagement from "../components/OrderManagement";
import CreateProduct from "../components/CreateProduct";

const AdminRoutes = (
  <>
    <Route
      path="/admin"
      element={
        <ProtectedRoute role="admin">
          <AdminLayout />
        </ProtectedRoute>
      }
    >
      <Route index element={<AdminHomePage />} />
      <Route path="users" element={<UserManagement />} />
      <Route path="products" element={<ProductManagement />} />
      <Route path="products/create" element={<CreateProduct />} />
      <Route path="products/:id/edit" element={<EditProduct />} />
      <Route path="orders" element={<OrderManagement />} />
    </Route>
  </>
);

export default AdminRoutes;
