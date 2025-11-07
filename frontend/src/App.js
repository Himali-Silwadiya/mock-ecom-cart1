import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import "./App.css";

function App() {
  return (
    <Router>
      <nav className="navbar">
        <h1>🛍 Mock E-Commerce</h1>
        <div className="nav-links">
          <Link to="/">Products</Link>
          <Link to="/cart">Cart</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;
