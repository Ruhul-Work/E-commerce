import { Link, useLocation } from "react-router-dom";
import { useCart } from "../hooks/useCart";

function Navbar() {
  const { cartItems } = useCart();
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path
      ? "text-yellow-600"
      : "text-gray-800";

  return (
    <nav className="sticky top-0 z-50 bg-white bg-opacity-95 p-4 shadow-lg transition-all duration-300">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-extrabold tracking-tight text-gray-900 hover:text-yellow-700 transition duration-300">
          <span role="img" aria-label="T-Shirt">👕</span> Niche<span className="text-yellow-600">Wear</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          <Link to="/" className={`font-semibold text-base hover:text-yellow-600 transition duration-300 ${isActive("/")}`}>
            Home
          </Link>
          {/* Products link now scrolls to section on Home page */}
          <Link to="/?scrollTo=products" className="font-semibold text-base hover:text-yellow-600 transition duration-300">
            Products
          </Link>
          <Link to="/cart" className={`relative flex items-center font-semibold text-base hover:text-yellow-600 transition duration-300 ${isActive("/cart")}`}>
            🛒
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-xs font-bold px-2 py-0.5 rounded-full flex items-center justify-center min-w-[20px] min-h-[20px]">
                {cartItems.length}
              </span>
            )}
          </Link>
          {/* Admin Login Button */}
          <Link to="/admin/login" className="px-5 py-2 border border-yellow-600 text-yellow-600 rounded-full hover:bg-yellow-600 hover:text-white transition duration-300">
            Admin Login
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
