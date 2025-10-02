export default function Blog() {
  const posts = [
    {
      id: 1,
      title: "5 mẹo chọn rau sạch ngoài chợ",
      image: "https://placehold.co/400x200?text=Rau",
    },
    {
      id: 2,
      title: "Cách bảo quản trái cây tươi lâu hơn",
      image: "https://placehold.co/400x200?text=Trái+cây",
    },
    {
      id: 3,
      title: "Thực phẩm hữu cơ – Lợi ích cho sức khỏe",
      image: "https://placehold.co/400x200?text=Organic",
    },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <h2 className="text-2xl font-bold text-center mb-6">📰 Tin tức & Mẹo vặt</h2>
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {posts.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-xl shadow hover:shadow-md overflow-hidden"
          >
            <img src={p.image} alt={p.title} />
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{p.title}</h3>
              <button className="text-green-600 hover:underline">
                Xem chi tiết →
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
