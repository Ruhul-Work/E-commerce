import React from 'react';
import { useCart } from '../hooks/useCart';

function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  const formattedPrice = parseFloat(product.price).toFixed(2);

  return (
    <div className="bg-white rounded-lg shadow-xl hover:shadow-2xl border border-gray-200 transition-all duration-300 flex flex-col h-full">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover object-center rounded-t-lg"
      />
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-xl font-semibold text-gray-800 mb-2 flex-grow leading-tight hover:text-indigo-600 transition-colors duration-200">
          {product.name}
        </h3>
        <p className="text-gray-500 text-sm mb-2">{product.category}</p>
        <p className="text-indigo-700 font-bold text-xl mt-2 mb-4">৳ {formattedPrice}</p>
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className={`w-full py-2.5 px-4 rounded-lg text-white font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50
            ${product.stock === 0
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
        >
          {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;