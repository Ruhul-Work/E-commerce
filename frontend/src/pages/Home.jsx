import Navbar from '../components/Navbar';
import ProductList from '../pages/ProductList';
import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import { useLocation } from 'react-router-dom';

function Home() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = [
    { name: 'All', icon: '🛒' },
    { name: 'T-Shirt', icon: '👕' },
    { name: 'Panjabi', icon: '👔' },
    { name: 'Hijab', icon: '🧕' },
    { name: 'Accessories', icon: '💍' },
  ];
  const handleScrollToProducts = () => {
    document.getElementById('products-section').scrollIntoView({ behavior: 'smooth' });
  };

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('scrollTo') === 'products') {
      // Small delay to ensure the page has rendered and the section is in the DOM
      // before attempting to scroll.
      const timer = setTimeout(() => {
        const productsSection = document.getElementById('products-section');
        if (productsSection) {
          productsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100); // 100ms delay

      return () => clearTimeout(timer); // Cleanup timeout if component unmounts
    }
  }, [location.search]);

  return (
    <>
      {/* <Navbar /> */}
      <section className="bg-white py-20 md:py-32">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Left Column */}
          <div className="text-center md:text-left">
            {/* Delivery Badge */}
            <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold rounded-full border border-yellow-600 text-yellow-600 bg-yellow-50 bg-opacity-30">
              Nationwide home delivery – only ৳70
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 leading-tight mb-4">
              Premium Clothing for <span className="text-yellow-600">Everyday Style</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Discover our exclusive collection of high-quality apparel designed for <span className="text-yellow-600">comfort and elegance</span>.
            </p>

            {/* Buttons Layout */}
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
              {/* Shop Now Button */}
              <button
                onClick={handleScrollToProducts}
                className="px-12 py-3 bg-yellow-600 text-white font-bold rounded-full shadow-lg hover:bg-yellow-700 transition duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                Shop Now <span className="text-xl">→</span>
              </button>

              {/* Secondary Button (WhatsApp) */}
              <a
                href="https://wa.me/8801700000000"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 border border-yellow-600 text-yellow-600 font-semibold rounded-full hover:bg-yellow-600 hover:text-white transition duration-300 flex items-center justify-center"
              >
                Order via WhatsApp
              </a>
            </div>
          </div>
          {/* Right Column (Image/Illustration) */}
          <div className="flex justify-center">
            <img
              src="https://img.freepik.com/free-photo/happy-young-man-walking-isolated_171337-1109.jpg"
              alt="Fashion illustration"
              className="w-full max-w-md h-auto rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Category Section */}
      <section className="container mx-auto p-4 my-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4 text-center">Shop by Category</h1>
        <p className="text-lg md:text-xl text-gray-600 text-center h-12 mb-12">Browse our wide range of categories and find your perfect fit.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {categories.map((category) => (
            <div
              key={category.name}
              className={`flex flex-col items-center justify-center py-8 px-4 rounded-xl shadow-lg cursor-pointer
                ${selectedCategory === category.name ? 'bg-yellow-600 text-white' : 'bg-white text-gray-800'}
                hover:bg-yellow-500 hover:text-white transition duration-300 transform hover:scale-105`}
              onClick={() => setSelectedCategory(category.name)}
            >
              <span className="text-4xl mb-2">{category.icon}</span>
              <p className="text-sm font-semibold">{category.name}</p>
            </div>
          ))}
        </div>
      </section>

      <div id="products-section" className="container mx-auto p-4">
        <ProductList selectedCategory={selectedCategory} />
      </div>

      <Footer />
    </>
  );
}

export default Home;
