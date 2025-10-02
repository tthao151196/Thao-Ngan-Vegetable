export default function Testimonial() {
  const reviews = [
    { id: 1, name: "Ngọc", text: "Rau tươi ngon, giá hợp lý!", avatar: "https://i.pravatar.cc/100?img=1" },
    { id: 2, name: "Hải", text: "Dịch vụ giao hàng nhanh chóng!", avatar: "https://i.pravatar.cc/100?img=2" },
    { id: 3, name: "Lan", text: "Trái cây rất ngọt và sạch!", avatar: "https://i.pravatar.cc/100?img=3" },
  ];

  return (
    <section className="py-12 bg-green-50">
      <h2 className="text-2xl font-bold text-center mb-8">⭐ Khách hàng nói gì?</h2>
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {reviews.map((r) => (
          <div
            key={r.id}
            className="bg-white rounded-xl shadow p-6 text-center hover:shadow-lg"
          >
            <img
              src={r.avatar}
              alt={r.name}
              className="w-16 h-16 rounded-full mx-auto mb-3"
            />
            <p className="italic text-gray-600 mb-2">"{r.text}"</p>
            <h4 className="font-semibold">{r.name}</h4>
          </div>
        ))}
      </div>
    </section>
  );
}
