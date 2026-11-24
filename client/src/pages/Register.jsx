import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, User, Mail, Lock } from "lucide-react";
import API from "../services/api";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await API.post("/users/register", {
        name,
        email,
        password
      });

      alert(response.data.message);
      navigate("/login");

    } catch (error) {
      setMessage(
        error.response?.data?.message || "Registration failed. Try again."
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
    boxSizing: "border-box",
    marginTop: "10px"
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
            Create Your Account
          </h1>
          <p style={{ color: "#92765e", fontSize: "16px" }}>
            Join CartWise and start shopping smarter.
          </p>
        </div>

        <form onSubmit={handleRegister}>

          <div style={{ marginBottom: "24px" }}>
            <label style={{ fontWeight: "bold", fontSize: "16px" }}>
              Full Name
            </label>
            <div style={{ position: "relative", marginTop: "10px" }}>
              <User size={19} color="#92765e" style={{
                position: "absolute", left: "15px", top: "17px"
              }} />
              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{ ...inputStyle, paddingLeft: "48px", marginTop: 0 }}
              />
            </div>
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label style={{ fontWeight: "bold", fontSize: "16px" }}>
              Email Address
            </label>
            <div style={{ position: "relative", marginTop: "10px" }}>
              <Mail size={19} color="#92765e" style={{
                position: "absolute", left: "15px", top: "17px"
              }} />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ ...inputStyle, paddingLeft: "48px", marginTop: 0 }}
              />
            </div>
          </div>

          <div style={{ marginBottom: "30px" }}>
            <label style={{ fontWeight: "bold", fontSize: "16px" }}>
              Password
            </label>
            <div style={{ position: "relative", marginTop: "10px" }}>
              <Lock size={19} color="#92765e" style={{
                position: "absolute", left: "15px", top: "17px"
              }} />
              <input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength="6"
                required
                style={{ ...inputStyle, paddingLeft: "48px", marginTop: 0 }}
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
            {loading ? "Registering..." : "Register"}
          </button>

        </form>

        <p style={{ textAlign: "center", marginTop: "28px" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#765239", fontWeight: "bold" }}>
            Login
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

export default Register;