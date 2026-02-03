import { Link, useLocation } from "react-router-dom";
import { useCart } from "../hooks/useCart";

function Navbar() {
  const { cartItems } = useCart();
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path
      ? "text-yellow-400"
      : "text-white";

  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-wide text-white hover:text-gray-200 transition duration-300">
          Mini<span className="text-yellow-400">Shop</span>
        </Link>

        {/* Menu */}
        <div className="flex items-center space-x-6">
          <Link to="/" className={`text-lg hover:text-yellow-400 transition duration-300 ${isActive("/")}`}>
            Products
          </Link>

          <Link to="/cart" className={`relative flex items-center text-lg hover:text-yellow-400 transition duration-300 ${isActive("/cart")}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.023.828L5.75 8.992m0 0l-1.9 8.763c-.154.711.087 1.432.662 1.841.386.274.846.406 1.307.406h11.173c.461 0 .921-.132 1.307-.406.575-.409.816-1.13.662-1.841L18.25 8.992m-14.5 0h17.552c.782 0 1.42-.583 1.543-1.354L22.25 5.5H12m-7.5 3.492l1.5 7.763M9.75 18a3 3 0 100-6 3 3 0 000 6zM18 18a3 3 0 100-6 3 3 0 000 6z" />
            </svg>
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-xs font-bold px-2 py-0.5 rounded-full flex items-center justify-center min-w-[20px] min-h-[20px]">
                {cartItems.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
