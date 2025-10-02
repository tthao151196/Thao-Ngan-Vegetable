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
      className="product-card"
      style={{
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 2px 8px #e0f2f1",
        padding: 16,
        width: 220,
        margin: 8,
        textAlign: "center",
        position: "relative",
      }}
    >
      {/* ✅ Link sang chi tiết sản phẩm */}
      <Link
        to={`/products/${p.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div className="product-image" style={{ marginBottom: 10 }}>
          <img
            src={imgSrc}
            alt={p.name}
            style={{
              width: "100%",
              height: 120,
              objectFit: "cover",
              borderRadius: 8,
            }}
            onError={(e) => {
              e.currentTarget.src = PLACEHOLDER;
            }}
          />

          {/* ✅ Badge giảm giá */}
          {discount > 0 && (
            <div
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                background: "#d32f2f",
                color: "#fff",
                fontSize: 12,
                fontWeight: 700,
                padding: "4px 8px",
                borderRadius: 6,
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
