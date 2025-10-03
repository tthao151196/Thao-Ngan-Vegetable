// import { useEffect, useState } from "react";
// import { useParams, Link, useNavigate } from "react-router-dom";

// const API_BASE = "http://127.0.0.1:8000";
// const PLACEHOLDER = "https://placehold.co/400x300?text=No+Image";
// const VND = new Intl.NumberFormat("vi-VN");

// export default function ProductDetail({ addToCart }) {
//   const { id } = useParams();
//   const navigate = useNavigate(); // ✅ hook phải ở trong component

//   const [product, setProduct] = useState(null);
//   const [related, setRelated] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [err, setErr] = useState("");

//   useEffect(() => {
//     const ac = new AbortController();
//     (async () => {
//       try {
//         setLoading(true);
//         setErr("");

//         // 1) Chi tiết sản phẩm
//         const res = await fetch(`${API_BASE}/products/${id}`, { signal: ac.signal });
//         if (!res.ok) throw new Error(`HTTP ${res.status}`);
//         const data = await res.json();
//         setProduct(data);

//         // 2) Sản phẩm liên quan
//         if (data?.category_id) {
//           const r = await fetch(`${API_BASE}/categories/${data.category_id}/products`, { signal: ac.signal });
//           if (r.ok) {
//             const all = await r.json();
//             const list = (Array.isArray(all) ? all : all?.data ?? [])
//               .filter(x => x.id !== Number(id))
//               .slice(0, 8);
//             setRelated(list);
//           }
//         }
//       } catch (e) {
//         if (e.name !== "AbortError") setErr("Không tải được sản phẩm.");
//       } finally {
//         setLoading(false);
//       }
//     })();
//     return () => ac.abort();
//   }, [id]);

//   if (loading) return <p style={{ padding: 20 }}>Đang tải...</p>;
//   if (err) return <p style={{ padding: 20, color: "red" }}>{err}</p>;
//   if (!product) return <p style={{ padding: 20 }}>Sản phẩm không tồn tại.</p>;

//   const price = Number(product.price ?? 0);
//   const imgSrc = product.thumbnail_url || product.thumbnail || PLACEHOLDER;

//   const handleAddToCart = () => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       alert("⚠️ Bạn cần đăng nhập trước khi thêm sản phẩm!");
//       // chuyển tới login và nhớ đường dẫn hiện tại (tuỳ chọn)
//       navigate("/login", { state: { from: `/products/${id}` } });
//       return;
//     }
//     if (typeof addToCart === "function") {
//       addToCart(product);
//       alert("🎉 Sản phẩm đã được thêm vào giỏ hàng!");
//     }
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <Link to="/products" style={{ color: "#2e7d32" }}>← Quay lại danh sách</Link>

//       <div style={{ display: "flex", gap: 24, marginTop: 20, flexWrap: "wrap" }}>
//         {/* Ảnh */}
//         <div style={{ flex: "1 1 300px" }}>
//           <img
//             src={imgSrc}
//             alt={product.name}
//             style={{ width: 400, maxWidth: "100%", borderRadius: 12, objectFit: "cover" }}
//             onError={(e) => (e.currentTarget.src = PLACEHOLDER)}
//           />
// </div>

//         {/* Thông tin */}
//         <div style={{ flex: "2 1 400px" }}>
//           <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 12, color: "#388e3c" }}>{product.name}</h2>
//           <p style={{ fontSize: 16, marginBottom: 8, color: "#666" }}>
//             {product.brand_name ?? "Chưa cập nhật"}
//           </p>
//           <div style={{ fontSize: 22, fontWeight: 700, color: "#d32f2f", marginBottom: 16 }}>
//             {price > 0 ? `${VND.format(price)} đ` : "Liên hệ"}
//           </div>

//           <button
//             onClick={handleAddToCart}
//             style={{
//               background: "#388e3c",
//               color: "#fff",
//               border: 0,
//               padding: "10px 16px",
//               borderRadius: 8,
//               cursor: "pointer",
//               fontSize: 16
//             }}
//           >
//             🛒 Thêm vào giỏ
//           </button>
//         </div>
//       </div>

//       {/* Mô tả chi tiết */}
//       <div style={{ marginTop: 30 }}>
//         <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 10 }}>Chi tiết sản phẩm</h3>
//         <p style={{ whiteSpace: "pre-line", color: "#444" }}>
//           {product.description || "Chưa có mô tả."}
//         </p>
//       </div>

