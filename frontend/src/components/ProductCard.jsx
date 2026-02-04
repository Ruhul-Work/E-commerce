import React from 'react';
import { useCart } from '../hooks/useCart';

function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  const formattedPrice = parseFloat(product.price).toFixed(2);

  return (
    <div className="group relative bg-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex flex-col h-full overflow-hidden">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover object-center rounded-t-xl"
      />
      <div className="p-4 flex-grow flex flex-col">
        {/* Product Name and Category */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800 leading-tight hover:text-yellow-700 transition-colors duration-200 pr-2">
            {product.name}
          </h3>
          {product.category && (
            <p className="text-xs text-gray-500 tracking-wide px-2 py-0.5 bg-gray-50 rounded-full w-fit flex-shrink-0">
              {product.category}
            </p>
          )}
        </div>

        {/* Price */}
        <p className="text-yellow-600 font-bold text-xl mt-auto mb-2">৳ {formattedPrice}</p>

        {/* Add to Cart Button (Always visible) */}
        <div className="mt-2 md:mt-0 md:absolute md:bottom-4 md:right-4 w-full md:w-auto transition-opacity duration-300">
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`w-full md:w-auto px-4 py-2 text-sm rounded-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50
              ${product.stock === 0
                ? 'bg-gray-400 cursor-not-allowed text-white'
                : 'bg-transparent border border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white'
              }`}
          >
            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;