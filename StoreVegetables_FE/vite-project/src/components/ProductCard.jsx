// import { Link } from "react-router-dom";

// const PLACEHOLDER = "https://placehold.co/300x200?text=No+Image";

// export default function ProductCard({ p }) {
//   const price = Number(p.price) || 0;
//   const imgSrc = p.thumbnail_url || p.thumbnail || PLACEHOLDER;

//   return (
//     <div
//       className="product-card"
//       style={{
//         background: "#fff",
//         borderRadius: 12,
//         boxShadow: "0 2px 8px #e0f2f1",
//         padding: 16,
//         width: 220,
//         margin: 8,
//         textAlign: "center",
//       }}
//     >
//       {/* ✅ Link sang chi tiết sản phẩm */}
//       <Link
//         to={`/products/${p.id}`}
//         style={{ textDecoration: "none", color: "inherit" }}
//       >
//         <div className="product-image" style={{ marginBottom: 10 }}>
//           <img
//             src={imgSrc}
//             alt={p.name}
//             style={{
//               width: "100%",
//               height: 120,
//               objectFit: "cover",
//               borderRadius: 8,
//             }}
//             onError={(e) => {
//               e.currentTarget.src = PLACEHOLDER;
//             }}
//           />
//         </div>

//         <div className="product-info">
//           <div
//             className="name"
//             style={{ fontWeight: "bold", fontSize: 16 }}
//           >
//             {p.name}
//           </div>
//           <div className="brand" style={{ color: "#388e3c", fontSize: 13 }}>
//             {p.brand_name ? `${p.brand_name}` : "Farm Local"}
//           </div>



          
//           <div
//             className="price"
//             style={{
//               color: "#43a047",
//               fontWeight: "bold",
//               marginTop: 4,
//             }}
//           >
//             {price.toLocaleString()} đ
//           </div>
//         </div>
//       </Link>
//     </div>
//   );
// }



import { Link } from "react-router-dom";

const PLACEHOLDER = "https://placehold.co/300x200?text=No+Image";

