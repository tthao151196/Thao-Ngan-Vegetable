import { useParams, useNavigate } from "react-router-dom"

export default function ProductDetail({ products, addToCart }) {
  const { id } = useParams()
  const navigate = useNavigate()

  // tìm sản phẩm theo id (trong mock data hoặc từ API sau này)
  const product = products.find((p) => p.id === Number(id))

  if (!product) {
    return (
      <div>
        <h2>Không tìm thấy sản phẩm</h2>
        <button onClick={() => navigate(-1)}>Quay lại</button>
      </div>
    )
  }

  return (
    <div className="product-detail">
      <div className="product-image">Ảnh</div>
      <h2>{product.name}</h2>
      <p><b>Thương hiệu:</b> {product.brand}</p>
      <p><b>Giá:</b> {product.price.toLocaleString()} đ</p>
      <button onClick={() => addToCart(product)}>Thêm vào giỏ</button>
    </div>
  )
}
