import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ShoppingCart,
  TrendingUp,
  ShoppingBag,
  Calculator,
  PlusCircle,
  ArrowLeft
} from "lucide-react";
import API from "../services/api";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [productCount, setProductCount] = useState(0);
  const [priceCount, setPriceCount] = useState(0);
  const [shoppingCount, setShoppingCount] = useState(0);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const savedUser = JSON.parse(
          localStorage.getItem("cartwiseUser") || "null"
        );

        setUser(savedUser);

        const [products, prices, lists] = await Promise.all([
          API.get("/products"),
          API.get("/prices"),
          API.get("/shoppinglists")
        ]);

        setProductCount(products.data.length);
        setPriceCount(prices.data.length);

        const userList = lists.data.find(
          (list) =>
            list.user &&
            list.user._id === savedUser?.id
        );

        setShoppingCount(userList ? userList.items.length : 0);
      } catch (error) {
        console.log("Dashboard error:", error);
      }
    }

    loadDashboard();
  }, []);

  const cards = [
    {
      title: "Compare Prices",
      description: "Compare grocery prices and find the best deals.",
      icon: <ShoppingBag size={38} />,
      path: "/compare",
      detail: `${priceCount} shop price records`
    },
    {
      title: "Price Tracker",
      description: "Track grocery prices and view price history.",
      icon: <TrendingUp size={38} />,
      path: "/tracker",
      detail: `${productCount} grocery products`
    },
    {
      title: "Shopping List",
      description: "Create and manage your grocery shopping list.",
      icon: <ShoppingCart size={38} />,
      path: "/shopping-list",
      detail: `${shoppingCount} saved items`
    },
    {
      title: "Add Product",
      description: "Add new grocery products and shop prices.",
      icon: <PlusCircle size={38} />,
      path: "/add-product",
      detail: `${productCount} products saved`
    },
    {
      title: "Shopping Calculator",
      description: "Calculate your total grocery shopping expenses.",
      icon: <Calculator size={38} />,
      path: "/shopping-total",
      detail: "View your shopping total"
    }
  ];

  return (
    <div style={{
      background: "#fffaf2",
      minHeight: "100vh",
      padding: "40px 7%",
      color: "#493426"
    }}>

      <div style={{
        background: "#765239",
        color: "white",
        padding: "35px",
        borderRadius: "18px",
        display: "flex",
        alignItems: "center",
        gap: "20px",
        flexWrap: "wrap"
      }}>
        <ShoppingCart size={55} />

        <div>
          <h1 style={{ margin: "0 0 10px", fontSize: "32px" }}>
            Welcome to CartWise!
          </h1>

          <p style={{ margin: 0, fontSize: "17px" }}>
            Hello, {user?.name || "User"}! Manage your grocery shopping easily.
          </p>
        </div>
      </div>

      <h1 style={{
        textAlign: "center",
        marginTop: "40px",
        marginBottom: "10px"
      }}>
        Your Dashboard
      </h1>

      <p style={{
        textAlign: "center",
        color: "#92765e",
        marginBottom: "35px"
      }}>
        Choose a feature to manage your groceries.
      </p>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
        gap: "25px"
      }}>
        {cards.map((card) => (
          <Link
            key={card.path}
            to={card.path}
            style={{
              textDecoration: "none",
              color: "#493426"
            }}
          >
            <div
              style={{
                background: "white",
                padding: "30px 22px",
                borderRadius: "16px",
                textAlign: "center",
                boxShadow: "0 5px 20px #00000012",
                minHeight: "190px",
                transition: "transform 0.2s"
              }}
            >
              <div style={{ color: "#765239" }}>
                {card.icon}
              </div>

              <h2 style={{
                fontSize: "21px",
                margin: "18px 0 10px"
              }}>
                {card.title}
              </h2>

              <p style={{
                color: "#92765e",
                fontSize: "14px",
                lineHeight: "1.6"
              }}>
                {card.description}
              </p>

              <p style={{
                color: "#765239",
                fontSize: "13px",
                fontWeight: "bold"
              }}>
                {card.detail}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div style={{
        textAlign: "center",
        marginTop: "40px"
      }}>
        <Link to="/" style={{
          color: "#765239",
          textDecoration: "none",
          fontSize: "16px"
        }}>
          <ArrowLeft size={17} /> Back to Home
        </Link>
      </div>

    </div>
  );
}

export default Dashboard;