// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import ProductCard from "../../components/ProductCard";

// const API_BASE = "http://127.0.0.1:8000";
// const PLACEHOLDER = "https://placehold.co/300x200?text=No+Image";

// export default function Home() {
//   const [categories, setCategories] = useState([]);
//   const [newItems, setNewItems] = useState([]);
//   const [saleItems, setSaleItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const ac = new AbortController();

//     (async () => {
//       try {
//         setLoading(true);
//         setError("");

//         // ✅ Lấy danh mục
//         const resCats = await fetch(`${API_BASE}/categories`, { signal: ac.signal });
//         if (!resCats.ok) throw new Error(`HTTP ${resCats.status}`);
//         const cats = await resCats.json();
//         setCategories(Array.isArray(cats) ? cats : cats?.data ?? []);

//         // ✅ Lấy sản phẩm
//         const resProds = await fetch(`${API_BASE}/products`, { signal: ac.signal });
//         if (!resProds.ok) throw new Error(`HTTP ${resProds.status}`);
//         const prods = await resProds.json();

//         const list = Array.isArray(prods) ? prods : prods?.data ?? [];
//         setNewItems(list.slice(0, 4));
//         setSaleItems(list.slice(-4));
//       } catch (err) {
//         if (err.name !== "AbortError") setError("Không tải được dữ liệu");
//       } finally {
//         setLoading(false);
//       }
//     })();

//     return () => ac.abort();
//   }, []);

//   return (
//     <div
//       style={{
//         fontFamily: "Montserrat, Arial, sans-serif",
//         background: "#f1f8e9",
//         minHeight: "100vh",
//       }}
//     >
//       {/* Hero */}
//       <section
//         style={{
//           position: "relative",
//           textAlign: "center",
//           color: "#fff",
//           height: 380,
//           overflow: "hidden",
//         }}
//       >
//         <img
//           src="http://127.0.0.1:8000/assets/images/banner_three_2.webp"
//           alt="Banner"
//           style={{
//             width: "100%",
//             height: "100%",
//             objectFit: "cover",
//           }}
//         />
//         {/* Overlay */}
//         <div
//           style={{
//             position: "absolute",
//             inset: 0,
//             background: "rgba(0,0,0,0.4)",
//           }}
//         ></div>
//         {/* Text */}
//         <div
//           style={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//           }}
//         >
//           <h1
//             style={{
//               fontSize: 38,
//               fontWeight: 700,
//               marginBottom: 10,
//               textShadow: "0 2px 6px rgba(0,0,0,0.5)",
//             }}
//           >
//             StoreVegetables 🥕🥦
//           </h1>
//           <p style={{ fontSize: 18, fontWeight: 500 }}>
//             Nơi cung cấp rau củ quả tươi sạch từ nông trại đến bàn ăn
//           </p>
//         </div>
//       </section>

//       {/* Danh mục nổi bật */}
//       <section style={{ margin: "40px 0" }}>
//         <h2
//           style={{ fontSize: 24, fontWeight: 600, marginBottom: 18, color: "#388e3c", textAlign: "center" }}
//         >
//           Danh mục nổi bật
//         </h2>

//         {categories.length === 0 ? (
//           <p style={{ textAlign: "center", color: "#666" }}>Chưa có danh mục.</p>
//         ) : (
//           <div
//             style={{
//               display: "flex",
//               gap: 24,
//               justifyContent: "center",
//               flexWrap: "wrap",
//             }}
//           >
//             {categories.map((c) => (
//               <button
//                 key={c.id}
//                 type="button"
//                 onClick={() => navigate(`/category/${c.id}`)}
//                 style={{
//                   background: "#fff",
//                   borderRadius: 12,
//                   boxShadow: "0 2px 8px #e0f2f1",
//                   padding: "16px",
//                   minWidth: 160,
//                   textAlign: "center",
//                   fontWeight: 600,
//                   fontSize: 16,
//                   color: "#388e3c",
//                   border: "1px solid #e0f2f1",
//                   cursor: "pointer",
//                   transition: "transform .12s ease, box-shadow .12s ease",
//                 }}
//                 onMouseEnter={(e) =>
//                   (e.currentTarget.style.transform = "translateY(-2px)")
//                 }
//                 onMouseLeave={(e) =>
//                   (e.currentTarget.style.transform = "translateY(0)")
//                 }
//               >
//                 <div
//                   style={{
//                     height: 100,
//                     marginBottom: 8,
//                     overflow: "hidden",
//                     borderRadius: 8,
//                     background: "#f1f8e9",
//                   }}
//                 >
//                   <img
//                     src={c.image_url || PLACEHOLDER}
//                     alt={c.name}
//                     style={{
//                       width: "100%",
//                       height: "100%",
//                       objectFit: "cover",
//                     }}
//                     onError={(e) => (e.currentTarget.src = PLACEHOLDER)}
//                   />
//                 </div>
//                 {c.name}
//               </button>
//             ))}
//           </div>
//         )}
//       </section>

