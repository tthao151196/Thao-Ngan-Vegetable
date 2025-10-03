// // src/pages/Customers/Cart.jsx
// import { useNavigate } from "react-router-dom";

// export default function Cart({ cart, setCart }) {
//   const navigate = useNavigate();

//   const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

//   // ✅ Tăng số lượng
//   const increaseQty = (id) => {
//     setCart((prev) =>
//       prev.map((item) =>
//         item.id === id ? { ...item, qty: item.qty + 1 } : item
//       )
//     );
//   };

//   // ✅ Giảm số lượng (không nhỏ hơn 1)
//   const decreaseQty = (id) => {
//     setCart((prev) =>
//       prev.map((item) =>
//         item.id === id && item.qty > 1
//           ? { ...item, qty: item.qty - 1 }
//           : item
//       )
//     );
//   };

//   // ✅ Xoá 1 sản phẩm
//   const removeItem = (id) => {
//     setCart((prev) => prev.filter((item) => item.id !== id));
//   };

//   // ✅ Xoá toàn bộ giỏ
//   const clearCart = () => {
//     if (window.confirm("Bạn có chắc muốn xoá toàn bộ giỏ hàng?")) {
//       setCart([]);
//     }
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>🛒 Giỏ hàng</h2>

//       {cart.length === 0 ? (
//         <p>Giỏ hàng trống</p>
//       ) : (
//         <div>
//           <table
//             style={{
//               width: "100%",
//               borderCollapse: "collapse",
//               marginTop: 16,
//             }}
//           >
//             <thead>
//               <tr style={{ borderBottom: "2px solid #ccc" }}>
//                 <th style={{ textAlign: "left", padding: 8 }}>Sản phẩm</th>
//                 <th style={{ textAlign: "center", padding: 8 }}>Ảnh</th>
//                 <th style={{ textAlign: "center", padding: 8 }}>Giá</th>
//                 <th style={{ textAlign: "center", padding: 8 }}>Số lượng</th>
//                 <th style={{ textAlign: "center", padding: 8 }}>Thành tiền</th>
//                 <th style={{ textAlign: "center", padding: 8 }}>Hành động</th>
//               </tr>
//             </thead>
//             <tbody>
//               {cart.map((item) => (
//                 <tr key={item.id} style={{ borderBottom: "1px solid #eee" }}>
//                   <td style={{ padding: 8 }}>{item.name}</td>
//                   <td style={{ padding: 8, textAlign: "center" }}>
//                     <img
//                       src={
//                         item.thumbnail_url ||
//                         item.thumbnail ||
//                         "https://placehold.co/80x60"
//                       }
//                       alt={item.name}
//                       style={{
//                         width: 80,
//                         height: 60,
//                         objectFit: "cover",
//                         borderRadius: 6,
//                       }}
//                       onError={(e) =>
//                         (e.currentTarget.src = "https://placehold.co/80x60")
//                       }
//                     />
//                   </td>
//                   <td style={{ padding: 8, textAlign: "center" }}>
//                     {item.price.toLocaleString()} đ
//                   </td>
//                   <td style={{ padding: 8, textAlign: "center" }}>
//                     <button
//                       onClick={() => decreaseQty(item.id)}
//                       style={{
//                         padding: "4px 8px",
//                         marginRight: 6,
//                         cursor: "pointer",
//                       }}
//                     >
//                       -
//                     </button>
//                     {item.qty}
//                     <button
//                       onClick={() => increaseQty(item.id)}
//                       style={{
//                         padding: "4px 8px",
//                         marginLeft: 6,
//                         cursor: "pointer",
//                       }}
//                     >
//                       +
//                     </button>
//                   </td>
//                   <td
//                     style={{
//                       padding: 8,
//                       textAlign: "center",
//                       fontWeight: 600,
//                       color: "#d32f2f",
//                     }}
//                   >
//                     {(item.price * item.qty).toLocaleString()} đ
//                   </td>
//                   <td style={{ padding: 8, textAlign: "center" }}>
//                     <button
//                       onClick={() => removeItem(item.id)}
//                       style={{
//                         background: "#d32f2f",
//                         color: "#fff",
//                         border: 0,
//                         padding: "6px 10px",
//                         borderRadius: 6,
//                         cursor: "pointer",
//                       }}
//                     >
//                       Xoá
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {/* Tổng cộng + hành động */}
//           <div
//             style={{
//               marginTop: 20,
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//             }}
//           >
//             <button
//               onClick={clearCart}
//               style={{
//                 background: "#999",
//                 color: "#fff",
//                 border: 0,
//                 padding: "8px 12px",
//                 borderRadius: 6,
//                 cursor: "pointer",
//               }}
//             >
//               🗑 Xoá toàn bộ
//             </button>

//             <h3>
//               Tổng cộng:{" "}
//               <span style={{ color: "#d32f2f" }}>
//                 {total.toLocaleString()} đ
//               </span>
//             </h3>

