import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, NavLink, Navigate } from "react-router-dom";
import "./index.css";

// ✅ Toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ===== Customer pages =====
import Home from "./pages/Customers/Home";
import Products from "./pages/Customers/Products";
import Cart from "./pages/Customers/Cart";
import ProductDetail from "./pages/Customers/ProductDetail";
import CategoryProducts from "./pages/Customers/CategoryProducts";
import Register from "./pages/Customers/Register";
import Login from "./pages/Customers/Login";
import Checkout from "./pages/Customers/Checkout";
import OrderTracking from "./pages/Customers/OrderTracking";
import Blog from "./pages/Customers/Blog";
import ReviewSection from "./pages/Customers/ReviewSection";
import MyOrders from "./pages/Customers/MyOrders"; // ✅ thêm
import CanceledOrders from "./pages/Customers/CanceledOrders";
import Profile from "./pages/Customers/Profile";
// ===== Admin pages/layout =====
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/Admin/Dashboard";
import AdminProducts from "./pages/Admin/Product/Products";
import AdminCategories from "./pages/Admin/Category/Categories";
import AdminOrders from "./pages/Admin/Order/Orders";
import AdminUsers from "./pages/Admin/User/Users";
import AddProduct from "./pages/Admin/Product/AddProduct";
import EditProduct from "./pages/Admin/Product/EditProduct";
import AddCategory from "./pages/Admin/Category/AddCategory";
import LoginAdmin from "./pages/Admin/LoginAdmin";
import AdminRoute from "./components/AdminRoute";
import OrderDetail from "./pages/Admin/Order/OrderDetail";
import EditCategory from "./pages/Admin/Category/EditCategory";

// ---- Hàm logout (gọi API + xoá localStorage) ----
const handleLogout = async () => {
  const token = localStorage.getItem("token");

  try {
    if (token) {
      const res = await fetch("http://127.0.0.1:8000/api/logout", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      await res.json().catch(() => ({})); // ignore lỗi JSON
    }
  } catch (err) {
    console.error("Logout failed:", err);
  } finally {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.info("👋 Bạn đã đăng xuất!");
    setTimeout(() => {
      window.location.href = "/login"; // chuyển về login customer
    }, 1200);
  }
};

/* ===========================
   UserMenu (avatar + dropdown)
   =========================== */
function UserMenu() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("user") || "null"); }
    catch { return null; }
  });
  const ref = React.useRef(null);

  // đóng khi click ra ngoài / nhấn Esc
  useEffect(() => {
    const onClick = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onClick); document.removeEventListener("keydown", onKey); };
  }, []);

  // đồng bộ khi localStorage đổi ở tab khác
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "user" || e.key === "token") {
        try { setUser(JSON.parse(localStorage.getItem("user") || "null")); }
        catch { setUser(null); }
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  if (!user) return null;

  const name = user.name || user.email || "User";
  const email = user.email || "";
  const initials = name.trim().split(/\s+/).map(w => w[0]).join("").slice(0,2).toUpperCase();

  return (
    <div className="relative" ref={ref}>



                                          {/* Nút avatar */}
      {/* <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 px-2 py-1 rounded-full hover:bg-emerald-50 transition"
        aria-expanded={open}
        aria-haspopup="menu"
        title={name}
      >
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-semibold">
          {initials}
        </div>
        <span className="hidden md:block font-semibold text-gray-800 max-w-[120px] truncate">{name}</span>
        <svg width="18" height="18" viewBox="0 0 20 20" className={`transition ${open ? "rotate-180" : ""}`}>
          <path d="M5 7l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2"/>
        </svg>
      </button> */}
<NavLink
  to="/profile"
  className="flex items-center gap-2 px-2 py-1 rounded-full hover:bg-emerald-50 transition"
  title={name}
>
  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-semibold">
    {initials}
  </div>
  <span className="hidden md:block font-semibold text-gray-800 max-w-[120px] truncate">{name}</span>
</NavLink>

      {/* Dropdown */}
      {/* {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl ring-1 ring-black/5 overflow-hidden z-50"
        >
          <div className="px-4 py-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-semibold">
              {initials}
            </div>
            <div className="min-w-0">
              <div className="font-semibold text-gray-900 truncate">{name}</div>
              {email && <div className="text-sm text-gray-500 truncate">{email}</div>}
            </div>
          </div>

          <div className="py-2">
            <NavLink
              to="/my-orders"
              role="menuitem"
              className="flex items-start gap-3 px-4 py-2.5 hover:bg-emerald-50 transition"
              onClick={() => setOpen(false)}
            >
              <span className="mt-0.5">🧾</span>
              <span>
                <div className="font-medium text-gray-900">Đơn hàng của tôi</div>
                <div className="text-sm text-gray-500 -mt-0.5">Xem toàn bộ đơn đã đặt</div>
              </span>
            </NavLink>

            <button
              role="menuitem"
              onClick={handleLogout}
              className="w-full text-left flex items-center gap-3 px-4 py-2.5 hover:bg-rose-50 text-rose-600 font-semibold"
            >
              <span>↪</span>
              <span>Đăng xuất</span>
            </button>
          </div>
        </div>
      )} */}
    </div>
  );
}