//       {/* Trạng thái */}
//       {loading && (
//         <p style={{ textAlign: "center", color: "#388e3c" }}>Đang tải dữ liệu...</p>
//       )}
//       {error && <p style={{ textAlign: "center", color: "#d32f2f" }}>{error}</p>}

//       {/* Sản phẩm */}
//       {!loading && !error && (
//         <>
//           <section style={{ margin: "40px 0" }}>
//             <h2
//               style={{ fontSize: 24, fontWeight: 600, marginBottom: 18, color: "#388e3c", textAlign: "center" }}
//             >
//               Sản phẩm mới
//             </h2>
//             <div
//               style={{
//                 display: "flex",
//                 gap: 24,
//                 flexWrap: "wrap",
//                 justifyContent: "center",
//               }}
//             >
//               {newItems.map((p) => (
//                 <ProductCard
//                   key={p.id}
//                   p={{ ...p, image: p.image_url || PLACEHOLDER }}
//                 />
//               ))}
//             </div>
//           </section>

//           <section style={{ margin: "40px 0" }}>
//             <h2
//               style={{ fontSize: 24, fontWeight: 600, marginBottom: 18, color: "#ff7043", textAlign: "center" }}
//             >
//               Đang giảm giá
//             </h2>
//             <div
//               style={{
//                 display: "flex",
//                 gap: 24,
//                 flexWrap: "wrap",
//                 justifyContent: "center",
//               }}
//             >
//               {saleItems.map((p) => (
//                 <ProductCard
//                   key={p.id}
//                   p={{ ...p, image: p.image_url || PLACEHOLDER }}
//                 />
//               ))}
//             </div>
//           </section>
//         </>
//       )}

//       {/* About */}
//       <section
//         style={{
//           background: "#fff",
//           borderRadius: 16,
//           boxShadow: "0 2px 8px #e0f2f1",
//           padding: "32px 24px",
//           margin: "40px auto 24px",
//           maxWidth: 700,
//           textAlign: "center",
//         }}
//       >
//         <h2
//           style={{ fontSize: 22, fontWeight: 600, marginBottom: 10, color: "#388e3c" }}
//         >
//           Về chúng tôi
//         </h2>
//         <p style={{ color: "#4caf50", fontSize: 16 }}>
//           StoreVegetables cam kết mang đến những sản phẩm nông sản tươi sạch, an toàn và giàu dinh dưỡng.
//           Chúng tôi kết nối nông dân và người tiêu dùng, vì một cuộc sống xanh, khỏe mạnh và bền vững.
//         </p>
//       </section>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import Newsletter from "../../components/Newsletter";

const API_BASE = "http://127.0.0.1:8000";
const PLACEHOLDER = "https://placehold.co/300x200?text=No+Image";

