import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ShoppingCart, PlusCircle, Trash2 } from "lucide-react";
import API from "../services/api";

function ShoppingList() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [products, setProducts] = useState([]);
  const [listId, setListId] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(
    localStorage.getItem("cartwiseUser") || "null"
  );

  useEffect(() => {
    loadShoppingList();
  }, []);

  async function loadShoppingList() {
    try {
      const [productResponse, listResponse] = await Promise.all([
        API.get("/products"),
        API.get("/shoppinglists")
      ]);

      setProducts(productResponse.data);

      const userList = listResponse.data.find(
        (list) => list.user && list.user._id === user?.id
      );

      if (userList) {
        setListId(userList._id);

        const savedItems = userList.items.map((item) => ({
          productId: item.product?._id,
          name: item.product?.name || "Unknown Product",
          price: Number(item.price || 0),
          quantity: Number(item.quantity || 1)
        }));

        setItems(savedItems);
      }
    } catch (error) {
      setMessage("Unable to load your shopping list.");
    } finally {
      setLoading(false);
    }
  }

  async function saveShoppingList(updatedItems) {
    try {
      const responseItems = updatedItems.map((item) => ({
        product: item.productId,
        quantity: Number(item.quantity),
        price: Number(item.price)
      }));

      const data = {
        user: user.id,
        items: responseItems
      };

      if (listId) {
        await API.put(`/shoppinglists/${listId}`, data);
      } else {
        const response = await API.post("/shoppinglists", data);
        setListId(response.data._id);
      }

      setItems(updatedItems);
      setMessage("Shopping list saved successfully!");
    } catch (error) {
      setMessage("Unable to save shopping list.");
    }
  }

  async function addItem() {
    if (!name.trim() || price === "" || Number(price) < 0 ||
        !Number.isInteger(Number(quantity)) || Number(quantity) < 1) {
      setMessage("Enter a valid product name, price and quantity.");
      return;
    }

    try {
      let product = products.find(
        (item) => item.name.toLowerCase() === name.trim().toLowerCase()
      );

      if (!product) {
        const response = await API.post("/products", {
          name: name.trim(),
          category: "Groceries",
          description: ""
        });

        product = response.data;
        setProducts((previous) => [...previous, product]);
      }

      const updatedItems = [
        ...items,
        {
          productId: product._id,
          name: product.name,
          price: Number(price),
          quantity: Number(quantity)
        }
      ];

      await saveShoppingList(updatedItems);

      setName("");
      setPrice("");
      setQuantity(1);
    } catch (error) {
      setMessage("Unable to add this grocery item.");
    }
  }

  async function removeItem(index) {
    const updatedItems = items.filter((item, i) => i !== index);
    await saveShoppingList(updatedItems);
  }

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
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
        textDecoration: "none"
      }}>
        <ArrowLeft size={18} /> Back to Dashboard
      </Link>

      <div style={{
        maxWidth: "850px",
        margin: "35px auto",
        background: "white",
        padding: "35px",
        borderRadius: "18px",
        boxShadow: "0 5px 20px #00000012"
      }}>
        <div style={{ textAlign: "center" }}>
          <ShoppingCart size={45} color="#765239" />
          <h1>My Shopping List</h1>
          <p style={{ color: "#92765e" }}>
            Add and manage your grocery items.
          </p>
        </div>

        <h2>Add Grocery Item</h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "15px"
        }}>
          <input
            placeholder="Grocery name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
          />

          <input
            type="number"
            placeholder="Price (₹)"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={inputStyle}
          />

          <input
            type="number"
            placeholder="Quantity"
            min="1"
            step="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            style={inputStyle}
          />
        </div>

        <button onClick={addItem} style={buttonStyle}>
          <PlusCircle size={18} /> Add Item
        </button>

        {message && (
          <p style={{ color: "#765239", marginTop: "15px" }}>
            {message}
          </p>
        )}

        <h2 style={{ marginTop: "35px" }}>Saved Grocery Items</h2>

        {loading ? (
          <p>Loading your shopping list...</p>
        ) : items.length === 0 ? (
          <p>Your shopping list is empty.</p>
        ) : (
          items.map((item, index) => (
            <div key={`${item.productId}-${index}`} style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "12px",
              flexWrap: "wrap",
              padding: "16px",
              marginTop: "12px",
              background: "#fffaf2",
              borderRadius: "10px"
            }}>
              <div>
                <strong>{item.name}</strong>
                <p style={{ margin: "6px 0" }}>
                  ₹{item.price.toFixed(2)} × {item.quantity}
                </p>
                <strong>
                  Item Total: ₹{(item.price * item.quantity).toFixed(2)}
                </strong>
              </div>

              <button
                onClick={() => removeItem(index)}
                style={{
                  background: "#a34b2e",
                  color: "white",
                  border: "none",
                  padding: "10px",
                  borderRadius: "8px",
                  cursor: "pointer"
                }}
              >
                <Trash2 size={17} /> Remove
              </button>
            </div>
          ))
        )}

        <div style={{
          marginTop: "25px",
          padding: "22px",
          background: "#edf4e8",
          borderRadius: "12px",
          textAlign: "center"
        }}>
          <h2>Shopping List Total</h2>
          <h1 style={{ color: "#356b35", fontSize: "36px" }}>
            ₹{total.toFixed(2)}
          </h1>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: "14px",
  border: "1px solid #c9ad91",
  borderRadius: "8px",
  fontSize: "15px"
};

const buttonStyle = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  marginTop: "18px",
  padding: "13px 22px",
  background: "#765239",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer"
};

export default ShoppingList;