import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API_BASE = "http://127.0.0.1:8000/api";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price_root: "",
    price_sale: "",
    qty: "",
    category_id: "",
    brand_id: "",
    description: "",
    thumbnail: null, // file upload
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Lấy dữ liệu sản phẩm + danh mục
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resProd, resCats] = await Promise.all([
          fetch(`${API_BASE}/products/${id}`),
          fetch(`${API_BASE}/categories`),
        ]);

        if (!resProd.ok) throw new Error("Không tải được sản phẩm");
        if (!resCats.ok) throw new Error("Không tải được danh mục");

        const prod = await resProd.json();
        const cats = await resCats.json();

        setForm({
          name: prod.name || "",
          price_root: prod.price_root || "",
          price_sale: prod.price || "", // map từ API khách sang sale
          qty: prod.qty || "",
          category_id: prod.category_id || "",
          brand_id: prod.brand_id || "",
          description: prod.description || "",
          thumbnail: null,
        });

        setCategories(cats);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const onChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm((s) => ({ ...s, [name]: files[0] }));
    } else {
      setForm((s) => ({ ...s, [name]: value }));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("slug", form.name.toLowerCase().replace(/\s+/g, "-")); // tự sinh slug
      formData.append("price_root", form.price_root);
      formData.append("price_sale", form.price_sale);
      formData.append("qty", form.qty);
      formData.append("category_id", form.category_id);
      if (form.brand_id) formData.append("brand_id", form.brand_id);
      formData.append("description", form.description);
      if (form.thumbnail) {
        formData.append("thumbnail", form.thumbnail);
      }
      formData.append("_method", "PUT"); // Laravel spoof PUT

      const res = await fetch(`${API_BASE}/admin/products/${id}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Cập nhật thất bại");
      }

      alert("✅ Cập nhật thành công");
      navigate("/admin/products");
    } catch (err) {
      setError("❌ " + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="p-4">Đang tải...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">✏️ Sửa sản phẩm</h1>
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={onSubmit} className="space-y-4">
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

        <button
          type="submit"
          disabled={saving}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:bg-gray-400"
        >
          {saving ? "Đang lưu..." : "Lưu thay đổi"}
        </button>
      </form>
    </div>
  );
}