const removeVietnameseTones = (str) =>
  str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase();

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [newItems, setNewItems] = useState([]);
  const [saleItems, setSaleItems] = useState([]);
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0 }); // ⏳ đồng hồ
  const navigate = useNavigate();

  // ---- Fetch data ----
  useEffect(() => {
    const ac = new AbortController();
    (async () => {
      try {
        const [resCats, resProds] = await Promise.all([
          fetch(`${API_BASE}/categories`, { signal: ac.signal }),
          fetch(`${API_BASE}/products`, { signal: ac.signal }),
        ]);

        if (!resCats.ok || !resProds.ok) throw new Error("Fetch error");
        const cats = await resCats.json();
        const prods = await resProds.json();
        const list = Array.isArray(prods) ? prods : prods?.data ?? [];

        setCategories(Array.isArray(cats) ? cats : cats?.data ?? []);
        setAllProducts(list);
        setNewItems(list.slice(0, 4));
        setSaleItems(list.slice(-4));
      } catch (e) {
        if (e.name !== "AbortError") setError("Không tải được dữ liệu");
      } finally {
        setLoading(false);
      }
    })();
    return () => ac.abort();
  }, []);

  // ---- Countdown timer ----
  useEffect(() => {
    const endTime = new Date().getTime() + 24 * 60 * 60 * 1000; // 24h
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const d = endTime - now;
      if (d <= 0) {
        clearInterval(timer);
        setTimeLeft({ h: 0, m: 0, s: 0 });
      } else {
        setTimeLeft({
          h: Math.floor((d % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          m: Math.floor((d % (1000 * 60 * 60)) / (1000 * 60)),
          s: Math.floor((d % (1000 * 60)) / 1000),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // ---- Search & Suggest ----
  const filteredProducts = query
    ? allProducts.filter((p) =>
        [p.name, removeVietnameseTones(p.name)].some((n) =>
          n.toLowerCase().includes(removeVietnameseTones(query))
        )
      )
    : [];

  const handleChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    if (!val) return setSearching(false), setSuggestions([]);
    setSuggestions(
      allProducts
        .filter((p) =>
          removeVietnameseTones(p.name).includes(removeVietnameseTones(val))
        )
        .slice(0, 5)
    );
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) setSearching(true), setSuggestions([]);
  };

  const goHome = () => {
    setQuery("");
    setSearching(false);
    setSuggestions([]);
  };

  // ---- UI helpers ----
  const Section = ({ title, color, items, countdown }) => (
    <section style={{ margin: "40px 0" }}>
      <h2
        style={{
          fontSize: 24,
          fontWeight: 600,
          marginBottom: 8,
          color,
          textAlign: "center",
        }}
      >
        {title}
      </h2>

      {/* nếu có countdown thì hiện ở đây */}
      {countdown && (
        <p
          style={{
            textAlign: "center",
            fontSize: 18,
            fontWeight: 600,
            color: "#d32f2f",
            marginBottom: 18,
          }}
        >
          ⏳ Kết thúc sau: {timeLeft.h}h {timeLeft.m}m {timeLeft.s}s
        </p>
      )}

      <div
        style={{
          display: "flex",
          gap: 24,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {items.map((p) => (
          <ProductCard
            key={p.id}
            p={{
              ...p,
              price_root: p.price_root ?? p.price,
              price_sale: p.price_sale ?? 0,
              thumbnail_url: p.thumbnail_url || PLACEHOLDER,
            }}
          />
        ))}
      </div>
    </section>
  );

  // ---- Render ----
  return (
    <div
      style={{
        fontFamily: "Montserrat, Arial, sans-serif",
        background: "#f1f8e9",
        minHeight: "100vh",
      }}
    >
      {/* Search box */}
      <section style={{ margin: "20px auto", maxWidth: 700, position: "relative" }}>
        <form onSubmit={handleSearch} style={{ display: "flex", gap: 8 }}>
          <input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="🔍 Tìm kiếm sản phẩm..."
            style={{
              flex: 1,
              padding: "12px 16px",
              borderRadius: 8,
              border: "1px solid #ccc",
              fontSize: 16,
            }}
          />
        <button
  type="submit"
  style={{
    padding: "12px 26px",
    borderRadius: 10,
    border: "none",
    background: "linear-gradient(135deg, #ff7043, #e64a19)", // 🌈 gradient cam-đỏ
    color: "#fff",
    fontWeight: 600,
    fontSize: 16,
    cursor: "pointer",
    position: "relative",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    transition: "0.3s",
  }}
  onMouseOver={(e) =>
    (e.currentTarget.style.background = "linear-gradient(135deg,#ff8a65,#ff7043)")
  }
  onMouseOut={(e) =>
    (e.currentTarget.style.background = "linear-gradient(135deg,#ff7043,#e64a19)")
  }
>
  Tìm

  {/* 🐰 Con thỏ đu trên nút */}
  <span
    style={{
      position: "absolute",
      top: -40, // 👈 đẩy cao hơn
      left: "50%",
      transform: "translateX(-50%)",
      fontSize: 40, // 👈 tăng size con thỏ
      animation: "swing 2s ease-in-out infinite",
      filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
    }}
  >
    🐰
  </span>
</button>

<style>
  {`
    @keyframes swing {
      0%   { transform: translateX(-50%) rotate(0deg); }
      25%  { transform: translateX(-50%) rotate(10deg); }
      50%  { transform: translateX(-50%) rotate(0deg); }
      75%  { transform: translateX(-50%) rotate(-10deg); }
      100% { transform: translateX(-50%) rotate(0deg); }
    }
  `}
</style>

          {searching && (
            <button
              type="button"
              onClick={goHome}
              style={{
                padding: "12px 16px",
                borderRadius: 8,
                border: "1px solid #ccc",
                background: "#fff",
              }}
            >
              🏠 Trang chủ
            </button>
          )}
        </form>

        {/* Suggestions */}
        {suggestions.length > 0 && !searching && (
          <ul
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              background: "#fff",
              border: "1px solid #ccc",
              borderRadius: 8,
              marginTop: 4,
              zIndex: 50,
              listStyle: "none",
              padding: 0,
            }}
          >
            {suggestions.map((s) => (
              <li
                key={s.id}
                onClick={() => (
                  setQuery(s.name), setSuggestions([]), setSearching(true)
                )}
                style={{
                  padding: "8px 12px",
                  cursor: "pointer",
                  borderBottom: "1px solid #eee",
                }}
              >
                {s.name}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Search results */}
      {searching && query && !loading && !error ? (
        <Section title="Kết quả tìm kiếm" color="#1976d2" items={filteredProducts} />
      ) : (
        <>



        
          {/* Hero */}
          {/* <section
            style={{
              position: "relative",
              textAlign: "center",
              color: "#fff",
              height: 380,
              overflow: "hidden",
            }}
          >
            <img
              src="http://127.0.0.1:8000/assets/images/banner_three_2.webp"
              alt="Banner"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div
              style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)" }}
            ></div>
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <h1
                style={{
                  fontSize: 38,
                  fontWeight: 700,
                  marginBottom: 10,
                  textShadow: "0 2px 6px rgba(0,0,0,0.5)",
                }}
              >
                StoreVegetables 🥕🥦
              </h1>
              <p style={{ fontSize: 18, fontWeight: 500 }}>
                Nơi cung cấp rau củ quả tươi sạch từ nông trại đến bàn ăn
              </p>
            </div>
          </section> */}

<section
  style={{
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20, // 👈 thêm khoảng cách giữa 2 bên
    height: 420,
    color: "#fff",
    background: "#f1f8e9",
    overflow: "hidden",
    padding: "0 40px",
    borderRadius: 12,
  }}
>
  {/* Bên trái: Ảnh nền (không di chuyển, chiếm 60%) */}
  <div
    style={{
      flex: 1.2,
      position: "relative",
      height: "100%",
      overflow: "hidden",
      borderRadius: 12,
    }}
  >
    <img
      src="http://127.0.0.1:8000/assets/images/banner_three_2.webp"
      alt="Banner"
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        transform: "scale(1.05)",
        borderRadius: 12, // 👈 bo góc trái
      }}
    />
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "rgba(0,0,0,0.4)",
        borderRadius: 12,
      }}
    ></div>
  </div>

  {/* Bên phải: nội dung sale */}
  <section
    style={{
      flex: 0.8,
      position: "relative",
      textAlign: "center",
      color: "#fff",
      height: 420,
      overflow: "hidden",
      borderRadius: 12, // 👈 bo góc phải
    }}
  >
    <img
      src="http://127.0.0.1:8000/assets/images/pexels-asphotograpy-1002703.jpg"
      alt="Banner"
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        transform: "scale(1.05)",
        borderRadius: 12, // 👈 bo góc ảnh bên phải
      }}
    />
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.3))",
        borderRadius: 12, // 👈 gradient cũng bo góc
      }}
    ></div>

    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center",
        color: "#fff",
      }}
    >
      <h1
        style={{
          fontSize: 48,
          fontWeight: 800,
          marginBottom: 16,
          color: "#f1f8e9",
          textShadow: "0 3px 8px rgba(0,0,0,0.8)",
        }}
      >
        Sale Off 50% 🎉
      </h1>
      <p
        style={{
          fontSize: 20,
          marginBottom: 24,
          color: "#f1f8e9",
          textShadow: "0 2px 6px rgba(0,0,0,0.7)",
        }}
      >
        Ưu đãi cực sốc cho rau củ quả tươi ngon hôm nay.  
        <br />Nhanh tay mua sắm để không bỏ lỡ!
      </p>
      
    </div>
  </section>
