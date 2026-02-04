import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';

function ProductList({ selectedCategory }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/products");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Filter for active products and parse price to number
        const activeProducts = data
          .filter(product => product.is_active === 1)
          .map(product => ({
            ...product,
            price: parseFloat(product.price) // Ensure price is a number
          }));
        setProducts(activeProducts);
      } catch (err) {
        setError("Failed to fetch products. Please try again later.");
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Effect to filter products whenever the original products or selectedCategory changes
  useEffect(() => {
    if (selectedCategory === 'All' || !selectedCategory) {
      setFilteredProducts(products);
    } else {
      // Assuming 'category' is a property on your product objects.
      // Adjust 'product.category' based on your actual product data structure.
      // For now, assuming product.category is a string that directly matches selectedCategory.
      // If product.category is an object, like { name: 'T-Shirt' }, then use product.category.name.
      setFilteredProducts(
        products.filter(product => product.category === selectedCategory)
      );
    }
  }, [products, selectedCategory]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold">
        Loading products...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-xl text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">Our Products</h1>
        <p className="text-lg md:text-xl text-gray-600">Handpicked styles just for you</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductList;