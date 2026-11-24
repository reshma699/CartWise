import React from "react";
import {
  ShoppingCart,
  Target,
  TrendingDown,
  Users,
  CheckCircle
} from "lucide-react";

function About() {
  return (
    <div style={{ background: "#fffaf2", minHeight: "100vh", padding: "50px 7%", color: "#493426" }}>

      <div style={{ textAlign: "center", maxWidth: "750px", margin: "auto" }}>
        <h1 style={{ fontSize: "38px" }}>About CartWise</h1>
        <p style={{ fontSize: "17px", lineHeight: "1.8", color: "#806b58" }}>
          CartWise is a grocery price comparison and tracking platform
          designed to help people shop smarter and save money.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "25px", marginTop: "55px" }}>

        <div style={{ background: "white", padding: "28px", borderRadius: "12px", textAlign: "center" }}>
          <ShoppingCart size={38} color="#765239" />
          <h2>Our Purpose</h2>
          <p>Make grocery shopping simple and convenient for everyone.</p>
        </div>

        <div style={{ background: "white", padding: "28px", borderRadius: "12px", textAlign: "center" }}>
          <Target size={38} color="#765239" />
          <h2>Our Mission</h2>
          <p>Help users compare prices from different shops in one place.</p>
        </div>

        <div style={{ background: "white", padding: "28px", borderRadius: "12px", textAlign: "center" }}>
          <TrendingDown size={38} color="#765239" />
          <h2>Our Vision</h2>
          <p>Support smarter shopping and better savings decisions.</p>
        </div>

        <div style={{ background: "white", padding: "28px", borderRadius: "12px", textAlign: "center" }}>
          <Users size={38} color="#765239" />
          <h2>Who We Help</h2>
          <p>Families, students and everyday grocery shoppers.</p>
        </div>

      </div>

      <div style={{ marginTop: "50px", background: "#765239", color: "white", padding: "35px", borderRadius: "12px", textAlign: "center" }}>
        <CheckCircle size={35} />
        <h2>Shop Smart. Compare Better. Save More.</h2>
        <p>CartWise makes every grocery shopping decision easier.</p>
      </div>

    </div>
  );
}

export default About;