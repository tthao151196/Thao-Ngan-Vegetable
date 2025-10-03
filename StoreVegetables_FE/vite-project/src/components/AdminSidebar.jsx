// import { NavLink } from "react-router-dom";

// const linkStyle = ({ isActive }) => ({
//   display: "block",
//   padding: "10px 14px",
//   textDecoration: "none",
//   color: isActive ? "#0f62fe" : "#222",
//   background: isActive ? "rgba(15,98,254,.08)" : "transparent",
//   borderRadius: 8,
//   marginBottom: 6,
//   fontWeight: 500,
// });

// export default function AdminSidebar() {
//   return (
//     <div style={{ padding: 16 }}>
//       <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>Admin</div>
//       <nav>
//         <NavLink to="/admin" end style={linkStyle}>Dashboard</NavLink>
//         <NavLink to="/admin/products" style={linkStyle}>Products</NavLink>
//         <NavLink to="/admin/categories" style={linkStyle}>Categories</NavLink>
//         <NavLink to="/admin/orders" style={linkStyle}>Orders</NavLink>
//         <NavLink to="/admin/users" style={linkStyle}>Users</NavLink>
//       </nav>
//     </div>
//   );
// }
import { NavLink } from "react-router-dom";

const linkStyle = ({ isActive }) => ({
  display: "block",
  padding: "10px 14px",
  textDecoration: "none",
  color: isActive ? "#0f62fe" : "#222",
  background: isActive ? "rgba(15,98,254,.08)" : "transparent",
  borderRadius: 8,
  marginBottom: 6,
  fontWeight: 500,
});

export default function AdminSidebar() {
  return (
    <aside className="admin-sidebar" style={{ padding: 16 }}>
      <div className="admin-title">Admin</div>

      <nav>
        <NavLink to="/admin" end style={linkStyle} className="admin-link">Dashboard</NavLink>
        <NavLink to="/admin/products" style={linkStyle} className="admin-link">Products</NavLink>
        <NavLink to="/admin/categories" style={linkStyle} className="admin-link">Categories</NavLink>
        <NavLink to="/admin/orders" style={linkStyle} className="admin-link">Orders</NavLink>
        <NavLink to="/admin/users" style={linkStyle} className="admin-link">Users</NavLink>
      </nav>

      {/* 🎨 Chỉ CSS giao diện, không đổi kích thước */}
      <style>{`
        :root { --e: cubic-bezier(.2,.8,.2,1); --primary:#0f62fe; }

        .admin-sidebar{
          background: linear-gradient(180deg,#ffffff 0%, #f8fbff 100%);
          border-right: 1px solid #eef2f7;
          box-shadow: 0 10px 30px rgba(15,98,254,.04) inset;
          border-radius: 12px;
        }
        .admin-title{
          font-size: 18px; font-weight: 800; margin-bottom: 10px;
          color:#0f172a; letter-spacing:.2px;
          background:#fff; border:1px solid #eef2f7; border-radius:12px;
          padding:8px 10px;
        }

        .admin-link{
          position:relative;
          transition: background .2s var(--e), color .2s var(--e), transform .2s var(--e), box-shadow .2s var(--e);
        }
        /* Hover pastel nhẹ – dùng !important để lấn màu inline */
        .admin-link:hover{
          background: rgba(15,98,254,.06) !important;
          color: var(--primary) !important;
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(15,98,254,.06);
        }
        /* Active: thêm thanh nhấn bên trái + bóng nhẹ */
        .admin-link[aria-current="page"]{
          box-shadow: 0 8px 18px rgba(15,98,254,.05);
        }
        .admin-link[aria-current="page"]::before{
          content:"";
          position:absolute; left:6px; top:8px; bottom:8px; width:3px;
          border-radius:999px;
          background: linear-gradient(180deg, var(--primary), #2ea8ff);
          box-shadow: 0 0 0 2px rgba(15,98,254,.12);
        }
      `}</style>
    </aside>
  );
}
