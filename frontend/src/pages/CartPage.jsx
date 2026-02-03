import React from 'react';
import { useCart } from '../hooks/useCart';
import { Link } from 'react-router-dom';

function CartPage() {
  const { cartItems, updateQty, removeFromCart, totalPrice } = useCart();

  const handleIncreaseQty = (id, currentQty) => {
    updateQty(id, currentQty + 1);
  };

  const handleDecreaseQty = (id, currentQty) => {
    if (currentQty > 1) {
      updateQty(id, currentQty - 1);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Your Cart</h1>
        <p className="text-xl text-gray-600 mb-10">Your cart is currently empty.</p>
        <Link
          to="/"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-8 rounded-lg shadow-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 md:p-8 max-w-6xl">
      <h1 className="text-4xl font-bold text-gray-800 mb-10 text-center">Your Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items Table */}
        <div className="lg:w-2/3 bg-white shadow-xl rounded-lg overflow-hidden mb-8">
          <div className="overflow-x-auto"> {/* Added for horizontal scrolling on small screens */}
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Product</th>
                  <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Price</th>
                  <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Quantity</th>
                  <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Subtotal</th>
                  <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-20 w-20">
                          <img className="h-20 w-20 rounded-lg object-cover" src={item.image} alt={item.name} />
                        </div>
                        <div className="ml-4">
                          <div className="text-base font-semibold text-gray-900">{item.name}</div>
                          <div className="text-sm text-gray-500 mt-1">{item.category}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-base text-gray-700">৳ {parseFloat(item.price).toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-base text-gray-700">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleDecreaseQty(item.id, item.qty)}
                          disabled={item.qty === 1}
                          className="bg-gray-200 text-gray-700 hover:bg-gray-300 w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          min="1"
                          value={item.qty}
                          onChange={(e) => updateQty(item.id, parseInt(e.target.value))}
                          className="w-16 border-gray-300 rounded-md shadow-sm p-2 text-base text-center focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <button
                          onClick={() => handleIncreaseQty(item.id, item.qty)}
                          className="bg-gray-200 text-gray-700 hover:bg-gray-300 w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-base text-gray-700">৳ {(item.price * item.qty).toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 hover:text-red-800 font-medium transition-colors duration-200 w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-100"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Cart Summary */}
        <div className="lg:w-1/3 bg-white shadow-xl rounded-lg p-8 h-fit">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <span className="text-lg text-gray-700">Subtotal:</span>
            <span className="text-lg font-semibold text-gray-900">৳ {totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center py-2 mb-6">
            <span className="text-2xl font-extrabold text-gray-900">Total:</span>
            <span className="text-2xl font-extrabold text-gray-900">৳ {totalPrice.toFixed(2)}</span>
          </div>
          <Link
            to="/checkout"
            className="w-full inline-block text-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-8 rounded-lg shadow-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
