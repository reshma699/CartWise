import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calculator, ArrowLeft, ShoppingCart } from "lucide-react";
import API from "../services/api";

function ShoppingTotal() {
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [savedTotal, setSavedTotal] = useState(0);
  const [savedCount, setSavedCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const total = Number(price) * Number(quantity);

  useEffect(() => {
    async function calculateSavedTotal() {
      try {
        const user = JSON.parse(
          localStorage.getItem("cartwiseUser") || "null"
        );

        if (!user?.id) {
          setMessage("Please login to view your saved shopping total.");
          return;
        }

        const [listResponse, priceResponse] = await Promise.all([
          API.get("/shoppinglists"),
          API.get("/prices")
        ]);

        const userList = listResponse.data.find(
          (list) => list.user && list.user._id === user.id
        );

        if (!userList) {
          setMessage("Your shopping list is empty.");
          return;
        }

        let totalAmount = 0;
        let count = 0;

        userList.items.forEach((entry) => {
          if (!entry.product) return;

          const productPrices = priceResponse.data.filter(
            (record) =>
              record.product &&
              record.product._id === entry.product._id
          );

          if (productPrices.length > 0) {
            const cheapestPrice = Math.min(
              ...productPrices.map((record) => record.price)
            );

            totalAmount += cheapestPrice * entry.quantity;
            count += entry.quantity;
          }
        });

        setSavedTotal(totalAmount);
        setSavedCount(count);
      } catch (error) {
        setMessage("Unable to calculate your saved shopping total.");
      } finally {
        setLoading(false);
      }
    }

    calculateSavedTotal();
  }, []);

  return (
    <div style={{
      background: "#fffaf2",
      minHeight: "100vh",
      padding: "55px 8%",
      color: "#493426"
    }}>

      <Link to="/dashboard" style={{
        color: "#765239",
        textDecoration: "none",
        fontSize: "16px"
      }}>
        <ArrowLeft size={19} /> Back to Dashboard
      </Link>

      <div style={{
        maxWidth: "850px",
        margin: "40px auto",
        background: "white",
        padding: "45px",
        borderRadius: "18px",
        boxShadow: "0 5px 20px #00000012"
      }}>

        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <Calculator size={55} color="#765239" />
          <h1 style={{ fontSize: "34px", marginTop: "15px" }}>
            Shopping Calculator
          </h1>
          <p style={{ color: "#92765e", fontSize: "17px" }}>
            Calculate your grocery shopping expenses easily.
          </p>
        </div>

        <h2>Calculate Individual Item</h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "25px"
        }}>

          <div>
            <label style={{ fontSize: "16px", fontWeight: "bold" }}>
              Price of One Item (₹)
            </label>

            <input
              type="number"
              placeholder="Enter item price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              min="0"
              step="0.01"
              style={{
                width: "100%",
                padding: "17px",
                marginTop: "12px",
                border: "1px solid #c9ad91",
                borderRadius: "9px",
                fontSize: "16px",
                boxSizing: "border-box"
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: "16px", fontWeight: "bold" }}>
              Quantity
            </label>

            <input
              type="number"
              placeholder="Enter quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min="0"
              step="1"
              style={{
                width: "100%",
                padding: "17px",
                marginTop: "12px",
                border: "1px solid #c9ad91",
                borderRadius: "9px",
                fontSize: "16px",
                boxSizing: "border-box"
              }}
            />
          </div>

        </div>

        <div style={{
          marginTop: "30px",
          background: "#edf4e8",
          padding: "30px",
          borderRadius: "14px",
          textAlign: "center"
        }}>
          <ShoppingCart size={35} color="#356b35" />
          <h2 style={{ color: "#356b35" }}>
            Individual Item Total
          </h2>
          <h1 style={{
            color: "#356b35",
            fontSize: "38px"
          }}>
            ₹{total.toFixed(2)}
          </h1>
        </div>

        <div style={{
          marginTop: "30px",
          background: "#f5eee5",
          padding: "30px",
          borderRadius: "14px",
          textAlign: "center"
        }}>
          <ShoppingCart size={35} color="#765239" />

          <h2>Saved Shopping List Total</h2>

          {loading ? (
            <p>Calculating your saved total...</p>
          ) : (
            <>
              <h1 style={{
                color: "#765239",
                fontSize: "38px"
              }}>
                ₹{savedTotal.toFixed(2)}
              </h1>

              <p>{savedCount} item(s) in your shopping list</p>
            </>
          )}

          {message && (
            <p style={{ color: "#a34b2e", marginTop: "12px" }}>
              {message}
            </p>
          )}

          <p style={{ fontSize: "13px", color: "#92765e" }}>
            Calculated using the cheapest saved shop prices.
          </p>
        </div>

      </div>
    </div>
  );
}

export default ShoppingTotal;