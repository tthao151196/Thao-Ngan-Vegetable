// // src/components/AdminRoute.jsx
// import { Navigate } from "react-router-dom";

// export default function AdminRoute({ children }) {
//   const user = JSON.parse(localStorage.getItem("user") || "null");

//   // Nếu chưa login hoặc không phải admin => redirect về trang login
//   if (!user || user.roles !== "admin") {
//     return <Navigate to="/admin/login" replace />;
//   }

//   return children;
// }


import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const admin = JSON.parse(localStorage.getItem("admin_user") || "null");
  const adminToken = localStorage.getItem("admin_token");

  // Nếu chưa login hoặc không phải admin => redirect về trang login
  if (!admin || admin.roles !== "admin" || !adminToken) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
