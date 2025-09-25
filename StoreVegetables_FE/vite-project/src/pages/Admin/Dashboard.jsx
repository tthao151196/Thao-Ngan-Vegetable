export default function Dashboard() {
  const cards = [
    { label: "Doanh thu hôm nay", value: "₫12,500,000", icon: "💰", color: "#4f8a8b" },
    { label: "Đơn hàng mới", value: "38", icon: "🛒", color: "#f9ae3d" },
    { label: "Sản phẩm tồn kho thấp", value: "7", icon: "📦", color: "#e23e57" },
    { label: "Người dùng mới", value: "15", icon: "👤", color: "#3a4750" },
  ];

  return (
    <section style={{ padding: "32px 0", background: "#f6f8fa", minHeight: "100vh" }}>
      <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 24, textAlign: "center", letterSpacing: 1 }}>Dashboard</h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px,1fr))",
        gap: 24,
        maxWidth: 1000,
        margin: "0 auto"
      }}>
        {cards.map(c => (
          <div
            key={c.label}
            style={{
              background: "#fff",
              borderRadius: 16,
              boxShadow: "0 4px 16px rgba(0,0,0,0.07)",
              padding: 28,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              transition: "transform 0.2s, box-shadow 0.2s",
              border: "none",
              cursor: "pointer"
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-4px) scale(1.03)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.12)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.07)";
            }}
          >
            <div style={{ fontSize: 36, marginBottom: 12, color: c.color }}>{c.icon}</div>
            <div style={{ color: "#888", marginBottom: 8, fontWeight: 500, fontSize: 16, textAlign: "center" }}>{c.label}</div>
            <div style={{ fontSize: 26, fontWeight: 700, color: c.color }}>{c.value}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
