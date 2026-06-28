import { Routes, Route } from "react-router-dom"

import Home from "../pages/Home"
import RestaurantMenu from "../pages/RestaurantMenu"
import Cart from "../pages/Cart"
import Checkout from "../pages/Checkout"
import Orders from "../pages/Orders"
import Login from "../pages/Login"
import Signup from "../pages/Signup"
import AdminOrders from "../pages/AdminOrders"
import AdminFoods from "../pages/AdminFoods"
import AdminDashboard from "../pages/AdminDashboard"

export default function AppRoutes() {
  return (
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/restaurant/:id" element={<RestaurantMenu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin/foods" element={<AdminFoods />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

      </Routes>
  )
}