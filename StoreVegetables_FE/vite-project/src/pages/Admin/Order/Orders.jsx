// src/pages/Admin/Order/Orders.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://127.0.0.1:8000/api";
const VND = new Intl.NumberFormat("vi-VN");

const badgeStyle = (status) => {
  const s = Number(status);
  const ok = s === 1;
  const cancel = s === 2;
  return {
    display: "inline-block",
    padding: "2px 8px",
    borderRadius: 999,
    background: ok ? "#e7f9ee" : cancel ? "#fde8e8" : "#fff6e6",
    color: ok ? "#0a7a3f" : cancel ? "#b42318" : "#a35b00",
    fontSize: 12,
    fontWeight: 700,
  };
};

const humanStatus = (s) => {
  switch (Number(s)) {
    case 0: return "Pending";
    case 1: return "Completed";
    case 2: return "Cancelled";
    default: return "Unknown";
  }
};

export default function Orders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [search, setSearch] = useState("");
  const [savingIds, setSavingIds] = useState(new Set()); // id đang cập nhật

  const token = localStorage.getItem("token"); // phải có token admin (Sanctum)

  // Load danh sách đơn
  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        setLoading(true);
        setErr("");
        const url = `${API_BASE}/orders?per_page=100${
          search ? `&search=${encodeURIComponent(search)}` : ""
        }`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const list = Array.isArray(data) ? data : data?.data ?? [];
        if (!ignore) setOrders(list);
      } catch (e) {
        console.error(e);
        if (!ignore) setErr("Không tải được danh sách đơn hàng.");
      } finally {
        if (!ignore) setLoading(false);
      }
    })();
    return () => { ignore = true; };
  }, [search]);

  // Gọi API đổi trạng thái
  const updateStatus = async (id, newStatus) => {
    if (!token) {
      alert("Thiếu token đăng nhập admin.");
      return;
    }
    setSavingIds((s) => new Set(s).add(id));
    try {
      const res = await fetch(`${API_BASE}/admin/orders/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: Number(newStatus) }),
      });
      if (!res.ok) {
        const t = await res.text();
        throw new Error(`Update failed ${res.status}: ${t}`);
      }
      const { order } = await res.json();
      // cập nhật local state
      setOrders((list) =>
        list.map((o) => (o.id === id ? { ...o, status: order.status, status_int: order.status } : o))
      );
    } catch (e) {
      console.error("Update status failed", e);
      alert("Cập nhật trạng thái thất bại.");
    } finally {
      setSavingIds((s) => {
        const n = new Set(s);
        n.delete(id);
        return n;
      });
    }
  };

  return (
    <section>
      <h1 style={{ fontSize: 24, marginBottom: 12 }}>Orders</h1>

      <div style={{ margin: "8px 0 12px", display: "flex", gap: 8 }}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm theo mã đơn / tên / email / sđt"
          style={{
            padding: "6px 10px",
            borderRadius: 6,
            border: "1px solid #ccc",
            minWidth: 260,
          }}
        />
        <button
          onClick={() => setSearch("")}
          style={{
            padding: "6px 10px",
            borderRadius: 6,
            border: "1px solid #ccc",
            background: "#fff",
          }}
        >
          Xóa tìm
        </button>
      </div>

      {loading && <p>Đang tải...</p>}
      {err && <p style={{ color: "#d32f2f" }}>{err}</p>}

      {!loading && !err && (
        <table width="100%" cellPadding={8} style={{ borderCollapse: "collapse", background: "#fff" }}>
          <thead>
            <tr style={{ background: "#fafafa" }}>
              <th align="left">Order #</th>
              <th align="left">Khách hàng</th>
              <th align="left">Email</th>
              <th align="left">SĐT</th>
              <th align="right">Tổng tiền</th>
              <th align="center">Trạng thái</th>
              <th align="center">Chi tiết</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => {
              const disabled = savingIds.has(o.id);
              return (
                <tr key={o.id} style={{ borderTop: "1px solid #eee" }}>
                  <td>{o.id}</td>
                  <td>{o.name}</td>
                  <td>{o.email}</td>
                  <td>{o.phone}</td>
                  <td align="right">₫{VND.format(Number(o.total ?? 0))}</td>
                  <td align="center">
                    <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center" }}>
                      <span style={badgeStyle(o.status)}>{humanStatus(o.status)}</span>
                      <select
                        value={String(o.status ?? 0)}
                        disabled={disabled}
                        onChange={(e) => updateStatus(o.id, e.target.value)}
                        style={{ padding: "4px 6px", borderRadius: 6, border: "1px solid #ccc" }}
                        title="Đổi trạng thái"
                      >
                        <option value="0">Pending</option>
                        <option value="1">Completed</option>
                        <option value="2">Cancelled</option>
                      </select>
                    </div>
                  </td>
                  <td align="center">
                    <button onClick={() => navigate(`/admin/orders/${o.id}`)} disabled={disabled}>
                      Xem
                    </button>
                  </td>
                </tr>
              );
            })}
            {orders.length === 0 && (
              <tr>
                <td colSpan={7} align="center" style={{ color: "#666", padding: 16 }}>
                  Không có đơn hàng.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </section>
  );
}