</section>




          {/* Categories */}
          <section style={{ margin: "40px 0" }}>
            <h2
              style={{
                fontSize: 24,
                fontWeight: 600,
                marginBottom: 18,
                color: "#388e3c",
                textAlign: "center",
              }}
            >
              Danh mục nổi bật
            </h2>
            {categories.length === 0 ? (
              <p style={{ textAlign: "center", color: "#666" }}>Chưa có danh mục.</p>
            ) : (
              <div
                style={{
                  display: "flex",
                  gap: 24,
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                {categories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => navigate(`/category/${c.id}`)}
                    style={{
                      background: "#fff",
                      borderRadius: 12,
                      boxShadow: "0 2px 8px #e0f2f1",
                      padding: "16px",
                      minWidth: 160,
                      textAlign: "center",
                      fontWeight: 600,
                      fontSize: 16,
                      color: "#388e3c",
                      border: "1px solid #e0f2f1",
                    }}
                  >
                    <div
                      style={{
                        height: 100,
                        marginBottom: 8,
                        overflow: "hidden",
                        borderRadius: 8,
                        background: "#f1f8e9",
                      }}
                    >
                      <img
                        src={c.image_url || PLACEHOLDER}
                        alt={c.name}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        onError={(e) => (e.currentTarget.src = PLACEHOLDER)}
                      />
                    </div>
                    {c.name}
                  </button>
                ))}
              </div>
            )}
          </section>

          {/* Products */}
          <Section title="Sản phẩm mới" color="#388e3c" items={newItems} />
          <Section title="Đang giảm giá" color="#ff7043" items={saleItems} countdown />
        </>
      )}

      {/* 📩 Newsletter */}
      <Newsletter />
    </div>
  );
}
