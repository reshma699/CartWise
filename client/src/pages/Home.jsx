import React from "react";
import {
  ShoppingCart,
  Search,
  TrendingDown,
  ChartNoAxesCombined,
  ClipboardList,
  ArrowRight,
  Tag
} from "lucide-react";

import "./Home.css";

function Home() {
  return (
    <div className="home-page">

      {/* Navigation Bar */}
      <header className="navbar">
        <div className="logo">
          <ShoppingCart size={28} />
          <span>CartWise</span>
        </div>

        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#compare">Compare Prices</a>
          <a href="#tracker">Price Tracker</a>
          <a href="#shopping">Shopping List</a>
          <a href="#about">About</a>
        </nav>

        <div className="nav-buttons">
          <a href="/login" className="login-btn">Login</a>
          <a href="/register" className="register-btn">Register</a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero" id="home">

        <div className="hero-content">
          <p className="hero-tag">
            <Tag size={16} /> SMART GROCERY SHOPPING
          </p>

          <h1>
            Shop Smart.
            <br />
            <span>Save More.</span>
          </h1>

          <p className="hero-description">
            Compare grocery prices across different shops,
            find the cheapest deals and track price changes
            with CartWise.
          </p>

          <div className="hero-buttons">
            <a href="#compare" className="primary-btn">
              Compare Prices <ArrowRight size={18} />
            </a>

            <a href="#features" className="secondary-btn">
              Explore Features
            </a>
          </div>

          <div className="hero-stats">
            <div>
              <h3>Easy</h3>
              <p>Price Comparison</p>
            </div>

            <div>
              <h3>Smart</h3>
              <p>Shopping Decisions</p>
            </div>

            <div>
              <h3>Simple</h3>
              <p>Budget Tracking</p>
            </div>
          </div>
        </div>

        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=900"
            alt="Fresh grocery vegetables and fruits"
          />
        </div>

      </section>

      {/* Features Section */}
      <section className="features" id="features">

        <div className="section-heading">
          <p>WHAT WE OFFER</p>
          <h2>Everything You Need for Smart Shopping</h2>
          <span>
            Make better shopping decisions and save money
            on your everyday groceries.
          </span>
        </div>

        <div className="feature-container">

          <div className="feature-card" id="compare">
            <div className="feature-icon">
              <Search size={28} />
            </div>
            <h3>Compare Prices</h3>
            <p>
              Compare the prices of grocery products
              across different shops.
            </p>
            <a href="/compare">
              Explore <ArrowRight size={16} />
            </a>
          </div>

          <div className="feature-card" id="tracker">
            <div className="feature-icon">
              <TrendingDown size={28} />
            </div>
            <h3>Price Tracker</h3>
            <p>
              Track product price changes and
              discover better buying opportunities.
            </p>
            <a href="/tracker">
              Explore <ArrowRight size={16} />
            </a>
          </div>

          <div className="feature-card" id="shopping">
            <div className="feature-icon">
              <ClipboardList size={28} />
            </div>
            <h3>Shopping List</h3>
            <p>
              Create your grocery shopping list
              and organize your daily purchases.
            </p>
            <a href="/shopping-list">
              Explore <ArrowRight size={16} />
            </a>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <ChartNoAxesCombined size={28} />
            </div>
            <h3>Shopping Calculator</h3>
            <p>
              Calculate your shopping total and
              manage your grocery budget.
            </p>
            <a href="/shopping-total">
              Explore <ArrowRight size={16} />
            </a>
          </div>

        </div>
      </section>

      {/* About Section */}
      <section className="about-section" id="about">
        <h2>Why Choose CartWise?</h2>
        <p>
          CartWise helps you compare grocery prices,
          discover affordable shops, monitor price
          changes and plan your shopping expenses
          in one convenient place.
        </p>
      </section>

      {/* Footer */}
      <footer className="footer">
        <h3>CartWise</h3>
        <p>Shop Smart. Save More.</p>
        <p>© 2026 CartWise. All Rights Reserved.</p>
      </footer>

    </div>
  );
}

export default Home;