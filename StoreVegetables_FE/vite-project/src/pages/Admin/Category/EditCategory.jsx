import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const API_BASE = "http://127.0.0.1:8000/api";

export default function EditCategory() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    sort_order: "",
    parent_id: "",
    image: "",
    status: 1,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Lấy dữ liệu category cũ để fill vào form
  useEffect(() => {
    const fetchCat = async () => {
      try {
        const res = await fetch(`${API_BASE}/categories/${id}`);
        if (!res.ok) throw new Error("Không tải được dữ liệu");
        const data = await res.json();
        setForm({
          name: data.name || "",
          slug: data.slug || "",
          description: data.description || "",
          sort_order: data.sort_order || "",
          parent_id: data.parent_id || "",
          image: data.image || "",
          status: data.status || 1,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCat();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(`${API_BASE}/categories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Cập nhật thất bại");
      }
      alert("✅ Cập nhật thành công!");
      navigate("/admin/categories");
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Đang tải...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Sửa danh mục</h1>
      {error && <p className="text-red-600 mb-3">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Tên danh mục"
          value={form.name}
          onChange={handleChange}
          required
          className="border p-2 w-full rounded"
        />
        <input
          type="text"
          name="slug"
          placeholder="Slug"
          value={form.slug}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
        <textarea
          name="description"
          placeholder="Mô tả"
          value={form.description}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
        <input
          type="number"
          name="sort_order"
          placeholder="Thứ tự hiển thị"
          value={form.sort_order}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
        <input
          type="number"
          name="parent_id"
          placeholder="Parent ID (nếu có)"
          value={form.parent_id}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
        <input
          type="text"
          name="image"
          placeholder="Tên file ảnh (nếu có)"
          value={form.image}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Lưu thay đổi
        </button>
      </form>
    </div>
  );
}
