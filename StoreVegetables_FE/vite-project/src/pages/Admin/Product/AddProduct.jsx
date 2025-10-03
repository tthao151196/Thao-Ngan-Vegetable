import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://127.0.0.1:8000/api";
const PLACEHOLDER = "https://placehold.co/120x120?text=No+Image";
export default function AddProduct() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: "",
    slug: "",
    price_root: "",
    price_sale: "",
    qty: "",
    category_id: "",
    description: "",
    thumbnail: null,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Lấy danh mục
  useEffect(() => {
    fetch(`${API_BASE}/categories`)
      .then((res) => res.json())
      .then(setCategories)
      .catch(() => setCategories([]));
  }, []);

  // Xử lý thay đổi input
  const onChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm((s) => ({ ...s, [name]: files[0] }));
    } else {
      setForm((s) => ({ ...s, [name]: value }));
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("slug", form.name.toLowerCase().replace(/\s+/g, "-")); // auto slug
      formData.append("price_root", form.price_root);
      formData.append("price_sale", form.price_sale);
      formData.append("qty", form.qty);
      formData.append("category_id", form.category_id);
      formData.append("description", form.description);
      if (form.thumbnail) {
        formData.append("thumbnail", form.thumbnail);
      }

      // 👇 lấy token từ localStorage
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_BASE}/admin/products`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`, // ✅ gửi kèm token
        },
        body: formData,
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Không thêm được sản phẩm");
      }

      alert("✅ Thêm sản phẩm thành công");
      navigate("/admin/products");
    } catch (err) {
      setError("❌ " + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">➕ Thêm sản phẩm mới</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Tên sản phẩm</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={onChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Giá gốc</label>
          <input
            type="number"
            name="price_root"
            value={form.price_root}
            onChange={onChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Giá bán</label>
          <input
            type="number"
            name="price_sale"
            value={form.price_sale}
            onChange={onChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Số lượng</label>
          <input
            type="number"
            name="qty"
            value={form.qty}
            onChange={onChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Danh mục</label>
          <select
            name="category_id"
            value={form.category_id}
            onChange={onChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">-- Chọn danh mục --</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.cate_name || c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Ảnh sản phẩm</label>
          <input
            type="file"
            name="thumbnail"
            accept="image/*"
            onChange={onChange}
            className="w-full border p-2 rounded"
          />

          {/* Preview ảnh */}
         <div className="admin-upload-preview">
  {form.thumbnail ? (
    typeof form.thumbnail === "string" ? (
      // Trường hợp sửa sản phẩm và đã có URL ảnh sẵn trong DB
      <img
        src={form.thumbnail}
        alt="Preview"
        className="admin-upload-image"
        onError={(e) => (e.currentTarget.src = PLACEHOLDER)}
      />
    ) : (
      // Trường hợp vừa chọn file từ <input type="file" />
      <img
        src={URL.createObjectURL(form.thumbnail)}
        alt="Preview"
        className="admin-upload-image"
        onLoad={(e) => URL.revokeObjectURL(e.currentTarget.src)} // giải phóng blob sau khi load
      />
    )
  ) : (
    <div className="admin-upload-placeholder">Chua chon anh</div>
  )}
</div>
        </div>

        <div>
          <label className="block mb-1 font-medium">Mô tả</label>
          <textarea
            name="description"
            value={form.description}
            onChange={onChange}
            className="w-full border p-2 rounded"
            rows="4"
          ></textarea>
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={saving}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
          >
            {saving ? "Đang lưu..." : "Lưu"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/products")}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
}
