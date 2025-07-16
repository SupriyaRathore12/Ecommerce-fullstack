import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Navbar({ openLogin }) {
  const [menuOpen, setMenuOpen] = useState(false); // toggle for mobile menu
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged Out Successfully");
    navigate("/");
  };

  return (
    <nav className="bg-violet-500 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Brand Logo */}
        <Link to="/" className="text-2xl font-bold tracking-wide">
          Gurllyy Shop
        </Link>

        {/* Hamburger Icon */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-2xl focus:outline-none"
        >
          ☰
        </button>

        {/* Menu Links */}
        <ul className={`flex flex-col md:flex-row md:items-center gap-5 mt-4 md:mt-0 md:gap-8 
          ${menuOpen ? "block" : "hidden"} md:flex`}>
          <li><Link to="/" className="hover:underline">Home</Link></li>
          <li><Link to="/addProducts" className="hover:underline">Add Products</Link></li>
          <li><Link to="/cart" className="text-xl"><FaShoppingCart /></Link></li>
          <li><Link to="/order" className="hover:underline">Order</Link></li>
          <li><Link to="/profile" className="text-xl"><CgProfile /></Link></li>
          <li>
            {token ? (
              <button
                onClick={handleLogout}
                className="bg-white text-violet-500 font-semibold px-4 py-1 rounded hover:bg-gray-200"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={openLogin}
                className="bg-white text-violet-500 font-semibold px-4 py-1 rounded hover:bg-gray-200"
              >
                Login
              </button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