//       {/* Sản phẩm liên quan */}
//       {!!related.length && (
//         <div style={{ marginTop: 40 }}>
//           <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16, color: "#388e3c" }}>
//             Sản phẩm liên quan
//           </h3>
//           <div
//             style={{
//               display: "grid",
//               gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
//               gap: 20
//             }}
//           >
//             {related.map((p) => {
//               const rImg = p.thumbnail_url || p.thumbnail || PLACEHOLDER;
//               const rPrice = Number(p.price ?? 0);
//               return (
//                 <Link key={p.id} to={`/products/${p.id}`} style={{ textDecoration: "none", color: "inherit" }}>
//                   <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 2px 8px #e0f2f1", padding: 12 }}>
//                     <div style={{ height: 130, borderRadius: 8, overflow: "hidden", background: "#f1f8e9", marginBottom: 8 }}>
//                       <img
//                         src={rImg}
//                         alt={p.name}
//                         style={{ width: "100%", height: "100%", objectFit: "cover" }}
//                         onError={(e) => (e.currentTarget.src = PLACEHOLDER)}
//                         loading="lazy"
//                       />
//                     </div>
//                     <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>{p.name}</div>
//                     <div style={{ color: "#388e3c", fontWeight: 700 }}>
//                       {rPrice > 0 ? `${VND.format(rPrice)} đ` : "Liên hệ"}
//                     </div>
//                   </div>
//                 </Link>
//               );
//             })}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }





// src/pages/Customers/ProductDetail.jsx
import { useEffect, useMemo, useState } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";

const API = "http://127.0.0.1:8000/api";       // các endpoint theo routes/api.php
const ALT = "http://127.0.0.1:8000";           // fallback nếu bạn có /products không prefix /api
const PLACEHOLDER = "https://placehold.co/400x300?text=No+Image";
const VND = new Intl.NumberFormat("vi-VN");

