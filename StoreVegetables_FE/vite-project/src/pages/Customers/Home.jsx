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

const API_BASE = "http://127.0.0.1:8000";
const PLACEHOLDER = "https://placehold.co/300x200?text=No+Image";

// ✅ Hàm bỏ dấu tiếng Việt
const removeVietnameseTones = (str) => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // xóa dấu
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase();
};

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [newItems, setNewItems] = useState([]);
  const [saleItems, setSaleItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [suggestions, setSuggestions] = useState([]); // ✅ gợi ý
  const navigate = useNavigate();

  useEffect(() => {
    const ac = new AbortController();
    (async () => {
      try {
        setLoading(true);
        setError("");

        // ✅ Lấy danh mục
        const resCats = await fetch(`${API_BASE}/categories`, { signal: ac.signal });
        if (!resCats.ok) throw new Error(`HTTP ${resCats.status}`);
        const cats = await resCats.json();
        setCategories(Array.isArray(cats) ? cats : cats?.data ?? []);

        // ✅ Lấy sản phẩm
        const resProds = await fetch(`${API_BASE}/products`, { signal: ac.signal });
        if (!resProds.ok) throw new Error(`HTTP ${resProds.status}`);
        const prods = await resProds.json();

        const list = Array.isArray(prods) ? prods : prods?.data ?? [];
        setAllProducts(list);
        setNewItems(list.slice(0, 4));
        setSaleItems(list.slice(-4));
      } catch (err) {
        if (err.name !== "AbortError") setError("Không tải được dữ liệu");
      } finally {
        setLoading(false);
      }
    })();
    return () => ac.abort();
  }, []);

  // ✅ Lọc sản phẩm bỏ dấu
  const filteredProducts = query
    ? allProducts.filter((p) => {
        const name = p.name.toLowerCase();
        const noToneName = removeVietnameseTones(p.name);
        const q = query.toLowerCase();
        const noToneQ = removeVietnameseTones(query);
        return (
          name.includes(q) ||
          noToneName.includes(q) ||
          name.includes(noToneQ) ||
          noToneName.includes(noToneQ)
        );
      })
    : [];

  // ✅ Submit tìm kiếm
  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setSearching(true);
      setSuggestions([]); // ẩn gợi ý
    }
  };

  // ✅ Quay lại trang chủ
  const goHome = () => {
    setQuery("");
    setSearching(false);
    setSuggestions([]);
  };

  // ✅ Xử lý gợi ý khi gõ
  const handleChange = (e) => {
    const val = e.target.value;
    setQuery(val);

    if (!val) {
      setSearching(false);
      setSuggestions([]);
      return;
    }

    const noToneVal = removeVietnameseTones(val);
    const sug = allProducts
      .filter((p) =>
        removeVietnameseTones(p.name).includes(noToneVal)
      )
      .slice(0, 5); // chỉ lấy 5 gợi ý
    setSuggestions(sug);
  };

  // ✅ Khi chọn gợi ý
  const handleSelectSuggestion = (name) => {
    setQuery(name);
    setSuggestions([]);
    setSearching(true);
  };

  return (
    <div
      style={{
        fontFamily: "Montserrat, Arial, sans-serif",
        background: "#f1f8e9",
        minHeight: "100vh",
      }}
    >
      {/* Ô tìm kiếm */}
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
              outline: "none",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "12px 20px",
              borderRadius: 8,
              border: "none",
              background: "#388e3c",
              color: "#fff",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Tìm
          </button>
          {searching && (
            <button
              type="button"
              onClick={goHome}
              style={{
                padding: "12px 16px",
                borderRadius: 8,
                border: "1px solid #ccc",
                background: "#fff",
                cursor: "pointer",
                fontWeight: 500,
              }}
            >
              🏠 Trang chủ
            </button>
          )}
        </form>

        {/* Gợi ý sản phẩm */}
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
                onClick={() => handleSelectSuggestion(s.name)}
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

      {/* Nếu đang tìm thì chỉ show kết quả */}
      {searching && query && !loading && !error && (
        <section style={{ margin: "20px auto", maxWidth: 1000 }}>
          <h2
            style={{
              fontSize: 24,
              fontWeight: 600,
              marginBottom: 18,
              color: "#1976d2",
              textAlign: "center",
            }}
          >
            Kết quả tìm kiếm
          </h2>
          <div
            style={{
              display: "flex",
              gap: 24,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {filteredProducts.length > 0 ? (
              filteredProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  p={{ ...p, image: p.image_url || PLACEHOLDER }}
                />
              ))
            ) : (
              <p style={{ color: "#666" }}>Không tìm thấy sản phẩm nào.</p>
            )}
          </div>
        </section>
      )}

      {/* Nếu không tìm thì hiển thị giao diện gốc */}
      {!searching && (
        <>
          {/* Hero */}
          <section
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
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(0,0,0,0.4)",
              }}
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
          </section>

          {/* Danh mục nổi bật */}
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
              <p style={{ textAlign: "center", color: "#666" }}>
                Chưa có danh mục.
              </p>
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
                    type="button"
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
                      cursor: "pointer",
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
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        onError={(e) => (e.currentTarget.src = PLACEHOLDER)}
                      />
                    </div>
                    {c.name}
                  </button>
                ))}
              </div>
            )}
          </section>

          {/* Sản phẩm mới */}
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
              Sản phẩm mới
            </h2>
            <div
              style={{
                display: "flex",
                gap: 24,
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {newItems.map((p) => (
                <ProductCard
                  key={p.id}
                  p={{ ...p, image: p.image_url || PLACEHOLDER }}
                />
              ))}
            </div>
          </section>

          {/* Sản phẩm giảm giá */}
          <section style={{ margin: "40px 0" }}>
            <h2
              style={{
                fontSize: 24,
                fontWeight: 600,
                marginBottom: 18,
                color: "#ff7043",
                textAlign: "center",
              }}
            >
              Đang giảm giá
            </h2>
            <div
              style={{
                display: "flex",
                gap: 24,
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {saleItems.map((p) => (
                <ProductCard
                  key={p.id}
                  p={{ ...p, image: p.image_url || PLACEHOLDER }}
                />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
