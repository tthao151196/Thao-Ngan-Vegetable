// src/main.jsx
import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, NavLink, Navigate } from "react-router-dom";
import "./index.css";

// ===== Customer pages =====
import Home from "./pages/Customers/Home";
import Products from "./pages/Customers/Products";
import Cart from "./pages/Customers/Cart";
import ProductDetail from "./pages/Customers/ProductDetail";
import CategoryProducts from "./pages/Customers/CategoryProducts";
import Register from "./pages/Customers/Register"; // <-- THÊM

// ===== Admin pages/layout =====
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/Admin/Dashboard";
import AdminProducts from "./pages/Admin/Products";
import AdminCategories from "./pages/Admin/Categories";
import AdminOrders from "./pages/Admin/Orders";
import AdminUsers from "./pages/Admin/Users";

// ---- Layout cho phần khách hàng ----
function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="px-4 py-3 border-b flex items-center justify-between">
        <div className="font-semibold">🍃 StoreVegetables</div>
        <nav className="flex gap-4">
          <NavLink to="/" end>Trang chủ</NavLink>
          <NavLink to="/products">Sản phẩm</NavLink>
          <NavLink to="/cart">Giỏ hàng</NavLink>
          <NavLink to="/register">Đăng ký</NavLink> {/* <-- THÊM */}
        </nav>
      </header>

      <main className="flex-1 p-4">{children}</main>

      <footer className="px-4 py-3 border-t text-sm text-gray-600">
        © {new Date().getFullYear()} StoreVegetables
      </footer>
    </div>
  );
}

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === product.id);
      return exists
        ? prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i))
        : [...prev, { ...product, qty: 1 }];
    });
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* ====== Customer routes ====== */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/products" element={<Layout><Products addToCart={addToCart} /></Layout>} />
        {/* Xem sản phẩm theo danh mục */}
        <Route path="/category/:id" element={<Layout><CategoryProducts addToCart={addToCart} /></Layout>} />
        <Route path="/categories/:id" element={<Navigate to="/category/:id" replace />} />
        {/* Chi tiết sản phẩm */}
        <Route path="/products/:id" element={<Layout><ProductDetail addToCart={addToCart} /></Layout>} />
        {/* Giỏ hàng */}
        <Route path="/cart" element={<Layout><Cart cart={cart} /></Layout>} />
        {/* Đăng ký */}
        <Route path="/register" element={<Layout><Register /></Layout>} /> {/* <-- THÊM */}

        {/* ====== Admin routes ====== */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="users" element={<AdminUsers />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<Layout><div>Không tìm thấy trang</div></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
