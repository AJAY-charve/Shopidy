import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { Toaster } from "sonner";

import store from "./redux/store";
import CustomerRoutes from "./features/customer/Routes/CustomerRoutes";
import AdminRoutes from "./features/admin/Routes/AdminRoutes";
import NotFound from "./features/components/common/NotFound";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          {CustomerRoutes}
          {AdminRoutes}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
