import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-16"> {/* Increased padding */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-12 md:gap-x-8 lg:gap-x-16"> {/* Flexible grid */}

          {/* Column 1: Company Info & Branding */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="text-2xl font-extrabold tracking-tight mb-4"> {/* Branding consistent with Navbar */}
              <span role="img" aria-label="T-Shirt" className="text-white">👕</span> <span className="text-white">Niche<span className="text-yellow-500">Wear</span></span>
            </div>
            <p className="text-gray-200 text-sm leading-relaxed mb-4"> {/* Increased readability */}
              Your one-stop shop for the latest fashion and accessories.
              Quality products, unbeatable prices.
            </p>
            {/* Social Icons */}
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors duration-200 text-xl" aria-label="Facebook">📘</a> {/* Placeholder FB */}
              <a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors duration-200 text-xl" aria-label="Instagram">📸</a> {/* Placeholder IG */}
              <a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors duration-200 text-xl" aria-label="Twitter">🐦</a> {/* Placeholder X/Twitter */}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-lg font-bold text-yellow-500 mb-4">Quick Links</h3> {/* Prominent heading */}
            <ul className="space-y-2 text-gray-200 text-base"> {/* Increased font size */}
              <li><a href="#" className="hover:text-yellow-500 transition-colors duration-200">Home</a></li>
              <li><a href="#" className="hover:text-yellow-500 transition-colors duration-200">Products</a></li>
              <li><a href="#" className="hover:text-yellow-500 transition-colors duration-200">Cart</a></li>
              <li><a href="#" className="hover:text-yellow-500 transition-colors duration-200">Checkout</a></li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-lg font-bold text-yellow-500 mb-4">Contact Us</h3> {/* Prominent heading */}
            <ul className="space-y-2 text-gray-200 text-base"> {/* Increased font size */}
              <li className="flex items-center">
                <span className="mr-2 text-xl">✉️</span> {/* Email icon */}
                <span>info@nichewear.com</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-xl">📞</span> {/* Phone icon */}
                <span>+1 (123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-xl">📍</span> {/* Address icon */}
                <span>123 Fashion St, Style City, SC 90210</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter Section */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-lg font-bold text-yellow-500 mb-4">Subscribe to our Newsletter</h3> {/* Prominent heading */}
            <p className="text-gray-200 text-sm leading-relaxed mb-4">
              Get the latest updates and exclusive offers delivered to your inbox.
            </p>
            <div className="flex w-full max-w-sm"> {/* Flex for input and button */}
              <input
                type="email"
                placeholder="Your email"
                className="flex-grow p-2 rounded-l-md border border-gray-700 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <button className="bg-yellow-600 text-white px-4 py-2 rounded-r-md hover:bg-yellow-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500">
                Subscribe
              </button>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-sm text-gray-400"> {/* Increased top margin */}
          &copy; {new Date().getFullYear()} NicheWear. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
