import { Route } from "react-router-dom";
import UserLayout from "../Layout/UserLayout";
import Home from "../pages/home/Home";
import Profile from "../pages/profile/Profile";
import Collection from "../pages/collections/Collection";
import ProductDetails from "../pages/Products/ProductDetails";
import Checkout from "../pages/Cart/Checkout";
import OrderConfirmation from "../pages/orders/OrderConfirmation";
import OrderDetails from "../pages/orders/OrderDetails";
import MyOrders from "../pages/orders/MyOrders";

const CustomerRoutes = (
  <Route path="/" element={<UserLayout />}>
    <Route index element={<Home />} />

    <Route path="profile" element={<Profile />} />
    <Route path="collections/:collection" element={<Collection />} />
    <Route path="product/:id" element={<ProductDetails />} />
    <Route path="checkout" element={<Checkout />} />
    <Route path="order-confirmation" element={<OrderConfirmation />} />
    <Route path="order/:id" element={<OrderDetails />} />
    <Route path="my-orders" element={<MyOrders />} />
  </Route>
);

export default CustomerRoutes;
