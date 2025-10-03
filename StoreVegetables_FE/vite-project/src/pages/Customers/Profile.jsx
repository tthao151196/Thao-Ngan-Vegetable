// src/pages/Admin/AccountOverview.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function AccountOverview() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const u = JSON.parse(localStorage.getItem("user") || "null");
      setUser(u);
    } catch {
      setUser(null);
    }
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: 20,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ✅ Background icon con vật pastel */}
      <BackgroundAnimals />

      {/* ✅ Overlay pastel để làm dịu */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.6), rgba(186,230,253,0.6))",
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div
        style={{
          width: "100%",
          maxWidth: 980,
          margin: "32px auto",
          padding: 24,
          borderRadius: 20,
          background: "rgba(255,255,255,0.9)",
          border: "1px solid rgba(148,163,184,.25)",
          boxShadow: "0 10px 30px rgba(0,0,0,.25)",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Header nhỏ */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              padding: "4px 10px",
              borderRadius: 14,
              fontSize: 13,
              background: "#fef3c7",
              color: "#92400e",
              fontWeight: 600,
            }}
          >
           
          </div>
          <div
            style={{
              padding: "4px 10px",
              borderRadius: 14,
              fontSize: 13,
              background: "#d1fae5",
              color: "#065f46",
              fontWeight: 600,
            }}
          >
          
          </div>
          <div style={{ flex: 1 }} />
          <div
            title="MotoBikeStore"
            style={{
              fontWeight: 800,
              padding: "4px 10px",
              borderRadius: 14,
              background: "#bae6fd",
              color: "#0369a1",
            }}
          >
            
          </div>
        </div>

        {/* Tiêu đề */}
        <h1
          style={{
            margin: "20px 0 6px",
            fontSize: 28,
            fontWeight: 900,
            color: "#0f172a",
          }}
        >
          Tổng quan tài khoản
        </h1>
        <p style={{ margin: 0, color: "#334155" }}>
          Thông tin hồ sơ và trạng thái phiên đăng nhập của bạn.
        </p>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 20,
            marginTop: 20,
          }}
        >
          <div style={{ display: "grid", gap: 14 }}>
            <StatusBadge />
            <Row label="Tên hiển thị" value={user?.name ?? "—"} />
            <Row label="E-mail" value={user?.email ?? "—"} />
            <Row label="ID người dùng" value={user?.id ?? user?._id ?? "—"} />
          </div>
          <div style={{ display: "grid", gap: 14 }}>
            <InsightCard
              title="Các đơn hàng của tôi"
              value="—"
              hint={<Link to="/my-orders">Xem chi tiết</Link>}
              color="sky"
            />
            <InsightCard
              title="Đơn đã huỷ"
              value="—"
              hint={<Link to="/canceled-orders">Xem chi tiết</Link>}
              color="rose"
            />
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: 24,
            display: "flex",
            justifyContent: "space-between",
            fontSize: 12,
            color: "#475569",
          }}
        >
          <span>© {new Date().getFullYear()}</span>
          <Link to="/" style={{ color: "#0ea5e9" }}>
            ← Về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ==== Background con vật pastel ==== */
function BackgroundAnimals() {
  const animals = ["🐱", "🐰", "🐻", "🐼", "🐧", "🦊", "🐥"];
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        zIndex: 0,
      }}
    >
      {animals.map((a, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            top: `${10 + i * 12}%`,
            left: `${(i * 20) % 90}%`,
            fontSize: 40,
            opacity: 0.7,
            animation: `floatY ${6 + i}s ease-in-out infinite alternate`,
          }}
        >
          {a}
        </span>
      ))}

      {/* CSS animation */}
      <style>
        {`
          @keyframes floatY {
            from { transform: translateY(0px); }
            to { transform: translateY(40px); }
          }
        `}
      </style>
    </div>
  );
}

/* ==== Components ==== */
function Row({ label, value }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "12px 16px",
        borderRadius: 14,
        background: "#f1f5f9",
        border: "1px solid #e2e8f0",
      }}
    >
      <span style={{ fontSize: 13, color: "#475569" }}>{label}</span>
      <span style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>
        {String(value)}
      </span>
    </div>
  );
}

function StatusBadge() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "12px 16px",
        borderRadius: 14,
        background: "#ecfdf5",
        border: "1px solid #a7f3d0",
      }}
    >
      <span
        style={{
          width: 12,
          height: 12,
          borderRadius: "50%",
          background: "#10b981",
        }}
      />
      <div style={{ fontSize: 13 }}>
        <div style={{ fontWeight: 800, color: "#065f46" }}>Đang đăng nhập</div>
        <div style={{ color: "#047857" }}>Phiên đang hoạt động</div>
      </div>
    </div>
  );
}

function InsightCard({ title, value, hint, color }) {
  const tones = {
    sky: { bg: "#e0f2fe", title: "#0369a1", value: "#0ea5e9", hint: "#0284c7" },
    rose: { bg: "#ffe4e6", title: "#9f1239", value: "#e11d48", hint: "#be123c" },
  };
  const tone = tones[color] || tones.sky;

  return (
    <div
      style={{
        padding: 16,
        borderRadius: 16,
        background: tone.bg,
        border: `1px solid ${tone.value}`,
        boxShadow: "0 6px 18px rgba(0,0,0,.15)",
      }}
    >
      <div style={{ fontSize: 13, color: tone.title }}>{title}</div>
      <div
        style={{ marginTop: 6, fontSize: 24, fontWeight: 900, color: tone.value }}
      >
        {value}
      </div>
      <div style={{ marginTop: 8, fontSize: 13, color: tone.hint }}>{hint}</div>
    </div>
  );
}
