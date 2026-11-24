import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Lock, Mail } from "lucide-react";
import API from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await API.post("/users/login", {
        email,
        password
      });

      localStorage.setItem("cartwiseUser", JSON.stringify(response.data.user));

      alert(response.data.message);
      navigate("/dashboard");

    } catch (error) {
      setMessage(
        error.response?.data?.message || "Login failed. Check your details."
      );
    } finally {
      setLoading(false);
    }
  }

  const inputStyle = {
    width: "100%",
    padding: "16px",
    border: "1px solid #c9ad91",
    borderRadius: "8px",
    fontSize: "16px",
    boxSizing: "border-box"
  };

  return (
    <div style={{
      background: "#fffaf2",
      minHeight: "100vh",
      padding: "50px 6%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "#493426"
    }}>

      <div style={{
        background: "white",
        padding: "45px",
        borderRadius: "16px",
        width: "100%",
        maxWidth: "650px",
        boxShadow: "0 4px 20px #00000012"
      }}>

        <div style={{ textAlign: "center", marginBottom: "35px" }}>
          <ShoppingCart size={48} color="#765239" />
          <h1 style={{ fontSize: "34px", margin: "15px 0 8px" }}>
            Welcome Back!
          </h1>
          <p style={{ color: "#92765e", fontSize: "16px" }}>
            Login to your CartWise account.
          </p>
        </div>

        <form onSubmit={handleLogin}>

          <div style={{ marginBottom: "25px" }}>
            <label style={{ fontWeight: "bold", fontSize: "16px" }}>
              Email Address
            </label>

            <div style={{ position: "relative", marginTop: "10px" }}>
              <Mail size={19} color="#92765e" style={{
                position: "absolute",
                left: "15px",
                top: "17px"
              }} />

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ ...inputStyle, paddingLeft: "48px" }}
              />
            </div>
          </div>

          <div style={{ marginBottom: "30px" }}>
            <label style={{ fontWeight: "bold", fontSize: "16px" }}>
              Password
            </label>

            <div style={{ position: "relative", marginTop: "10px" }}>
              <Lock size={19} color="#92765e" style={{
                position: "absolute",
                left: "15px",
                top: "17px"
              }} />

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ ...inputStyle, paddingLeft: "48px" }}
              />
            </div>
          </div>

          {message && (
            <p style={{ color: "red", marginBottom: "15px" }}>
              {message}
            </p>
          )}

          <button type="submit" disabled={loading} style={{
            width: "100%",
            padding: "16px",
            background: "#765239",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "17px",
            cursor: "pointer"
          }}>
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p style={{ textAlign: "center", marginTop: "28px" }}>
          Don't have an account?{" "}
          <Link to="/register" style={{ color: "#765239", fontWeight: "bold" }}>
            Register
          </Link>
        </p>

        <p style={{ textAlign: "center" }}>
          <Link to="/" style={{ color: "#92765e", textDecoration: "none" }}>
            Back to Home
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;