export default function ProductCard({ p }) {
  const priceRoot = Number(p.price_root) || Number(p.price) || 0; // ✅ giá gốc
  const priceSale = Number(p.price_sale) || 0; // ✅ giá sale
  const imgSrc = p.thumbnail_url || p.thumbnail || PLACEHOLDER;

  // ✅ Tính % giảm
  let discount = 0;
  if (priceRoot > 0 && priceSale > 0 && priceSale < priceRoot) {
    discount = Math.round(((priceRoot - priceSale) / priceRoot) * 100);
  }

  return (
    <div
      className="product-card transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl"
      style={{
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 2px 8px #e0f2f1",
        padding: 16,
        width: 220,
        margin: 8,
        textAlign: "center",
        position: "relative",
        cursor: "pointer",
      }}
    >
      {/* ✅ Link sang chi tiết sản phẩm */}
      <Link
        to={`/products/${p.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div
          className="product-image relative overflow-hidden"
          style={{
            marginBottom: 10,
            borderRadius: 8,
            height: 180, // ✅ fix chiều cao đồng đều
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#fafafa",
          }}
        >
          <img
            src={imgSrc}
            alt={p.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover", // ✅ ảnh luôn lấp đầy khung
              borderRadius: 8,
            }}
            onError={(e) => {
              e.currentTarget.src = PLACEHOLDER;
            }}
            className="transition-transform duration-500 hover:scale-110 hover:animate-wiggle"
          />

          {/* ✅ Badge giảm giá */}
          {discount > 0 && (
            <div
              style={{
                position: "absolute",
                top: 8,
                right: 8,
                background: "#d32f2f",
                color: "#fff",
                fontSize: 12,
                fontWeight: 700,
                padding: "4px 8px",
                borderRadius: 6,
                boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
              }}
            >
              -{discount}%
            </div>
          )}
        </div>

        <div className="product-info">
          <div
            className="name"
            style={{ fontWeight: "bold", fontSize: 16 }}
          >
            {p.name}
          </div>
          <div className="brand" style={{ color: "#388e3c", fontSize: 13 }}>
            {p.brand_name ? `${p.brand_name}` : "Farm Local"}
          </div>

          {/* ✅ Hiển thị giá sale + gốc */}
          {priceSale && priceSale < priceRoot ? (
            <div className="price" style={{ marginTop: 6 }}>
              <span
                style={{
                  color: "#d32f2f",
                  fontWeight: "bold",
                  fontSize: 16,
                }}
              >
                {priceSale.toLocaleString()} đ
              </span>
              <span
                style={{
                  marginLeft: 6,
                  textDecoration: "line-through",
                  color: "#888",
                  fontSize: 14,
                }}
              >
                {priceRoot.toLocaleString()} đ
              </span>
            </div>
          ) : (
            <div
              className="price"
              style={{
                color: "#43a047",
                fontWeight: "bold",
                marginTop: 6,
              }}
            >
              {priceRoot.toLocaleString()} đ
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}

/* 👉 Thêm CSS animation (có thể bỏ vào index.css hoặc global.css) */
<style>
{`
@keyframes wiggle {
  0%, 100% { transform: rotate(-2deg) scale(1.05); }
  50% { transform: rotate(2deg) scale(1.05); }
}
.hover\\:animate-wiggle:hover {
  animation: wiggle 0.4s ease-in-out;
}
`}
</style>



// import { Link } from "react-router-dom";

// const PLACEHOLDER = "https://placehold.co/300x200?text=No+Image";

// export default function ProductCard({ p }) {
//   const priceRoot = Number(p.price_root) || Number(p.price) || 0;
//   const priceSale = Number(p.price_sale) || 0;
//   const imgSrc = p.thumbnail_url || p.thumbnail || PLACEHOLDER;

//   let discount = 0;
//   if (priceRoot > 0 && priceSale > 0 && priceSale < priceRoot) {
//     discount = Math.round(((priceRoot - priceSale) / priceRoot) * 100);
//   }

//   return (
//     <div
//       className="transition transform hover:-translate-y-1 hover:shadow-xl"
//       style={{
//         background: "#fff",
//         borderRadius: 16,
//         boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
//         padding: 12,
//         width: 240,
//         margin: "12px auto",
//         textAlign: "center",
//         position: "relative",
//       }}
//     >
//       <Link
//         to={`/products/${p.id}`}
//         style={{ textDecoration: "none", color: "inherit" }}
//       >
//         {/* Ảnh sản phẩm */}
//         <div className="relative mb-3">
//           <img
//             src={imgSrc}
//             alt={p.name}
//             style={{
//               width: "100%",
//               height: 200,
//               objectFit: "cover",
//               borderRadius: 12,
//               transition: "transform 0.3s ease",
//             }}
//             onError={(e) => {
//               e.currentTarget.src = PLACEHOLDER;
//             }}
//             className="hover:scale-105"
//           />

//           {/* Badge giảm giá */}
//           {discount > 0 && (
//             <div
//               style={{
//                 position: "absolute",
//                 top: 10,
//                 right: 10,
//                 background: "#d32f2f",
//                 color: "#fff",
//                 fontSize: 13,
//                 fontWeight: 700,
//                 padding: "5px 10px",
//                 borderRadius: 8,
//                 boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
//               }}
//             >
//               -{discount}%
//             </div>
//           )}
//         </div>

//         {/* Thông tin sản phẩm */}
//         <div className="product-info px-1">
//           <div
//             style={{
//               fontWeight: "600",
//               fontSize: 16,
//               color: "#222",
//               marginBottom: 2,
//             }}
//           >
//             {p.name}
//           </div>
//           <div style={{ color: "#666", fontSize: 13, marginBottom: 6 }}>
//             {p.brand_name ? p.brand_name : "Farm Local"}
//           </div>

//           {/* Giá */}
//           {priceSale && priceSale < priceRoot ? (
//             <div style={{ marginTop: 6 }}>
//               <span
//                 style={{
//                   color: "#d32f2f",
//                   fontWeight: "bold",
//                   fontSize: 16,
//                 }}
//               >
//                 {priceSale.toLocaleString()} đ
//               </span>
//               <span
//                 style={{
//                   marginLeft: 8,
//                   textDecoration: "line-through",
//                   color: "#888",
//                   fontSize: 14,
//                 }}
//               >
//                 {priceRoot.toLocaleString()} đ
//               </span>
//             </div>
//           ) : (
//             <div
//               style={{
//                 color: "#2e7d32",
//                 fontWeight: "bold",
//                 marginTop: 6,
//                 fontSize: 16,
//               }}
//             >
//               {priceRoot.toLocaleString()} đ
//             </div>
//           )}
//         </div>
//       </Link>
//     </div>
//   );
// }
