import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, PlusCircle, Pencil, Trash2 } from "lucide-react";
import API from "../services/api";

function AddProduct() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Groceries");
  const [description, setDescription] = useState("");
  const [shopName, setShopName] = useState("");
  const [price, setPrice] = useState("");
  const [prices, setPrices] = useState([]);
  const [message, setMessage] = useState("");

  async function loadPrices() {
    try {
      const response = await API.get("/prices");
      setPrices(response.data);
    } catch (error) {
      setMessage("Unable to load prices.");
    }
  }

  useEffect(() => {
    loadPrices();
  }, []);

  async function addProduct(e) {
    e.preventDefault();

    if (!name.trim() || !shopName.trim() || price === "" || Number(price) < 0) {
      setMessage("Please enter valid details.");
      return;
    }

    try {
      const response = await API.get("/products");

      let product = response.data.find(
        (item) => item.name.toLowerCase() === name.trim().toLowerCase()
      );

      if (!product) {
        const result = await API.post("/products", {
          name: name.trim(),
          category,
          description
        });
        product = result.data;
      }

      await API.post("/prices", {
        product: product._id,
        shopName: shopName.trim(),
        price: Number(price)
      });

      setMessage("Product and price saved successfully!");
      setName("");
      setCategory("Groceries");
      setDescription("");
      setShopName("");
      setPrice("");
      loadPrices();
    } catch (error) {
      setMessage("Unable to save product.");
    }
  }

  async function editPrice(id, oldPrice) {
    const newPrice = prompt("Enter new price:", oldPrice);

    if (newPrice === null) return;

    if (newPrice.trim() === "" || !Number.isFinite(Number(newPrice)) || Number(newPrice) < 0) {
      alert("Enter a valid price.");
      return;
    }

    try {
      await API.put(`/prices/${id}`, { price: Number(newPrice) });
      alert("Price updated successfully!");
      loadPrices();
    } catch (error) {
      alert("Unable to update price.");
    }
  }

  async function deletePrice(id) {
    if (!window.confirm("Are you sure you want to delete this price?")) {
      return;
    }

    try {
      await API.delete(`/prices/${id}`);
      alert("Price deleted successfully!");
      loadPrices();
    } catch (error) {
      alert("Unable to delete price.");
    }
  }

  return (
    <div style={pageStyle}>
      <Link to="/dashboard" style={{ color: "#765239" }}>
        <ArrowLeft size={18} /> Back to Dashboard
      </Link>

      <div style={cardStyle}>
        <h1 style={{ textAlign: "center" }}>Add Grocery Product</h1>
        <p style={{ textAlign: "center" }}>
          Add and manage grocery products and prices.
        </p>

        <form onSubmit={addProduct}>
          <label>Grocery Name</label>
          <input style={inputStyle} value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Example: Rice 1 kg" />

          <label>Category</label>
          <input style={inputStyle} value={category}
            onChange={(e) => setCategory(e.target.value)} />

          <label>Description</label>
          <input style={inputStyle} value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Product description" />

          <label>Shop Name</label>
          <input style={inputStyle} value={shopName}
            onChange={(e) => setShopName(e.target.value)}
            placeholder="Example: DMart" />

          <label>Price (₹)</label>
          <input style={inputStyle} type="number" min="0" step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter price" />

          <button type="submit" style={buttonStyle}>
            <PlusCircle size={18} /> Save Product and Price
          </button>
        </form>

        <p>{message}</p>

        <h2>Manage Grocery Prices</h2>

        {prices.map((item) => (
          <div key={item._id} style={itemStyle}>
            <div>
              <strong>{item.product?.name || "Unknown Product"}</strong>
              <p>{item.shopName}</p>
              <strong>₹{Number(item.price).toFixed(2)}</strong>
            </div>

            <div>
              <button type="button"
                onClick={() => editPrice(item._id, item.price)}
                style={buttonStyle}>
                <Pencil size={16} /> Edit
              </button>

              <button type="button"
                onClick={() => deletePrice(item._id)}
                style={deleteStyle}>
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const pageStyle = {
  background: "#fffaf2",
  minHeight: "100vh",
  padding: "40px 8%",
  color: "#493426"
};

const cardStyle = {
  maxWidth: "850px",
  margin: "30px auto",
  background: "white",
  padding: "30px",
  borderRadius: "18px",
  boxShadow: "0 5px 20px #00000012"
};

const inputStyle = {
  display: "block",
  width: "100%",
  boxSizing: "border-box",
  padding: "13px",
  margin: "8px 0 18px",
  border: "1px solid #c9ad91",
  borderRadius: "8px"
};

const buttonStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: "7px",
  padding: "10px 15px",
  margin: "5px",
  background: "#765239",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer"
};

const deleteStyle = {
  ...buttonStyle,
  background: "#a34b2e"
};

const itemStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "10px",
  padding: "15px",
  marginTop: "12px",
  background: "#fffaf2",
  borderRadius: "10px"
};

export default AddProduct;