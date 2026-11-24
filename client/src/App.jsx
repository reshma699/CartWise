import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import ComparePrices from "./pages/ComparePrices";
import PriceTracker from "./pages/PriceTracker";
import ShoppingList from "./pages/ShoppingList";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProductDetails from "./pages/ProductDetails";
import AddProduct from "./pages/AddProduct";
import ShoppingTotal from "./pages/ShoppingTotal";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/compare" element={<ComparePrices />} />
        <Route path="/tracker" element={<PriceTracker />} />
        <Route path="/shopping-list" element={<ShoppingList />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/shopping-total" element={<ShoppingTotal />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;