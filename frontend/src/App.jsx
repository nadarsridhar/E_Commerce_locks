import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserLayout from "./components/Layout/UserLayout";
import Home from './pages/Home';
import Login from "./pages/Login";
import { Toaster } from "sonner";
import Register from './pages/Register';
import Profile from './pages/Profile';
import CollectionPage from './pages/CollectionPage';
import ProductDetails from './components/products/ProductDetails';
import Checkout from './components/cart/Checkout';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import OrderDetails from './pages/OrderDetails';
import MyOrdersPage from './pages/MyOrderPage';
import AdminLayout from './components/admin/AdminLayout';
import AdminHomePage from './pages/AdminHomePage';
import UserManagement from './components/admin/UserManagement';
import ProductManagement from './components/admin/ProductManagement';
import EditProductPage from './components/admin/EditProductPage';
import OrderManagement from './components/admin/OrderManagement';
import SmartLocksPage from "./pages/SmartLocksPage";
import SpecializedLocksPage from "./pages/SpecializedLocksPage";
import ForgetPassword from './pages/ForgotPassword';
import AdminSubscribers from './pages/AdminSubscribers';



const App = () => {
  return (
    <BrowserRouter>
      <Toaster position='top-right' />
      <Routes>
        {/* User Routes */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgetPassword />} />
          <Route path="profile" element={<Profile />} />
          <Route path="collections/:collection" element={<CollectionPage />} />
          <Route path="collections/smart-locks" element={<SmartLocksPage />} />
          <Route path="collections/specialized-locks" element={<SpecializedLocksPage />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="order-confirmation/:id" element={<OrderConfirmationPage />} />
          <Route path="order/:id" element={<OrderDetails />} />
          <Route path="/my-orders" element={<MyOrdersPage />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminHomePage />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="products" element={<ProductManagement />} />
          <Route path="products/:id/edit" element={<EditProductPage />} />
          <Route path="orders" element={<OrderManagement />} />
          <Route path="subscribers" element={<AdminSubscribers />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