//             {/* ✅ Chuyển qua trang Checkout và truyền cart */}
//             <button
//               style={{
//                 background: "green",
//                 color: "#fff",
//                 padding: "8px 16px",
//                 border: 0,
//                 borderRadius: 8,
//                 cursor: "pointer",
//               }}
//               onClick={() => navigate("/checkout", { state: { cart } })}
//             >
//               Thanh toán
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


// src/pages/Customers/Cart.jsx
import { useNavigate } from "react-router-dom";

export default function Cart({ cart, setCart }) {
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  // ✅ Tăng số lượng
  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  // ✅ Giảm số lượng (không nhỏ hơn 1)
  const decreaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.qty > 1
          ? { ...item, qty: item.qty - 1 }
          : item
      )
    );
  };

  // ✅ Xoá 1 sản phẩm
  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // ✅ Xoá toàn bộ giỏ
  const clearCart = () => {
    if (window.confirm("Bạn có chắc muốn xoá toàn bộ giỏ hàng?")) {
      setCart([]);
    }
  };

  return (
    <div className="cart-page" style={{ padding: 20 }}>
      <h2 style={{ display: "flex", alignItems: "center", gap: 8 }}>🛒 Giỏ hàng</h2>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Giỏ hàng trống</p>
          <button className="btn go-shopping" onClick={() => navigate("/products")}>
            ✨ Mua sắm ngay
          </button>
        </div>
      ) : (
        <div>
          <div className="table-wrap">
            <table
              className="nice-table"
              style={{
                width: "100%",
                borderCollapse: "separate",
                borderSpacing: 0,
                marginTop: 16,
                background: "#fff",
                borderRadius: 12,
                overflow: "hidden",
              }}
            >
              <thead>
                <tr className="thead-row">
                  <th style={{ textAlign: "left", padding: 12 }}>Sản phẩm</th>
                  <th style={{ textAlign: "center", padding: 12 }}>Ảnh</th>
                  <th style={{ textAlign: "center", padding: 12 }}>Giá</th>
                  <th style={{ textAlign: "center", padding: 12 }}>Số lượng</th>
                  <th style={{ textAlign: "center", padding: 12 }}>Thành tiền</th>
                  <th style={{ textAlign: "center", padding: 12 }}>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id} className="tbody-row" style={{ borderBottom: "1px solid #f0f0f0" }}>
                    <td style={{ padding: 12, fontWeight: 600 }}>{item.name}</td>
                    <td style={{ padding: 12, textAlign: "center" }}>
                      <div className="product-thumb">
                        <img
                          src={item.thumbnail_url || item.thumbnail || "https://placehold.co/80x60"}
                          alt={item.name}
                          style={{ width: 80, height: 60, objectFit: "cover", borderRadius: 8 }}
                          onError={(e) => (e.currentTarget.src = "https://placehold.co/80x60")}
                        />
                      </div>
                    </td>
                    <td style={{ padding: 12, textAlign: "center" }}>
                      {item.price.toLocaleString()} đ
                    </td>
                    <td style={{ padding: 12, textAlign: "center" }}>
                      <div className="qty-wrap">
                        <button
                          className="qty-btn minus"
                          aria-label="Giảm số lượng"
                          onClick={() => decreaseQty(item.id)}
                          disabled={item.qty <= 1}
                        >
                          <span className="ic" aria-hidden="true" />
                        </button>
                        <span className="qty-value">{item.qty}</span>
                        <button
                          className="qty-btn plus"
                          aria-label="Tăng số lượng"
                          onClick={() => increaseQty(item.id)}
                        >
                          <span className="ic" aria-hidden="true" />
                        </button>
                      </div>
                    </td>
                    <td style={{ padding: 12, textAlign: "center", fontWeight: 700, color: "#d32f2f" }}>
                      {(item.price * item.qty).toLocaleString()} đ
                    </td>
                    <td style={{ padding: 12, textAlign: "center" }}>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="btn btn-remove"
                        style={{
                          background: "#e53935",
                          color: "#fff",
                          border: 0,
                          padding: "8px 12px",
                          borderRadius: 10,
                          cursor: "pointer",
                          fontWeight: 700,
                        }}
                      >
                        Xoá
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Tổng cộng + hành động */}
          <div
            className="summary-bar"
            style={{
              marginTop: 20,
              display: "flex",
              gap: 12,
              justifyContent: "space-between",
              alignItems: "center",
              background: "#fff",
              borderRadius: 12,
              padding: "12px 16px",
              boxShadow: "0 8px 20px rgba(0,0,0,.08)",
            }}
          >
            <button
              onClick={clearCart}
              className="btn btn-clear"
              style={{
                background: "#95a5a6",
                color: "#fff",
                border: 0,
                padding: "10px 14px",
                borderRadius: 10,
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              🗑 Xoá toàn bộ
            </button>

            <h3 style={{ margin: 0, fontWeight: 800 }}>
              Tổng cộng: <span style={{ color: "#d32f2f" }}>{total.toLocaleString()} đ</span>
            </h3>

            <button
              className="btn btn-checkout"
              style={{
                background: "linear-gradient(90deg,#00c853,#00e676)",
                color: "#fff",
                padding: "10px 18px",
                border: 0,
                borderRadius: 12,
                cursor: "pointer",
                fontWeight: 800,
                letterSpacing: 0.2,
              }}
              onClick={() => navigate("/checkout", { state: { cart } })}
            >
              Thanh toán
            </button>
          </div>
        </div>
      )}

      {/* CSS tăng thẩm mỹ & biểu tượng – / + bằng CSS */}
      <style>{`
        :root { --e: cubic-bezier(.2,.8,.2,1); --green:#00e676; --green2:#00c853; }

        .empty-cart{
          margin-top: 16px; background:#fff; border-radius:12px; padding:24px; text-align:center;
          box-shadow:0 8px 20px rgba(0,0,0,.06);
        }
        .empty-cart .go-shopping{
          margin-top:10px; background:linear-gradient(90deg,var(--green2),var(--green));
          color:#fff; border:0; border-radius:12px; padding:10px 16px; font-weight:700; cursor:pointer;
          transition:transform .25s var(--e), box-shadow .25s var(--e);
        }
        .empty-cart .go-shopping:hover{ transform:translateY(-2px); box-shadow:0 10px 22px rgba(0,230,118,.35); }

        .table-wrap{ width:100%; overflow-x:auto; }
        .nice-table thead .thead-row th{
          background:linear-gradient(90deg,#e8f5e9,#e0f7fa);
          color:#2e7d32; font-weight:800; border-bottom:2px solid #c8e6c9; white-space:nowrap;
        }
        .nice-table tbody .tbody-row{ transition:background .2s var(--e), transform .2s var(--e), box-shadow .2s var(--e); }
        .nice-table tbody .tbody-row:hover{
          background:#f9fffb; transform:translateY(-2px); box-shadow:0 6px 16px rgba(0,0,0,.06);
        }

        .product-thumb img{ transition:transform .35s var(--e), box-shadow .35s var(--e); }
        .nice-table tbody .tbody-row:hover .product-thumb img{ transform:scale(1.04); box-shadow:0 6px 14px rgba(0,0,0,.12); }

        /* ===== Quantity buttons ===== */
        .qty-wrap{ display:inline-flex; align-items:center; gap:10px; }
        .qty-value{ min-width:28px; display:inline-block; font-weight:800; }

        .qty-btn{
          width:36px; height:36px; border-radius:12px; border:1px solid #c8e6c9;
          background:#f1f8e9; cursor:pointer; display:inline-flex; align-items:center; justify-content:center;
          transition:transform .2s var(--e), box-shadow .2s var(--e), background .2s var(--e), border-color .2s var(--e), opacity .2s var(--e);
          color:#2e7d32; position:relative;
        }
        .qty-btn:hover{ transform:translateY(-1px); box-shadow:0 8px 16px rgba(76,175,80,.22); background:#e8f5e9; }
        .qty-btn:active{ transform:translateY(0); box-shadow:0 4px 10px rgba(76,175,80,.2); }

        /* Vẽ biểu tượng – / + bằng CSS, luôn sắc nét */
        .qty-btn .ic{ width:16px; height:16px; position:relative; display:block; }
        .qty-btn.minus .ic::before,
        .qty-btn.plus  .ic::before{
          content:""; position:absolute; left:0; right:0; top:50%; height:2px; background:currentColor;
          transform:translateY(-50%); border-radius:2px;
        }
        .qty-btn.plus .ic::after{
          content:""; position:absolute; top:0; bottom:0; left:50%; width:2px; background:currentColor;
          transform:translateX(-50%); border-radius:2px;
        }

        /* Trạng thái disabled cho nút – khi qty=1 */
        .qty-btn:disabled{
          opacity:.5; cursor:not-allowed; transform:none; box-shadow:none;
        }

        /* Buttons chung */
        .btn{ transition:transform .25s var(--e), box-shadow .25s var(--e), opacity .25s var(--e); }
        .btn-remove:hover{ box-shadow:0 10px 20px rgba(229,57,53,.35); transform:translateY(-2px); }
        .btn-clear:hover{ filter:brightness(1.05); box-shadow:0 8px 18px rgba(149,165,166,.35); transform:translateY(-2px); }
        .btn-checkout:hover{ box-shadow:0 12px 26px rgba(0,230,118,.35); transform:translateY(-2px); }

        .summary-bar{ border:1px solid rgba(0,230,118,.18); }

        @media (max-width:640px){
          .summary-bar{ flex-direction:column; align-items:stretch; gap:10px; }
          .btn-checkout, .btn-clear{ width:100%; }
        }

        @media (prefers-reduced-motion: reduce){
          .tbody-row, .product-thumb img, .btn, .qty-btn{ transition:none !important; }
        }
      `}</style>
    </div>
  );
}
