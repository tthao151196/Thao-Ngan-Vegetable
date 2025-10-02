import { useEffect } from "react";

export default function Dashboard() {
  const cards = [
    { label: "Doanh thu hôm nay", value: "₫12,500,000", icon: "🍉", color: "#4f8a8b" },
    { label: "Đơn hàng mới", value: "38", icon: "🥦", color: "#f9ae3d" },
    { label: "Sản phẩm tồn kho thấp", value: "7", icon: "🍅", color: "#e23e57" },
    { label: "Người dùng mới", value: "15", icon: "🥑", color: "#3a4750" },
  ];

  useEffect(() => {
    // Tạo các emoji trái cây bay
    const container = document.getElementById("floating-icons");
    if (!container) return;

    const icons = ["🍎", "🍊", "🥬", "🍓", "🍍", "🥕", "🍇"];
    for (let i = 0; i < 15; i++) {
      const span = document.createElement("span");
      span.innerText = icons[Math.floor(Math.random() * icons.length)];
      span.style.position = "absolute";
      span.style.fontSize = `${24 + Math.random() * 24}px`;
      span.style.left = `${Math.random() * 100}%`;
      span.style.top = `${Math.random() * 100}%`;
      span.style.opacity = 0.6;
      span.style.animation = `float ${6 + Math.random() * 6}s ease-in-out infinite`;
      container.appendChild(span);
    }
  }, []);

  return (
    <section
      style={{
        padding: "40px 0",
        background: "linear-gradient(135deg, #f0fdf4, #ecfdf5)",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Floating icons background */}
      <div
        id="floating-icons"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      ></div>

      <h1
        style={{
          fontSize: 36,
          fontWeight: 800,
          marginBottom: 40,
          textAlign: "center",
          letterSpacing: 1,
          background: "linear-gradient(90deg,#16a34a,#22c55e)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          zIndex: 1,
          position: "relative",
        }}
      >
       
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px,1fr))",
          gap: 28,
          maxWidth: 1100,
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        {cards.map((c, idx) => (
          <div
            key={c.label}
            style={{
              background: "white",
              borderRadius: 20,
              boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
              padding: 28,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              transition: "transform 0.3s, box-shadow 0.3s",
              cursor: "pointer",
              position: "relative",
              overflow: "hidden",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px) scale(1.05)";
              e.currentTarget.style.boxShadow =
                "0 12px 32px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow =
                "0 8px 24px rgba(0,0,0,0.08)";
            }}
          >
            {/* Hiệu ứng bóng sáng động */}
            <div
              style={{
                position: "absolute",
                top: "-50%",
                left: "-50%",
                width: "200%",
                height: "200%",
                background: `radial-gradient(circle, ${c.color}33 10%, transparent 70%)`,
                animation: "rotateGlow 8s linear infinite",
              }}
            ></div>

            <div
              style={{
                fontSize: 40,
                marginBottom: 12,
                color: c.color,
                zIndex: 2,
              }}
            >
              {c.icon}
            </div>
            <div
              style={{
                color: "#666",
                marginBottom: 6,
                fontWeight: 500,
                fontSize: 16,
                textAlign: "center",
                zIndex: 2,
              }}
            >
              {c.label}
            </div>
            <div
              style={{
                fontSize: 24,
                fontWeight: 700,
                color: c.color,
                zIndex: 2,
              }}
            >
              {c.value}
            </div>
          </div>
        ))}
      </div>

      {/* Style cho animation */}
      <style>{`
        @keyframes rotateGlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes float {
          0% { transform: translateY(0px); opacity: 0.5; }
          50% { transform: translateY(-40px); opacity: 1; }
          100% { transform: translateY(0px); opacity: 0.5; }
        }
      `}</style>
    </section>
  );
}
