import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ShoppingCart,
  Search,
  User,
  Menu,
  X,
} from "lucide-react";
import { useCart } from "../../context/CartContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const {cart} = useCart();

  const totalItems = cart.length

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-sm fixed w-full z-10 px-4 md:px-8 lg:px-8 md:py-5 py-10 flex justify-between items-center">
      {/* Logo */}
{/* <Link to="/" className="flex items-center justify-center">
  <img
    src="/whitelogo.png"
    alt="Timeless House Of Tribe Logo"
    className="h-15 md:h-20 w-auto object-contain"
  />
</Link> */}

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-8 text-gray-800 font-medium">
        <Link to="/" className="hover:text-primary transition-colors duration-200">Home</Link>
        <Link to="/agbada" className="hover:text-primary transition-colors duration-200">Agbada</Link>
        <Link to="/jacket" className="hover:text-primary transition-colors duration-200">Jacket</Link>
        <Link to="/fila" className="hover:text-primary transition-colors duration-200">Fila</Link>
        {/* <Link to="/bubu" className="hover:text-primary transition-colors duration-200">Bubu Gown</Link> */}
        <Link to="/cargo" className="hover:text-primary transition-colors duration-200">Cargo Pant</Link>
        {/* <Link to="/about" className="hover:text-primary transition-colors duration-200">About Us</Link> */}
        <Link to="/contact" className="hover:text-primary transition-colors duration-200">Contact Us</Link>
      </div>

      {/* Desktop Icons */}
      <div className="hidden md:flex items-center space-x-6">
        <Link
          to="/search"
          className="p-2 rounded-full hover:bg-primary/10 text-gray-600 hover:text-primary transition-colors duration-200"
          aria-label="Search products"
        >
          <Search size={20} />
        </Link>
    <div className="relative">
      {totalItems > 0 && (
        <span className="absolute top-1 -right-2 bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {totalItems}
        </span>
      )}

      <Link
        to="/cart"
        className="p-2 rounded-full hover:bg-primary/10 text-gray-600 hover:text-primary transition-colors flex items-center justify-center duration-200"
        aria-label="View shopping cart"
      >
        <ShoppingCart size={20} />
      </Link>
    </div>
        <Link
          to="/auth"
          className="p-2 rounded-full hover:bg-primary/10 text-gray-600 hover:text-primary transition-colors duration-200"
          aria-label="User account"
        >
          <User size={20} />
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-2 rounded-lg bg-primary absolute right-5 text-white hover:bg-primary/90 transition-colors duration-200"
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Dropdown */}
      {open && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-lg flex flex-col items-center space-y-4 py-6 px-4 md:hidden z-50">
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="text-gray-800 font-medium hover:text-primary transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            to="/agbada"
            onClick={() => setOpen(false)}
            className="text-gray-800 font-medium hover:text-primary transition-colors duration-200"
          >
            Agbada
          </Link>
          <Link
            to="/fila"
            onClick={() => setOpen(false)}
            className="text-gray-800 font-medium hover:text-primary transition-colors duration-200"
          >
            Fila
          </Link>
          {/* <Link
            to="/bubu"
            onClick={() => setOpen(false)}
            className="text-gray-800 font-medium hover:text-primary transition-colors duration-200"
          >
            Bubu Gown
          </Link> */}
          <Link
            to="/jacket"
            onClick={() => setOpen(false)}
            className="text-gray-800 font-medium hover:text-primary transition-colors duration-200"
          >
            Jacket
          </Link>
          <Link
            to="/cargo"
            onClick={() => setOpen(false)}
            className="text-gray-800 font-medium hover:text-primary transition-colors duration-200"
          >
            Cargo Pant
          </Link>
          {/* <Link
            to="/about"
            onClick={() => setOpen(false)}
            className="text-gray-800 font-medium hover:text-primary transition-colors duration-200"
          >
            About Us
          </Link> */}
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="text-gray-800 font-medium hover:text-primary transition-colors duration-200"
          >
            Contact Us
          </Link>
          <div className="h-px w-full bg-gray-200"></div>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-6">
              <Link
                to="/search"
                onClick={() => setOpen(false)}
                className="p-2 rounded-full hover:bg-primary/10 text-gray-600 hover:text-primary transition-colors duration-200"
                aria-label="Search products"
              >
                <Search size={20} />
              </Link>
    <div className="relative" onClick={() => setOpen(false)}>
      {totalItems > 0 && (
        <span className="absolute top-1 -right-2 bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {totalItems}
        </span>
      )}

      <Link
        to="/cart"
        className="p-2 rounded-full flex items-center justify-between hover:bg-primary/10 text-gray-600 hover:text-primary transition-colors duration-200"
        aria-label="View shopping cart"
      >
        <ShoppingCart size={20} />
      </Link>
    </div>
              <Link
                to="/auth"
                onClick={() => setOpen(false)}
                className="p-2 rounded-full hover:bg-primary/10 text-gray-600 hover:text-primary transition-colors duration-200"
                aria-label="User account"
              >
                <User size={20} />
              </Link>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="bg-gradient-to-r from-primary2 to-primary hover:from-primary2/90 hover:to-primary/90 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-300"
              aria-label="Shop now"
            >
              Shop Now
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}