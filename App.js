import React, { useState } from "react";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const addItem = () => {
    if (!name || !price) {
      alert("Please enter both item name and price");
      return;
    }

    const exists = items.some(
      (item) => item.name.toLowerCase() === name.toLowerCase()
    );
    if (exists) {
      alert("This item already exists in the list!");
      return;
    }

    const newItem = {
      id: Date.now(),
      name,
      price: parseFloat(price),
    };
    setItems([...items, newItem]);
    setName("");
    setPrice("");
  };

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const clearAll = () => {
    setItems([]);
  };

  const total = items.reduce((sum, item) => sum + item.price, 0);

  const getPriceColor = (price) => {
    if (price < 20) return "green";          
    if (price >= 10 && price <= 50) return "orange";  
    return "red";                             
  };

  return (
    <div className="container">
      <h1>🛒 Shopping List</h1>
      <p>Track your shopping items and their prices</p>

      <div className="summary">
        <div className="card">
          <h3>Items:</h3>
          <p>{items.length}</p>
        </div>
        <div className="card">
          <h3>Total:</h3>
          <p>${total.toFixed(2)}</p>
        </div>
      </div>

      {/* إدخال عنصر جديد */}
      <div className="form">
        <h3>Add New Item</h3>
        <input
          type="text"
          placeholder="Enter item name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price ($)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button className="btn add" onClick={addItem}>
          Add Item
        </button>
      </div>

      <div className="list">
        <div className="list-header">
          <h3>Shopping Items ({items.length})</h3>
          {items.length > 0 && (
            <button className="btn clear" onClick={clearAll}>
              Clear All
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="empty">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
              alt="empty"
            />
            <p>No items yet</p>
            <small>Add your first shopping item above to get started!</small>
          </div>
        ) : (
          <ul>
            {items.map((item) => (
              <li key={item.id} className="list-item">
                <span>
                  {item.name}{" "}
                  <strong style={{ color: getPriceColor(item.price) }}>
                    ${item.price.toFixed(2)}
                  </strong>
                </span>
                <button className="btn remove" onClick={() => removeItem(item.id)}>
                  ✖
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
