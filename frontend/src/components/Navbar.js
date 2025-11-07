import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

const Navbar = () => {
  const { cart } = useContext(CartContext);

  return (
    <nav
      style={{
        backgroundColor: "#007bff",
        color: "white",
        padding: "10px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h2>Mock Ecom</h2>
      <div style={{ fontSize: "18px" }}>
        🛒 Cart ({cart.length})
      </div>
    </nav>
  );
};

export default Navbar;
