// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5000/api",
// });

// export const getProducts = () => API.get("/products");
// export const getCart = () => API.get("/cart");
// export const addToCart = (product) => API.post("/cart", { ...product });
// export const removeFromCart = (id) => API.delete(`/cart/${id}`);
// // export const checkout = (cartItems) => API.post("/checkout", { cartItems });
// export const checkout = (payload) => API.post("/checkout", payload);

import axios from "axios";

// ✅ Use Fake Store API for products
export const getProducts = () => axios.get("https://fakestoreapi.com/products");

// ✅ Keep your local backend for cart + checkout
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const getCart = () => API.get("/cart");
export const addToCart = (product) => API.post("/cart", { ...product });
export const removeFromCart = (id) => API.delete(`/cart/${id}`);
export const checkout = (cartItems) => API.post("/checkout", cartItems);
