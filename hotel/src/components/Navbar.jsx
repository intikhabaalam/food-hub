import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../features/auth/authSlice";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { user } = useSelector((state) => state.auth);
  const { cartItems = [] } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const NavLink = ({ to, children }) => (
    <Link
      to={to}
      className={`relative px-4 py-2 rounded-full font-medium transition-all duration-300 ${
        pathname === to
          ? "bg-primary text-white shadow-md shadow-primary/20"
          : "text-gray-700 hover:text-primary hover:bg-white/50"
      }`}
      onClick={() => setOpen(false)}
    >
      {children}
    </Link>
  );

  return (
    <header className="fixed top-0 left-0 w-full z-50 glass shadow-sm">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-3xl font-extrabold tracking-tight text-gradient">
                FASTBITE
              </span>
            </Link>
            <div className="hidden lg:block h-6 w-[1px] bg-gray-300"></div>
            <p className="hidden lg:block text-xs font-semibold text-gray-500 tracking-wider uppercase">
              Hot, Fresh & Fast
            </p>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/menu">Menu</NavLink>
            <NavLink to="/booking">Book Table</NavLink>
            <NavLink to="/contact">Contact</NavLink>

            {/* Cart Link with Badge */}
            <Link
              to="/cart"
              className="relative p-2.5 ml-2 text-gray-700 hover:text-primary hover:bg-white/50 rounded-full transition-all duration-300 flex items-center"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                ></path>
              </svg>
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-accent text-white text-xs font-extrabold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm"
                >
                  {cartCount}
                </motion.span>
              )}
            </Link>

            {/* User Actions */}
            {user ? (
              <div className="flex items-center gap-3 ml-4">
                <span className="hidden xl:inline text-sm font-semibold text-gray-600">
                  Hi, {user.name.split(" ")[0]}
                </span>
                {user.isAdmin && (
                  <Link
                    to="/admin"
                    className="bg-secondary text-dark font-semibold px-4 py-2 rounded-full text-sm hover:opacity-90 transition-all shadow-sm"
                  >
                    Admin
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-full text-sm transition-all shadow-sm cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 ml-4">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-primary font-medium px-4 py-2 transition-all"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-primary hover:bg-primary-hover text-white font-semibold px-5 py-2 rounded-full text-sm transition-all shadow-md shadow-primary/20"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile Right Bar (Cart + Toggle) */}
          <div className="flex items-center gap-2 md:hidden">
            {/* Mobile Cart Link */}
            <Link
              to="/cart"
              className="relative p-2 text-gray-700 hover:text-primary rounded-full transition-all flex items-center"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                ></path>
              </svg>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-accent text-white text-[10px] font-extrabold w-4.5 h-4.5 flex items-center justify-center rounded-full border border-white">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setOpen(!open)}
              className="p-2 rounded-xl bg-white/60 hover:bg-white shadow-sm border border-gray-200/50 cursor-pointer"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {open ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden border-t border-gray-200/20 pb-6"
            >
              <div className="flex flex-col gap-2 pt-4">
                <Link
                  to="/"
                  className="px-4 py-2.5 rounded-xl font-medium text-gray-700 hover:bg-white/60"
                  onClick={() => setOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/menu"
                  className="px-4 py-2.5 rounded-xl font-medium text-gray-700 hover:bg-white/60"
                  onClick={() => setOpen(false)}
                >
                  Menu
                </Link>
                <Link
                  to="/booking"
                  className="px-4 py-2.5 rounded-xl font-medium text-gray-700 hover:bg-white/60"
                  onClick={() => setOpen(false)}
                >
                  Book Table
                </Link>
                <Link
                  to="/contact"
                  className="px-4 py-2.5 rounded-xl font-medium text-gray-700 hover:bg-white/60"
                  onClick={() => setOpen(false)}
                >
                  Contact
                </Link>

                <hr className="border-gray-200/50 my-2" />

                {user ? (
                  <div className="flex flex-col gap-2">
                    <span className="px-4 text-sm font-semibold text-gray-500">
                      Logged in as {user.name}
                    </span>
                    {user.isAdmin && (
                      <Link
                        to="/admin"
                        className="px-4 py-2.5 rounded-xl font-medium text-dark bg-secondary/80 text-center"
                        onClick={() => setOpen(false)}
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="px-4 py-2.5 rounded-xl font-medium bg-red-500 text-white text-center cursor-pointer"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Link
                      to="/login"
                      className="px-4 py-2.5 rounded-xl font-medium text-gray-700 border border-gray-300 text-center hover:bg-white"
                      onClick={() => setOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="px-4 py-2.5 rounded-xl font-medium bg-primary text-white text-center hover:bg-primary-hover shadow-md shadow-primary/20"
                      onClick={() => setOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
