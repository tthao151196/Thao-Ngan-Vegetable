import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      alert("Vui lòng nhập email!");
      return;
    }
    alert("🎉 Đăng ký thành công với email: " + email);
    setEmail("");
  };

  return (
    <section
      style={{
        margin: "50px auto",
        maxWidth: 700,
        padding: "30px 24px",
        background: "#ffffff",
        borderRadius: 16,
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        textAlign: "center",
      }}
    >
      <h2
        style={{
          fontSize: 22,
          fontWeight: 700,
          marginBottom: 10,
          color: "#2e7d32",
        }}
      >
        📩 Nhận tin khuyến mãi
      </h2>
      <p style={{ marginBottom: 20, color: "#555", fontSize: 15 }}>
        Đăng ký email để nhận thông tin về ưu đãi và sản phẩm mới nhất.
      </p>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
        }}
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Nhập email của bạn..."
          style={{
            flex: 1,
            maxWidth: 400,
            padding: "12px 16px",
            borderRadius: 8,
            border: "1px solid #ccc",
            fontSize: 15,
          }}
        />
        <button
          type="submit"
          style={{
            padding: "12px 22px",
            borderRadius: 8,
            border: "none",
            background: "#388e3c",
            color: "#fff",
            fontWeight: 600,
            cursor: "pointer",
            transition: "0.3s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.background = "#2e7d32")}
          onMouseOut={(e) => (e.currentTarget.style.background = "#388e3c")}
        >
          Đăng ký
        </button>
      </form>
    </section>
  );
}