export default function ProductDetail({ addToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // Reviews
  const [reviews, setReviews] = useState([]);
  const [canReview, setCanReview] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [rev, setRev] = useState({ rating: 5, content: "" });

  // ---------- Helpers ----------
  const getThumb = (p) =>
    p?.thumbnail_url || p?.thumbnail || p?.image_url || PLACEHOLDER;

  const priceRoot = (p) => Number(p?.price_root ?? p?.price ?? 0);
  const priceSale = (p) => Number(p?.price_sale ?? 0);

  const discount = useMemo(() => {
    const r = priceRoot(product);
    const s = priceSale(product);
    if (r > 0 && s > 0 && s < r) {
      return Math.round(((r - s) / r) * 100);
    }
    return 0;
  }, [product]);

  const pushToCart = (item) => {
    if (addToCart) return addToCart(item); // dùng hàm có sẵn nếu FE đã truyền
    // fallback: localStorage cart
    const load = () => {
      try { return JSON.parse(localStorage.getItem("cart") || "[]"); } catch { return []; }
    };
    const save = (v) => localStorage.setItem("cart", JSON.stringify(v));
    const cart = load();
    const idx = cart.findIndex((x) => x.id === item.id);
    if (idx >= 0) cart[idx].qty += item.qty;
    else cart.push(item);
    save(cart);
    alert("🛒 Đã thêm vào giỏ!");
    navigate("/cart");
  };

  // ---------- Fetch product (+fallback nếu BE không để /api) ----------
  useEffect(() => {
    const ac = new AbortController();
    (async () => {
      try {
        setLoading(true); setErr("");

        // 1) thử /api
        let p = null;
        try {
          const r = await fetch(`${API}/products/${id}`, { signal: ac.signal });
          if (r.ok) {
            const d = await r.json();
            p = d.data || d.product || d;
          }
        } catch {}

        // 2) fallback /products
        if (!p) {
          const r2 = await fetch(`${ALT}/products/${id}`, { signal: ac.signal });
          if (!r2.ok) throw new Error(`HTTP ${r2.status}`);
          const d2 = await r2.json();
          p = d2.data || d2.product || d2;
        }

        setProduct(p);

        // related (nếu có API)
        try {
          const rc = await fetch(`${API}/categories/${p.category_id}/products`, { signal: ac.signal });
          if (rc.ok) {
            const dd = await rc.json();
            setRelated(Array.isArray(dd) ? dd : dd.data ?? []);
          }
        } catch {
          setRelated([]);
        }
      } catch (e) {
        console.error(e);
        setErr("Không tải được sản phẩm.");
      } finally {
        setLoading(false);
      }
    })();
    return () => ac.abort();
  }, [id]);

  // ---------- Fetch reviews + quyền review ----------
  useEffect(() => {
    const ac = new AbortController();
    // list
    fetch(`${API}/products/${id}/reviews`, { signal: ac.signal })
      .then((r) => r.json())
      .then((d) => setReviews(Array.isArray(d) ? d : d.data ?? []))
      .catch(() => setReviews([]));

    // can review
    if (token) {
      fetch(`${API}/products/${id}/can-review`, {
        headers: { Authorization: `Bearer ${token}` },
        signal: ac.signal,
      })
        .then((r) => (r.ok ? r.json() : Promise.reject()))
        .then((d) => setCanReview(!!(d.can || d.allowed || d === true)))
        .catch(() => setCanReview(false));
    } else setCanReview(false);

    // mở form nếu có ?review=1
    if (new URLSearchParams(location.search).get("review")) setShowForm(true);

    return () => ac.abort();
  }, [id, token, location.search]);

  // ---------- Submit review ----------
  const submitReview = async (e) => {
    e.preventDefault();
    if (!token) {
      alert("Vui lòng đăng nhập để đánh giá.");
      return;
    }
    try {
      const res = await fetch(`${API}/products/${id}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          rating: Number(rev.rating), // 1..5
          content: rev.content.trim(),
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      // reload list
      const lst = await fetch(`${API}/products/${id}/reviews`).then((r) => r.json());
      setReviews(Array.isArray(lst) ? lst : lst.data ?? []);
      setShowForm(false);
      setRev({ rating: 5, content: "" });
      alert("Đã gửi đánh giá. Cảm ơn bạn!");
    } catch (err) {
      console.error(err);
      alert("Gửi đánh giá thất bại.");
    }
  };

  if (loading) return <div style={{ padding: 16 }}>Đang tải...</div>;
  if (err) return <div style={{ padding: 16, color: "#d32f2f" }}>{err}</div>;
  if (!product) return <div style={{ padding: 16 }}>Không tìm thấy sản phẩm.</div>;

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: 16 }}>
      {/* Product header */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(280px, 480px) 1fr",
          gap: 20,
          background: "#fff",
          borderRadius: 16,
          padding: 16,
          boxShadow: "0 4px 16px rgba(0,0,0,.06)",
          border: "1px solid #f1f5f9",
        }}
      >
        <div>
          <img
            src={getThumb(product)}
            onError={(e) => (e.currentTarget.src = PLACEHOLDER)}
            alt={product?.name}
            style={{ width: "100%", height: 380, objectFit: "cover", borderRadius: 14 }}
          />
        </div>

        <div>
          <h1 style={{ fontSize: 24, fontWeight: 900, margin: "4px 0 8px" }}>
            {product?.name}
          </h1>

          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <div style={{ fontSize: 20, fontWeight: 900, color: "#0f172a" }}>
              {priceSale(product) > 0 ? (
                <>₫{VND.format(priceSale(product))}</>
              ) : (
                <>₫{VND.format(priceRoot(product))}</>
              )}
            </div>
            {priceSale(product) > 0 && (
              <>
                <div style={{ color: "#64748b", textDecoration: "line-through" }}>
                  ₫{VND.format(priceRoot(product))}
                </div>
                {discount > 0 && (
                  <span
                    style={{
                      background: "#fee2e2",
                      color: "#b91c1c",
                      fontWeight: 800,
                      padding: "2px 8px",
                      borderRadius: 999,
                      fontSize: 12,
                    }}
                  >
                    -{discount}%
                  </span>
                )}
              </>
            )}
          </div>

          <p style={{ color: "#334155", lineHeight: 1.6 }}>
            {product?.description || "—"}
          </p>

          <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
            <button
              onClick={() =>
                pushToCart({
                  id: product.id,
                  name: product.name,
                  price: priceSale(product) > 0 ? priceSale(product) : priceRoot(product),
                  qty: 1,
                  thumbnail_url: getThumb(product),
                })
              }
              style={{
                padding: "10px 14px",
                borderRadius: 10,
                border: 0,
                background: "linear-gradient(135deg,#34d399,#10b981)",
                color: "#fff",
                fontWeight: 900,
                boxShadow: "0 8px 16px rgba(16,185,129,.25)",
                cursor: "pointer",
              }}
            >
              Thêm vào giỏ
            </button>
            <Link
              to="/"
              style={{
                padding: "10px 14px",
                borderRadius: 10,
                border: "1px solid #e2e8f0",
                background: "#fff",
                fontWeight: 900,
                textDecoration: "none",
                color: "#0f172a",
              }}
            >
              ← Tiếp tục mua
            </Link>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div style={{ marginTop: 18 }}>
          <h3 style={{ fontWeight: 900, marginBottom: 8 }}>Sản phẩm liên quan</h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px,1fr))",
              gap: 12,
            }}
          >
            {related.slice(0, 6).map((p) => (
              <Link
                key={p.id}
                to={`/products/${p.id}`}
                style={{
                  display: "block",
                  background: "#fff",
                  border: "1px solid #f1f5f9",
                  borderRadius: 12,
                  padding: 10,
                  textDecoration: "none",
                  color: "#0f172a",
                }}
              >
                <img
                  src={getThumb(p)}
                  onError={(e) => (e.currentTarget.src = PLACEHOLDER)}
                  alt={p.name}
                  style={{ width: "100%", height: 140, objectFit: "cover", borderRadius: 10 }}
                />
                <div style={{ fontWeight: 800, marginTop: 6, minHeight: 44 }}>{p.name}</div>
                <div style={{ color: "#0f172a", fontWeight: 900 }}>
                  ₫{VND.format(Number(p.price_sale ?? p.price_root ?? p.price ?? 0))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Reviews */}
      <section style={{ marginTop: 22 }}>
        <h3 style={{ fontSize: 18, fontWeight: 900, marginBottom: 8 }}>Đánh giá</h3>

        {canReview && !showForm && (
          <button
            onClick={() => setShowForm(true)}
            style={{
              padding: "8px 12px",
              borderRadius: 10,
              border: "1px solid #cfeee3",
              background: "#f6fffb",
              fontWeight: 800,
              cursor: "pointer",
            }}
          >
            Viết đánh giá
          </button>
        )}

        {showForm && (
          <form
            onSubmit={submitReview}
            style={{
              marginTop: 10,
              padding: 12,
              border: "1px solid #e5e7eb",
              borderRadius: 12,
              background: "#fff",
            }}
          >
            <label style={{ fontWeight: 800, display: "block", marginBottom: 6 }}>
              Chấm sao
            </label>
            <select
              value={rev.rating}
              onChange={(e) => setRev((s) => ({ ...s, rating: e.target.value }))}
              style={{ padding: "6px 10px", borderRadius: 8, border: "1px solid #cbd5e1" }}
            >
              <option value={5}>★★★★★ (5)</option>
              <option value={4}>★★★★☆ (4)</option>
              <option value={3}>★★★☆☆ (3)</option>
              <option value={2}>★★☆☆☆ (2)</option>
              <option value={1}>★☆☆☆☆ (1)</option>
            </select>

            <label style={{ fontWeight: 800, display: "block", margin: "10px 0 6px" }}>
              Nội dung
            </label>
            <textarea
              rows={4}
              value={rev.content}
              onChange={(e) => setRev((s) => ({ ...s, content: e.target.value }))}
              placeholder="Chia sẻ trải nghiệm của bạn…"
              style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid #cbd5e1" }}
            />

            <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
              <button
                type="submit"
                style={{
                  padding: "8px 12px",
                  borderRadius: 10,
                  border: 0,
                  background: "#0ea5e9",
                  color: "#fff",
                  fontWeight: 900,
                  cursor: "pointer",
                }}
              >
                Gửi đánh giá
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                style={{
                  padding: "8px 12px",
                  borderRadius: 10,
                  border: "1px solid #e2e8f0",
                  background: "#fff",
                  fontWeight: 800,
                  cursor: "pointer",
                }}
              >
                Hủy
              </button>
            </div>
          </form>
        )}

        <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
          {reviews.length === 0 && (
            <div style={{ color: "#64748b" }}>Chưa có đánh giá.</div>
          )}
          {reviews.map((r, i) => (
            <div
              key={r.id || i}
              style={{
                background: "#fff",
                border: "1px solid #f1f5f9",
                borderRadius: 12,
                padding: 10,
              }}
            >
              <div style={{ fontWeight: 900 }}>
                {r.user?.name || r.author_name || "Ẩn danh"}{" "}
                <span style={{ color: "#f59e0b" }}>
                  {"★".repeat(r.rating || 0)}
                  {"☆".repeat(Math.max(0, 5 - (r.rating || 0)))}
                </span>
              </div>
              <div style={{ color: "#334155", marginTop: 4 }}>
                {r.content || r.comment}
              </div>
              {r.created_at && (
                <div style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>
                  {new Date(r.created_at).toLocaleString("vi-VN")}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
