import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import ProductList from './pages/ProductList';
import Home from './pages/Home';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import AdminLogin from './pages/AdminLogin'; // Import AdminLogin
import AdminProductPage from './pages/AdminProductPage'; // Import AdminProductPage
import AdminRoute from './components/AdminRoute'; // Import AdminRoute
import Navbar from './components/Navbar'; // Assuming you have a Navbar component

function App() {
  return (
    <Router>
      <CartProvider>
        <Navbar /> 
        {/* Render Navbar outside of Routes to be present on all pages */}
        <div> {/* Add padding top to account for fixed Navbar */}
          <Routes>
            {/* Public Customer Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<Checkout />} />

            {/* Public Admin Login Route */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Protected Admin Routes */}
            <Route element={<AdminRoute />}>
              <Route path="/admin/products" element={<AdminProductPage />} />
            </Route>

            {/* Add other routes as needed */}
          </Routes>
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;