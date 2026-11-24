import React, { useEffect, useState } from "react";
import { TrendingUp, TrendingDown, Search } from "lucide-react";
import API from "../services/api";

function PriceTracker() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchPriceHistory() {
      try {
        const response = await API.get("/prices");
        const grouped = {};

        response.data.forEach((item) => {
          if (!item.product) return;

          const key = `${item.product._id}-${item.shopName}`;

          if (!grouped[key]) {
            grouped[key] = {
              name: item.product.name,
              shop: item.shopName,
              records: []
            };
          }

          grouped[key].records.push({
            price: item.price,
            date: item.createdAt
          });
        });

        const history = Object.values(grouped).map((group) => {
          const records = group.records.sort(
            (a, b) => new Date(a.date) - new Date(b.date)
          );

          const current = records[records.length - 1];
          const previous = records.length > 1
            ? records[records.length - 2]
            : null;

          return {
            name: group.name,
            shop: group.shop,
            currentPrice: current.price,
            oldPrice: previous ? previous.price : null
          };
        });

        setProducts(history);
      } catch (error) {
        setMessage("Unable to load price history. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchPriceHistory();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{
      background: "#fffaf2",
      minHeight: "100vh",
      padding: "40px 6%",
      color: "#493426"
    }}>
      <h1 style={{ fontSize: "32px" }}>Grocery Price Tracker</h1>
      <p>Track grocery price changes and find the right time to shop.</p>

      <div style={{
        display: "flex",
        gap: "10px",
        margin: "30px 0",
        maxWidth: "500px"
      }}>
        <input
          type="text"
          placeholder="Search for a product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1,
            padding: "14px",
            border: "1px solid #c9ad91",
            borderRadius: "8px"
          }}
        />
        <button style={{
          background: "#765239",
          color: "white",
          border: "none",
          borderRadius: "8px",
          padding: "12px 20px"
        }}>
          <Search size={18} />
        </button>
      </div>

      <h2>Price History Overview</h2>

      {loading && <p>Loading price history...</p>}
      {message && <p style={{ color: "red" }}>{message}</p>}

      {!loading && !message && (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "22px",
          marginTop: "20px"
        }}>
          {filteredProducts.map((product, index) => {
            const hasPrevious = product.oldPrice !== null;
            const decreased = hasPrevious &&
              product.currentPrice < product.oldPrice;
            const increased = hasPrevious &&
              product.currentPrice > product.oldPrice;

            return (
              <div key={index} style={{
                background: "white",
                padding: "24px",
                borderRadius: "12px",
                boxShadow: "0 3px 12px #00000010"
              }}>
                {decreased ? (
                  <TrendingDown size={30} color="green" />
                ) : (
                  <TrendingUp size={30} color="#765239" />
                )}

                <h3>{product.name}</h3>
                <p style={{ color: "#92765e" }}>
                  Shop: {product.shop}
                </p>

                <p style={{ color: "#92765e" }}>Previous Price</p>
                <h3>{hasPrevious ? `₹${product.oldPrice}` : "Not available"}</h3>

                <p style={{ color: "#92765e" }}>Current Price</p>
                <h2>₹{product.currentPrice}</h2>

                <div style={{
                  background: decreased ? "#edf4e8" : "#fff0e8",
                  padding: "12px",
                  borderRadius: "8px"
                }}>
                  <strong style={{
                    color: decreased ? "green" : "#b65c32"
                  }}>
                    {!hasPrevious
                      ? "No previous price recorded"
                      : decreased
                        ? "Price Decreased"
                        : increased
                          ? "Price Increased"
                          : "Price Unchanged"}
                  </strong>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {!loading && !message && filteredProducts.length === 0 && (
        <p>No products found.</p>
      )}
    </div>
  );
}

export default PriceTracker;