/* ===========================
   Layout (header/nav/footer)
   =========================== */
function Layout({ children }) {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-emerald-50/40">
      <header className="px-4 py-3 border-b flex items-center justify-between sticky top-0 z-40 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
  {/* Logo bên trái */}
  <div className="font-semibold flex items-center gap-2 text-lg">
    🍃 <span className="tracking-tight">StoreVegetables</span>
  </div>

  {/* Menu chính ở giữa */}
  <nav className="flex gap-2 md:gap-4 items-center absolute left-1/2 -translate-x-1/2">
    <NavLink to="/" end className="navlink">Trang chủ</NavLink>
    <NavLink to="/products" className="navlink">Sản phẩm</NavLink>
    <NavLink to="/cart" className="navlink">Giỏ hàng</NavLink>
    <NavLink to="/blog" className="navlink">Blog</NavLink>
  </nav>

  {/* Menu user/auth ở bên phải */}
  <div className="flex items-center gap-2">
    {user ? (
      <UserMenu />
    ) : (
      <>
        <NavLink to="/register" className="navlink">Đăng ký</NavLink>
        <NavLink to="/login" className="navlink">Đăng nhập</NavLink>
      </>
    )}
  </div>
</header>


      <main className="flex-1 p-4 max-w-6xl mx-auto">{children}</main>

      <footer className="px-4 py-4 border-t text-sm text-gray-600 bg-white/70 backdrop-blur">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span>© {new Date().getFullYear()} StoreVegetables</span>
          <span className="text-gray-500">Tươi mỗi ngày 🥬</span>
        </div>
      </footer>

      {/* Chỉ CSS giao diện, không đụng logic */}
      <style>{`
        :root { --e: cubic-bezier(.2,.8,.2,1); }

        .navlink{
          position:relative;
          padding:.5rem .75rem;
          border-radius:.75rem;
          font-weight:700;
          color:#0f766e;
          transition: color .2s var(--e), background .2s var(--e), transform .2s var(--e);
        }
        .navlink:hover{
          color:#047857;
          background:rgba(16,185,129,.08);
          transform: translateY(-1px);
        }
        .navlink[aria-current="page"]{
          color:#047857;
        }
        .navlink[aria-current="page"]::after{
          content:"";
          position:absolute; left:12%; right:12%; bottom:-8px;
          height:3px; border-radius:9999px;
          background: linear-gradient(90deg,#00c853,#00e676);
        }
      `}</style>
    </div>
  );
}

/* ===== App & Routes ===== */
function App() {
  // ✅ Lấy giỏ hàng từ localStorage khi khởi tạo
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  // ✅ Mỗi lần cart thay đổi thì lưu lại vào localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ✅ Hàm thêm sản phẩm
  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === product.id);
      return exists
        ? prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i))
        : [...prev, { ...product, qty: 1 }];
    });
    toast.success("🎉 Sản phẩm đã được thêm vào giỏ hàng!");
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* ====== Customer routes ====== */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/products" element={<Layout><Products addToCart={addToCart} /></Layout>} />
        <Route path="/category/:id" element={<Layout><CategoryProducts addToCart={addToCart} /></Layout>} />
        <Route path="/categories/:id" element={<Navigate to="/category/:id" replace />} />
        <Route path="/products/:id" element={<Layout><ProductDetail addToCart={addToCart} /></Layout>} />
        <Route path="/products/:id/reviews" element={<Layout><ReviewSection /></Layout>} />
        <Route path="/checkout" element={<Layout><Checkout cart={cart} setCart={setCart} /></Layout>} />
        <Route path="/cart" element={<Layout><Cart cart={cart} setCart={setCart} /></Layout>} />
        <Route path="/register" element={<Layout><Register /></Layout>} />
        <Route path="/login" element={<Layout><Login /></Layout>} />
        <Route path="/track" element={<OrderTracking />} />
        <Route path="/my-orders" element={<Layout><MyOrders /></Layout>} />  {/* ✅ mới */}
        <Route path="/blog" element={<Blog />} />
        <Route path="/canceled-orders" element={<Layout><CanceledOrders /></Layout>} /> {/* ✅ mới */}
        <Route path="/profile" element={<Profile />} />
        {/* ====== Admin login riêng ====== */}
        <Route path="/admin/login" element={<LoginAdmin />} />

        {/* ====== Admin routes (protected) ====== */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="products/add" element={<AddProduct />} />
          <Route path="products/:id/edit" element={<EditProduct />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="categories/add" element={<AddCategory />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="orders/:id" element={<OrderDetail />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="categories/edit/:id" element={<EditCategory />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<Layout><div>Không tìm thấy trang</div></Layout>} />
      </Routes>

      {/* ✅ Container cho thông báo */}
      <ToastContainer position="top-right" autoClose={2000} />
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
