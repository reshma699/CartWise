import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Search, ShoppingBag } from "lucide-react";
import API from "../services/api";

function ComparePrices() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPrices() {
      try {
        const response = await API.get("/prices");

        const groupedProducts = {};

        response.data.forEach((item) => {
          if (!item.product || !item.product._id) return;

          const productId = item.product._id;

          if (!groupedProducts[productId]) {
            groupedProducts[productId] = {
              ...item.product,
              prices: []
            };
          }

          groupedProducts[productId].prices.push({
            id: item._id,
            shopName: item.shopName,
            price: Number(item.price)
          });
        });

        setProducts(Object.values(groupedProducts));
      } catch (err) {
        setError("Unable to load grocery prices. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchPrices();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{
      background: "#fffaf2",
      minHeight: "100vh",
      padding: "45px 8%",
      color: "#493426"
    }}>

      <Link to="/dashboard" style={{
        color: "#765239",
        textDecoration: "none",
        fontSize: "16px"
      }}>
        <ArrowLeft size={18} /> Back to Dashboard
      </Link>

      <div style={{
        textAlign: "center",
        marginTop: "35px",
        marginBottom: "35px"
      }}>
        <ShoppingBag size={45} color="#765239" />

        <h1 style={{ fontSize: "34px" }}>
          Compare Grocery Prices
        </h1>

        <p style={{ color: "#92765e" }}>
          Find the best grocery prices from different shops.
        </p>
      </div>

      <div style={{
        maxWidth: "550px",
        margin: "0 auto 35px",
        display: "flex",
        alignItems: "center",
        background: "white",
        padding: "12px 18px",
        borderRadius: "10px",
        border: "1px solid #c9ad91"
      }}>
        <Search color="#765239" size={20} />

        <input
          type="text"
          placeholder="Search grocery products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            border: "none",
            outline: "none",
            width: "100%",
            padding: "8px",
            fontSize: "16px",
            background: "transparent"
          }}
        />
      </div>

      {loading && (
        <h3 style={{ textAlign: "center" }}>
          Loading grocery prices...
        </h3>
      )}

      {error && (
        <p style={{ textAlign: "center", color: "red" }}>
          {error}
        </p>
      )}

      {!loading && !error && filteredProducts.length === 0 && (
        <p style={{ textAlign: "center" }}>
          No grocery products found.
        </p>
      )}

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "25px"
      }}>
        {filteredProducts.map((product) => {
          const cheapestPrice = Math.min(
            ...product.prices.map((item) => item.price)
          );

          return (
            <div
              key={product._id}
              style={{
                background: "white",
                padding: "25px",
                borderRadius: "15px",
                boxShadow: "0 5px 18px #00000012"
              }}
            >
              <ShoppingBag size={35} color="#765239" />

              <Link
                to={`/product/${product._id}`}
                style={{
                  display: "block",
                  color: "#493426",
                  textDecoration: "none",
                  marginTop: "15px"
                }}
              >
                <h2 style={{ margin: "0 0 8px" }}>
                  {product.name}
                </h2>
              </Link>

              <p style={{ color: "#92765e" }}>
                Category: {product.category || "Groceries"}
              </p>

              <h3>Available Shop Prices</h3>

              {product.prices.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "10px",
                    padding: "12px 0",
                    borderBottom: "1px solid #eee"
                  }}
                >
                  <span>{item.shopName}</span>

                  <strong>₹{item.price.toFixed(2)}</strong>
                </div>
              ))}

              <div style={{
                marginTop: "18px",
                padding: "15px",
                background: "#edf4e8",
                borderRadius: "10px",
                textAlign: "center"
              }}>
                <p style={{ margin: "0 0 5px", color: "#356b35" }}>
                  Cheapest Price
                </p>

                <h2 style={{
                  color: "#356b35",
                  margin: 0
                }}>
                  ₹{cheapestPrice.toFixed(2)}
                </h2>

                <p style={{
                  color: "#356b35",
                  fontSize: "13px",
                  marginBottom: 0
                }}>
                  Best price available for this product
                </p>
              </div>

              <Link
                to={`/product/${product._id}`}
                style={{
                  display: "block",
                  textAlign: "center",
                  marginTop: "18px",
                  padding: "12px",
                  background: "#765239",
                  color: "white",
                  textDecoration: "none",
                  borderRadius: "8px"
                }}
              >
                View Product Details
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ComparePrices;