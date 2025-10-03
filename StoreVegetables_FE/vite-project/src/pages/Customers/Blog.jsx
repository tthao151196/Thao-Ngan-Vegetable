import { useEffect, useState } from "react";

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ⚡ Demo dữ liệu mẫu (chưa cần API)
    const samplePosts = [
      {
        id: 1,
        title: "5 lợi ích tuyệt vời của rau xanh với sức khỏe",
        excerpt:
          "Rau xanh không chỉ cung cấp vitamin và chất xơ mà còn giúp phòng ngừa nhiều bệnh lý nguy hiểm...",
        content:
          "Rau xanh như cải bó xôi, xà lách, súp lơ chứa nhiều vitamin A, C, K và chất chống oxy hóa. Ăn rau xanh hằng ngày giúp cải thiện tiêu hóa, tăng cường sức đề kháng, hỗ trợ giảm cân và phòng ngừa bệnh tim mạch.",
        image_url: "https://placehold.co/600x400?text=Rau+Xanh",
      },
      {
        id: 2,
        title: "Cách bảo quản rau củ quả tươi lâu hơn",
        excerpt:
          "Nhiều người mua rau về nhưng chỉ vài ngày sau đã héo úa. Vậy làm sao để giữ rau củ quả tươi lâu?",
        content:
          "Một số mẹo: bảo quản rau trong túi giấy hoặc hộp nhựa thoáng khí; không rửa rau trước khi bỏ tủ lạnh; phân loại rau củ theo nhóm (rau lá, củ quả cứng, trái cây)... Điều này giúp kéo dài thời gian tươi ngon thêm 3-5 ngày.",
        image_url: "https://placehold.co/600x400?text=Bảo+Quản+Rau",
      },
      {
        id: 3,
        title: "Ăn trái cây theo mùa – Tại sao quan trọng?",
        excerpt:
          "Trái cây theo mùa không chỉ rẻ hơn mà còn an toàn, ít thuốc bảo quản và giàu dinh dưỡng hơn.",
        content:
          "Khi bạn chọn trái cây theo mùa (như xoài vào hè, bưởi vào thu), bạn sẽ được hưởng vị ngon tự nhiên nhất, giá cả hợp lý hơn, và đặc biệt là tránh tồn dư hóa chất bảo quản. Hãy ưu tiên mua trái cây tại các cửa hàng uy tín.",
        image_url: "https://placehold.co/600x400?text=Trái+Cây+Theo+Mùa",
      },
    ];

    // set fake posts
    setTimeout(() => {
      setPosts(samplePosts);
      setLoading(false);
    }, 800); // giả lập delay tải
  }, []);

  return (
    <section className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Tin tức & Blog</h1>
      {loading ? (
        <p>Đang tải...</p>
      ) : posts.length ? (
        <div className="grid gap-6 sm:grid-cols-2">
          {posts.map((p) => (
            <article
              key={p.id}
              className="border rounded-lg p-4 bg-white shadow"
            >
              <img
                src={p.image_url}
                alt={p.title}
                className="w-full h-40 object-cover rounded mb-3"
              />
              <h2 className="text-xl font-semibold mb-2">{p.title}</h2>
              <p className="text-gray-600 line-clamp-3">{p.excerpt}</p>
              <a
                href={`/blog/${p.id}`}
                className="text-green-700 font-medium mt-2 inline-block"
              >
                Đọc tiếp →
              </a>
            </article>
          ))}
        </div>
      ) : (
        <p>Chưa có bài viết nào.</p>
      )}
    </section>
  );
}
