
import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { checkout } from "../services/api";
import "./Cart.css";

const Cart = () => {
  const { cartItems, addToCart, removeFromCart, clearCart, totalAmount } =
    useContext(CartContext);

  const [editingItem, setEditingItem] = useState(null);
  const [newQty, setNewQty] = useState(1);
  const [checkoutForm, setCheckoutForm] = useState({ name: "", email: "" });
  const [errors, setErrors] = useState({});
  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!checkoutForm.name.trim()) e.name = "Name is required";

    // Basic email regex
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!checkoutForm.email.trim()) e.email = "Email is required";
    else if (!emailRe.test(checkoutForm.email)) e.email = "Enter a valid email";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleUpdate = (item) => {
    const diff = newQty - item.quantity;
    if (diff > 0) {
      for (let i = 0; i < diff; i++) addToCart(item);
    } else if (diff < 0) {
      for (let i = 0; i < Math.abs(diff); i++) removeFromCart(item.id || item._id);
    }
    setEditingItem(null);
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    if (!validate()) return;

    setLoading(true);
    try {
      // ✅ Match backend expected payload
      const payload = {
        name: checkoutForm.name.trim(),
        email: checkoutForm.email.trim(),
        items: cartItems,
        total: totalAmount,
      };

      const { data } = await checkout(payload);

      setReceipt({
        name: payload.name,
        email: payload.email,
        total: data.total ?? totalAmount,
        timestamp: data.timestamp ?? new Date().toLocaleString(),
        message: data.message ?? "Checkout successful",
      });

      clearCart();
      setCheckoutForm({ name: "", email: "" });
      setErrors({});
    } catch (err) {
      console.error("Checkout failed", err);
      alert("Checkout failed. Check server and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cart-container">
      <h2 className="cart-heading">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="empty">Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cartItems.map((item) => {
              const id = item.id ?? item._id;
              return (
                <li key={id} className="cart-item">
                  {editingItem === id ? (
                    <div className="cart-item-edit">
                      <span className="item-name">{item.name}</span>
                      <input
                        className="qty-input"
                        type="number"
                        min="1"
                        value={newQty}
                        onChange={(ev) => setNewQty(parseInt(ev.target.value) || 1)}
                      />
                      <button className="btn small" onClick={() => handleUpdate(item)}>
                        Update
                      </button>
                      <button
                        className="btn small muted"
                        onClick={() => setEditingItem(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="cart-item-row">
                      <div>
                        <div className="item-name">{item.name}</div>
                        <div className="item-meta">
                          ₹{item.price} × {item.quantity}
                        </div>
                      </div>

                      <div className="item-actions">
                        <button
                          className="btn small"
                          onClick={() => {
                            setEditingItem(id);
                            setNewQty(item.quantity);
                          }}
                        >
                          Update
                        </button>
                        <button
                          className="btn small danger"
                          onClick={() => removeFromCart(item.id ?? item._id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="cart-summary">
            <div className="total-label">Total</div>
            <div className="total-amount">₹{totalAmount}</div>
          </div>

          <form className="checkout-form" onSubmit={handleCheckout} noValidate>
            <h3 className="form-title">Checkout Details</h3>

            <label className="form-row">
              <span className="form-label">Full name</span>
              <input
                className={`form-input ${errors.name ? "invalid" : ""}`}
                type="text"
                value={checkoutForm.name}
                onChange={(e) =>
                  setCheckoutForm({ ...checkoutForm, name: e.target.value })
                }
                placeholder="e.g. Jane Doe"
              />
              {errors.name && <div className="form-error">{errors.name}</div>}
            </label>

            <label className="form-row">
              <span className="form-label">Email address</span>
              <input
                className={`form-input ${errors.email ? "invalid" : ""}`}
                type="email"
                value={checkoutForm.email}
                onChange={(e) =>
                  setCheckoutForm({ ...checkoutForm, email: e.target.value })
                }
                placeholder="you@example.com"
              />
              {errors.email && <div className="form-error">{errors.email}</div>}
            </label>

            <div className="form-actions">
              <button type="submit" className="btn primary" disabled={loading}>
                {loading ? "Processing…" : "Complete Checkout"}
              </button>
            </div>
          </form>
        </>
      )}

      {receipt && (
        <div className="receipt-box">
          <h3>🧾 Mock Receipt</h3>
          <p>{receipt.message}</p>
          <p>
            <strong>Name:</strong> {receipt.name}
          </p>
          <p>
            <strong>Email:</strong> {receipt.email}
          </p>
          <p>
            <strong>Total:</strong> ₹{receipt.total}
          </p>
          <p>
            <strong>Time:</strong> {receipt.timestamp}
          </p>
          <button className="btn" onClick={() => setReceipt(null)}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
