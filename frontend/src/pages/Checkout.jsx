import React, { useState } from 'react';
import { useCart } from '../hooks/useCart';
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const { cartItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customer_name: '',
    phone: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (cartItems.length === 0) {
      setError("Your cart is empty. Please add items before checking out.");
      setLoading(false);
      return;
    }

    const orderPayload = {
      customer_name: formData.customer_name,
      phone: formData.phone,
      address: formData.address,
      items: cartItems.map(item => ({
        id: item.id,
        price: parseFloat(item.price), // Ensure price is a number
        qty: item.qty,
      })),
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(orderPayload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Order placed successfully:", result);
      setOrderSuccess(true);
      clearCart(); // Clear cart after successful order
      // Redirect to product list after a short delay
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (err) {
      setError(err.message || "Failed to place order. Please try again.");
      console.error("Error placing order:", err);
    } finally {
      setLoading(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-green-50 p-6">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-24 h-24 text-green-500 mb-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h1 className="text-4xl font-extrabold text-green-700 mb-4">Order Placed Successfully!</h1>
        <p className="text-xl text-gray-700 mb-8 text-center max-w-md">Thank you for your purchase. Your order has been confirmed and will be processed shortly. You will be redirected to the product list.</p>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Checkout</h1>
        <p className="text-xl text-gray-600 mb-10 text-center max-w-md">Your cart is empty. Please add items to your cart before proceeding to checkout.</p>
        <button
          onClick={() => navigate('/')}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-8 rounded-lg shadow-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 md:p-8 max-w-6xl">
      <h1 className="text-4xl font-bold text-gray-800 mb-10 text-center">Checkout</h1>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6 flex items-center justify-between" role="alert">
          <p className="flex-grow">
            <strong className="font-bold">Error:</strong> {error}
          </p>
          <button onClick={() => setError(null)} className="text-red-700 hover:text-red-900 ml-4 font-bold">
            &times;
          </button>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Shipping Information Form */}
        <div className="bg-white shadow-xl rounded-lg p-8 lg:w-1/2 order-2 lg:order-1">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Shipping Information</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="customer_name" className="block text-base font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="customer_name"
                name="customer_name"
                value={formData.customer_name}
                onChange={handleInputChange}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-base"
                placeholder="John Doe"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="phone" className="block text-base font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-base"
                placeholder="e.g., 01712345678"
                required
              />
            </div>
            <div className="mb-8">
              <label htmlFor="address" className="block text-base font-medium text-gray-700 mb-1">
                Shipping Address
              </label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                rows="4"
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-base"
                placeholder="Street Address, City, Postal Code"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={loading || cartItems.length === 0}
              className={`w-full py-3.5 px-8 rounded-lg text-white font-bold text-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50
                ${loading || cartItems.length === 0
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
            >
              {loading ? 'Placing Order...' : 'Place Order'}
            </button>
          </form>
        </div>

        {/* Order Summary Card */}
        <div className="bg-white shadow-xl rounded-lg p-8 h-fit lg:w-1/2 order-1 lg:order-2">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>
          <ul className="mb-4">
            {cartItems.map((item) => (
              <li key={item.id} className="flex justify-between py-3 border-b border-gray-100 last:border-b-0">
                <span className="text-gray-700">{item.name} <span className="font-medium text-gray-500">x {item.qty}</span></span>
                <span className="font-semibold text-gray-800">৳ {(item.price * item.qty).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between items-center py-4 border-t border-gray-200 mt-4">
            <span className="text-xl font-bold text-gray-800">Total:</span>
            <span className="text-2xl font-extrabold text-gray-900">৳ {totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;