
import React, { useEffect, useState, useContext } from "react";
import { getProducts } from "../services/api";
import { CartContext } from "../context/CartContext";
import "./ProductList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [addedItems, setAddedItems] = useState([]); // ✅ inside the component
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await getProducts();
        console.log("Products loaded:", data);
        setProducts(data);
      } catch (error) {
        console.error("Failed to load products", error);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedItems((prev) => [...prev, product.id || product._id]);

    // Optional: revert back after 1.5 seconds
    setTimeout(() => {
      setAddedItems((prev) =>
        prev.filter((id) => id !== (product.id || product._id))
      );
    }, 1500);
  };

  return (
    <div className="product-page">
      <h2 className="product-title">🛒 Product Catalog</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            {product.image && (
              <img
                src={product.image}
                alt={product.title}
                className="product-image"
              />
            )}
            <h4 className="product-name">{product.title}</h4>
            <p className="product-price">Price: ₹{product.price}</p>

            <button
              className={`btn primary ${
                addedItems.includes(product.id || product._id) ? "added" : ""
              }`}
              onClick={() => handleAddToCart(product)}
            >
              {addedItems.includes(product.id || product._id)
                ? "Added!"
                : "Add to Cart"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
