import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function Products({ addToCart }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("http://127.0.0.1:8000/products")
      .then((res) => res.json())
      .then((data) => {
        setItems(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Lỗi khi tải sản phẩm:", err)
        setLoading(false)
      })
  }, [])

  if (loading) return <p>Đang tải sản phẩm...</p>

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: 20, color: "#388e3c" }}>🌿 Sản phẩm</h2>
      <div
        className="products"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "20px",
        }}
      >
        {items.map((p) => (
          <div
            key={p.id}
            className="product-card"
            style={{
              background: "#fff",
              borderRadius: 12,
              boxShadow: "0 2px 8px #e0f2f1",
              padding: "20px",
              textAlign: "center",
              fontSize: 15,
              transition: "transform 0.2s, box-shadow 0.2s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)"
              e.currentTarget.style.boxShadow = "0 4px 12px #b2dfdb"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)"
              e.currentTarget.style.boxShadow = "0 2px 8px #e0f2f1"
            }}
          >
            <Link to={`/products/${p.id}`} style={{ textDecoration: "none", color: "inherit" }}>
              <div
                className="product-image"
                style={{
                  background: "#f1f8e9",
                  borderRadius: 8,
                  height: 140,
                  marginBottom: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#388e3c",
                  fontWeight: 500,
                }}
              >
                Ảnh
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: "#2e7d32", margin: "8px 0" }}>
                {p.name}
              </h3>
            </Link>
            <p style={{ color: "#616161", margin: "4px 0" }}>{p.brand}</p>
            <p style={{ fontWeight: 600, color: "#388e3c", margin: "4px 0 12px" }}>
              {Number(p.price).toLocaleString()} đ
            </p>
            <button
              onClick={() => addToCart(p)}
              style={{
                background: "#388e3c",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                padding: "10px 16px",
                fontWeight: 500,
                cursor: "pointer",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.background = "#2e7d32")}
              onMouseLeave={(e) => (e.target.style.background = "#388e3c")}
            >
              + Thêm vào giỏ
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
