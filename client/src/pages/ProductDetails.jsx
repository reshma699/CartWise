import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import API from "../services/api";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProductDetails() {
      try {
        const [productResponse, priceResponse] = await Promise.all([
          API.get(`/products/${id}`),
          API.get("/prices")
        ]);

        setProduct(productResponse.data);

        const productPrices = priceResponse.data.filter(
          (item) =>
            item.product &&
            item.product._id === id
        );

        setPrices(productPrices);
      } catch (err) {
        setError("Unable to load product details.");
      } finally {
        setLoading(false);
      }
    }

    fetchProductDetails();
  }, [id]);

  const cheapestPrice =
    prices.length > 0
      ? Math.min(...prices.map((item) => item.price))
      : null;

  if (loading) {
    return <h2 style={{ textAlign: "center", padding: "60px" }}>
      Loading product details...
    </h2>;
  }

  if (error || !product) {
    return (
      <div style={{ textAlign: "center", padding: "60px" }}>
        <h2>{error || "Product not found."}</h2>
        <Link to="/compare">Back to Compare Prices</Link>
      </div>
    );
  }

  return (
    <div style={{
      background: "#fffaf2",
      minHeight: "100vh",
      padding: "45px 8%",
      color: "#493426"
    }}>
      <Link to="/compare" style={{
        color: "#765239",
        textDecoration: "none"
      }}>
        <ArrowLeft size={18} /> Back to Compare Prices
      </Link>

      <div style={{
        maxWidth: "850px",
        margin: "35px auto",
        background: "white",
        padding: "35px",
        borderRadius: "18px",
        boxShadow: "0 5px 20px #00000012"
      }}>
        <ShoppingBag size={45} color="#765239" />

        <h1 style={{ marginTop: "15px" }}>
          {product.name}
        </h1>

        <p style={{ color: "#92765e" }}>
          Category: {product.category || "Not specified"}
        </p>

        <p>
          {product.description || "No description available."}
        </p>

        <h2 style={{ marginTop: "30px" }}>
          Available Shop Prices
        </h2>

        {prices.length === 0 ? (
          <p>No shop prices available for this product.</p>
        ) : (
          prices.map((item) => (
            <div key={item._id} style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "17px",
              marginTop: "12px",
              background: "#fffaf2",
              borderRadius: "10px"
            }}>
              <strong>{item.shopName}</strong>

              <strong style={{ color: "#765239" }}>
                ₹{Number(item.price).toFixed(2)}
              </strong>

              {item.price === cheapestPrice && (
                <span style={{
                  color: "green",
                  fontSize: "13px"
                }}>
                  Cheapest
                </span>
              )}
            </div>
          ))
        )}

        {cheapestPrice !== null && (
          <div style={{
            marginTop: "25px",
            padding: "20px",
            background: "#edf4e8",
            borderRadius: "12px",
            textAlign: "center"
          }}>
            <h3>Lowest Available Price</h3>
            <h1 style={{ color: "#356b35" }}>
              ₹{cheapestPrice.toFixed(2)}
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetails;