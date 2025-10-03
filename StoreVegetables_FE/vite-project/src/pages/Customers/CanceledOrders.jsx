// src/pages/Customers/CanceledOrders.jsx
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://127.0.0.1:8000/api";
const PLACEHOLDER = "https://placehold.co/64x48?text=No+Img";
const ORDER_TRACK_PATH = "/orders/track";

export default function CanceledOrders() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = (() => {
    try { return JSON.parse(localStorage.getItem("user") || "null"); } catch { return null; }
  })();

  const [orders, setOrders] = useState([]);       // đã hydrate items
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [q, setQ] = useState("");

  const fmt = (v) => (v == null ? 0 : Number(v)).toLocaleString("vi-VN");
  const fmtTime = (t) => {
    if (!t) return "";
    const d = new Date(t);
    return isNaN(d) ? String(t) : d.toLocaleString("vi-VN");
  };

  // total fallback nếu API không trả "total"
  const calcTotal = (o) => {
    const items = o.items || o.order_items || [];
    const subtotal =
      o.subtotal != null
        ? Number(o.subtotal)
        : items.reduce((s, it) => s + (Number(it.price ?? 0) * Number(it.qty ?? it.quantity ?? 0)), 0);
    const shipping = Number(o.shipping_fee ?? 0);
    const discount = Number(o.discount ?? 0);
    return o.total != null ? Number(o.total) : subtotal + shipping - discount;
  };

  // Chuẩn hóa: xác định có phải canceled
  const isCanceled = (o) => {
    const s = o?.status;
    if (s === 2 || s === "2") return true;
    const k = String(o?.status_step || o?.status_key || o?.step || "").toLowerCase();
    return k.includes("cancel");
  };

  // Lấy list base (my-orders / orders?status=2)
  const fetchBaseList = async (signal) => {
    const headers = { Accept: "application/json" };
    if (token) headers.Authorization = `Bearer ${token}`;

    // Nếu có token: lấy my-orders (trả tất cả đơn của user) rồi FE lọc canceled
    if (token) {
      try {
        const r = await fetch(`${API_BASE}/my-orders`, { signal, headers });
        if (r.ok) {
          const data = await r.json();
          if (Array.isArray(data)) return data;
        }
      } catch {}
    }

    // Public fallback: status=2 (canceled)
    try {
      const r = await fetch(`${API_BASE}/orders?status=2`, { signal, headers });
      if (r.ok) {
        const data = await r.json();
        // có thể là paginate {data:[...]}, hoặc array
        if (Array.isArray(data)) return data;
        if (Array.isArray(data?.data)) return data.data;
      }
    } catch {}

    return [];
  };

  // Hydrate items cho mỗi đơn (gọi /orders/{id})
  const hydrateOrders = async (list, signal) => {
    const headers = { Accept: "application/json" };
    if (token) headers.Authorization = `Bearer ${token}`;

    const jobs = list.map(async (o) => {
      const id = o.id || o.code;
      if (!id) return o;

      try {
        const r = await fetch(`${API_BASE}/orders/${encodeURIComponent(id)}`, { signal, headers });
        if (r.ok) {
          const d = await r.json();
          // /orders/{id} của bạn trả dạng phẳng (id, items, total,...)
          // merge trả về, ưu tiên items/total từ chi tiết
          return { ...o, ...d, items: d.items || o.items || [] };
        }
      } catch {}
      return o;
    });

    // Limit concurrency nhẹ để tránh spam BE
    const concurrency = 6;
    const out = [];
    for (let i = 0; i < jobs.length; i += concurrency) {
      // eslint-disable-next-line no-await-in-loop
      const chunk = await Promise.all(jobs.slice(i, i + concurrency));
      out.push(...chunk);
    }
    return out;
  };

  useEffect(() => {
    const ac = new AbortController();

    (async () => {
      setLoading(true);
      setErr("");

      try {
        const base = await fetchBaseList(ac.signal);
        const canceledOnly = base.filter(isCanceled);

        if (!canceledOnly.length) {
          setOrders([]);
          setLoading(false);
          return;
        }

        const hydrated = await hydrateOrders(canceledOnly, ac.signal);
        setOrders(hydrated);
      } catch (e) {
        console.error(e);
        setErr("Không tải được danh sách đơn đã hủy.");
      } finally {
        setLoading(false);
      }
    })();

    return () => ac.abort();
  }, [token]);

  const visibleOrders = useMemo(() => {
    const list = (orders || [])
      .filter(isCanceled)
      .sort(
        (a, b) =>
          new Date(b.updated_at || b.created_at || 0) -
          new Date(a.updated_at || a.created_at || 0)
      );
    if (!q.trim()) return list;
    const k = q.trim().toLowerCase();
    return list.filter((o) => String(o.code || o.id).toLowerCase().includes(k));
  }, [orders, q]);

  const reorder = (order) => {
    const src = order.items || order.order_items || [];
    if (!src.length) return;
    const load = () => { try { return JSON.parse(localStorage.getItem("cart") || "[]"); } catch { return []; } };
    const save = (v) => localStorage.setItem("cart", JSON.stringify(v));

    const current = load();
    const merged = [...current];

    for (const it of src) {
      const id = it.product_id || it.product?.id || it.id;
      if (!id) continue;
      const name  = it.name || it.product_name || it.product?.name || `#${id}`;
      const qty   = it.qty ?? it.quantity ?? 1;
      const price = Number(it.price ?? it.product?.price_sale ?? it.product?.price_root ?? it.product?.price ?? 0);
      const thumb = it.thumbnail_url || it.product_image || it.image_url || it.thumbnail || PLACEHOLDER;

      const idx = merged.findIndex((x) => x.id === id);
      if (idx >= 0) merged[idx].qty += qty;
      else merged.push({ id, name, price, qty, thumbnail_url: thumb });
    }
    save(merged);
    alert("🛒 Đã thêm lại sản phẩm vào giỏ!");
    navigate("/cart");
  };

  return (
    <div className="cxl-page">
      <div className="card">
        <div className="topbar">
          <button className="back-home" onClick={() => navigate("/")}>🏠 Về trang chủ</button>
          <h2 className="title">🗂️ Đơn đã hủy</h2>
        </div>

        <div className="toolbar">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Tìm theo mã đơn…"
            className="search"
          />
          <div className="who">
            {user?.name ? <>👤 <b>{user.name}</b></> : "—"}
          </div>
        </div>

        {loading && <p className="muted">Đang tải…</p>}
        {err && !loading && <p className="error">❌ {err}</p>}

        {!loading && !err && visibleOrders.length === 0 && (
          <div className="empty">
            <img src="https://illustrations.popsy.co/teal/paper-trash.svg" alt="" />
            <div>Không có đơn nào đã hủy.</div>
          </div>
        )}

        <div className="grid">
          {visibleOrders.map((o) => {
            const items = o.items || o.order_items || [];
            const total = calcTotal(o);
            return (
              <div key={o.id || o.code} className="order">
                <div className="order-head">
                  <div className="code">#{o.code || o.id}</div>
                  <div className="time">{fmtTime(o.updated_at || o.created_at)}</div>
                </div>

                <div className="items">
                  {items.slice(0, 4).map((it, i) => (
                    <div key={i} className="item">
                      <img
                        src={it.thumbnail_url || it.product_image || it.image_url || it.thumbnail || PLACEHOLDER}
                        onError={(e) => (e.currentTarget.src = PLACEHOLDER)}
                        alt={it.name || it.product_name || `#${it.product_id || it.id}`}
                      />
                      <div className="info">
                        <div className="name">{it.name || it.product_name || `#${it.product_id || it.id}`}</div>
                        <div className="sub">
                          SL: {it.qty ?? it.quantity ?? 0} × ₫{fmt(it.price)}
                        </div>
                      </div>
                      <div className="sum">₫{fmt((it.qty || it.quantity || 0) * (it.price || 0))}</div>
                    </div>
                  ))}
                  {items.length > 4 && (
                    <div className="more">+{items.length - 4} sản phẩm khác…</div>
                  )}
                </div>

                <div className="foot">
                  <div className="total">Tổng: <b>₫{fmt(total)}</b></div>
                  <div className="actions">
                    <button
                      className="btn outline"
                      onClick={() => navigate(`${ORDER_TRACK_PATH}?code=${encodeURIComponent(o.code || o.id)}`)}
                    >
                      Xem chi tiết
                    </button>
                    <button className="btn solid" onClick={() => reorder(o)}>Mua lại</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Style />
    </div>
  );
}

/** Inline CSS component để gọn file */
function Style() {
  return (
    <style>{`
      :root { --e:cubic-bezier(.2,.8,.2,1); }
      .cxl-page{max-width:1000px;margin:0 auto;padding:20px;}
      .card{
        background:linear-gradient(180deg,#fff 0%, #f8fffd 100%);
        border:1px solid #e6f4ef;border-radius:16px;padding:16px;
        box-shadow:0 10px 24px rgba(16,185,129,.08);
      }
      .topbar{display:flex;align-items:center;gap:10px;margin-bottom:8px}
      .back-home{
        padding:8px 12px;border-radius:12px;border:1px solid #d1fae5;
        background:#ecfdf5;color:#065f46;font-weight:900;cursor:pointer;
        transition:transform .2s var(--e),box-shadow .2s var(--e)
      }
      .back-home:hover{transform:translateY(-1px);box-shadow:0 8px 18px rgba(16,185,129,.18)}
      .title{margin:0;font-size:22px;font-weight:900}
      .toolbar{display:flex;gap:10px;align-items:center;margin:10px 0 4px}
      .search{
        flex:1;height:42px;padding:0 12px;border-radius:12px;border:1px solid #e6f0ea;
      }
      .who{color:#334155}
      .muted{color:#6b7280}
      .error{color:#dc2626}
      .empty{
        display:grid;place-items:center;gap:10px;padding:30px;color:#64748b;
      }
      .empty img{width:120px;height:auto;opacity:.8}
      .grid{
        display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:12px;margin-top:8px;
      }
      .order{
        background:#fff;border:1px solid #eef2f7;border-radius:14px;padding:12px;
        box-shadow:0 6px 18px rgba(0,0,0,.04);display:grid;gap:8px;
      }
      .order-head{display:flex;justify-content:space-between;align-items:center}
      .order .code{font-weight:900}
      .order .time{color:#64748b;font-size:12px}
      .items{display:flex;flex-direction:column;gap:8px}
      .item{display:grid;grid-template-columns:64px 1fr auto;gap:10px;align-items:center}
      .item img{width:64px;height:48px;object-fit:cover;border-radius:10px;box-shadow:0 2px 6px rgba(0,0,0,.06)}
      .item .name{font-weight:800}
      .item .sub{font-size:12px;color:#64748b}
      .sum{font-weight:900}
      .more{font-size:12px;color:#64748b}
      .foot{display:flex;justify-content:space-between;align-items:center;margin-top:6px}
      .total{color:#0f172a}
      .actions{display:flex;gap:8px}
      .btn{padding:9px 12px;border-radius:12px;font-weight:900;cursor:pointer;transition:transform .2s var(--e),box-shadow .2s var(--e)}
      .btn.solid{border:1px solid #10b981;background:#10b981;color:#fff}
      .btn.solid:hover{transform:translateY(-1px);box-shadow:0 8px 18px rgba(16,185,129,.25)}
      .btn.outline{border:1px solid #10b981;background:#fff;color:#065f46}
      .btn.outline:hover{background:#ecfdf5}
    `}</style>
  );
}
