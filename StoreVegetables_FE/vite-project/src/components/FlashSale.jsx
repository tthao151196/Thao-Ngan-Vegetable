import { useEffect, useState } from "react";

export default function FlashSale() {
  const [timeLeft, setTimeLeft] = useState(7200); // 2 tiếng = 7200 giây

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (s) => {
    const h = String(Math.floor(s / 3600)).padStart(2, "0");
    const m = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
    const sec = String(s % 60).padStart(2, "0");
    return `${h}:${m}:${sec}`;
  };

  return (
    <section className="py-12 bg-red-50">
      <h2 className="text-2xl font-bold text-center mb-3 text-red-600">
        🔥 Flash Sale
      </h2>
      <p className="text-center text-gray-600 mb-6">
        Kết thúc sau:{" "}
        <span className="font-mono text-lg text-red-500">
          {formatTime(timeLeft)}
        </span>
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow hover:shadow-lg transition"
          >
            <img
              src={`https://placehold.co/300x200?text=Flash+${i}`}
              alt=""
              className="rounded-t-xl"
            />
            <div className="p-3">
              <h3 className="font-semibold">Sản phẩm {i}</h3>
              <p className="text-green-600 font-bold">50.000đ</p>
              <button className="mt-2 w-full bg-red-500 text-white py-1 rounded-lg hover:bg-red-600">
                Mua ngay
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
