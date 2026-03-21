import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HiOutlineUser,
  HiOutlineShoppingBag,
  HiBars3BottomRight,
} from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";
import SearchBar from "./SearchBar";
import CartDrawer from "../Layout/CartDrawer";
import { FiSearch } from "react-icons/fi";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchMobileOpen, setSearchMobileOpen] = useState(false);
  const location = useLocation();

  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const cartItemCount = cart?.products?.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile nav on route change
  useEffect(() => {
    setNavDrawerOpen(false);
    setSearchMobileOpen(false);
  }, [location]);

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Collection", path: "/collections/all" },
    { label: "Men", path: "/collections/all?gender=Men" },
    { label: "Women", path: "/collections/all?gender=Women" },
    { label: "Top Wear", path: "/collections/all?category=Top Wear" },
    { label: "Bottom Wear", path: "/collections/all?category=Bottom Wear" },
  ];

  return (
    <>
      {/* NAVBAR */}
      <nav
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-md py-2"
            : "bg-white border-b py-3 md:py-4"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between px-4">
          {/* Logo */}
          <Link
            to="/"
            className="text-xl md:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
          >
            Shopidy
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.slice(1).map(({ label, path }) => (
              <Link
                key={label}
                to={path}
                className={`text-sm font-medium uppercase transition-colors relative group ${
                  location.pathname === path
                    ? "text-amber-600"
                    : "text-gray-600 hover:text-amber-600"
                }`}
              >
                {label}
                <span
                  className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-500 transition-all group-hover:w-full ${
                    location.pathname === path ? "w-full" : ""
                  }`}
                ></span>
              </Link>
            ))}
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Admin Badge */}
            {user?.role === "admin" && (
              <Link
                to="/admin"
                className="hidden sm:block bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 py-1.5 rounded-full text-xs font-medium shadow-md hover:shadow-lg transition-all"
              >
                Admin
              </Link>
            )}

            {/* Search Icon for Mobile */}
            <button
              className="sm:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
              onClick={() => setSearchMobileOpen(!searchMobileOpen)}
            >
              <FiSearch className="w-5 h-5 text-gray-700" />
            </button>

            {/* Desktop Search */}
            <div className="hidden sm:block w-48 lg:w-64">
              <SearchBar />
            </div>

            {/* Profile */}
            <Link
              to="/profile"
              className="p-2 hover:bg-gray-100 rounded-full transition-colors relative group"
            >
              <HiOutlineUser className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Profile
              </span>
            </Link>

            {/* Cart */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors relative group"
            >
              <HiOutlineShoppingBag className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-amber-500 to-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-md animate-pulse">
                  {cartItemCount}
                </span>
              )}
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                Cart
              </span>
            </button>

            {/* Mobile Menu Icon */}
            <button
              className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
              onClick={() => setNavDrawerOpen(true)}
            >
              <HiBars3BottomRight className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {searchMobileOpen && (
          <div className="sm:hidden px-4 pb-3 pt-2 border-t mt-2">
            <SearchBar />
          </div>
        )}
      </nav>

      {/* CART DRAWER */}
      <CartDrawer
        drawerOpen={drawerOpen}
        toggleCartDrawer={() => setDrawerOpen(false)}
      />

      {/* MOBILE NAV DRAWER BACKDROP */}
      <div
        className={`fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity ${
          navDrawerOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setNavDrawerOpen(false)}
      />

      {/* MOBILE NAV DRAWER */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-72 sm:w-80 bg-white
          shadow-2xl transform transition-transform duration-500 ease-in-out
          ${navDrawerOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-5 border-b bg-gradient-to-r from-gray-50 to-white">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Menu</h2>
            <p className="text-xs text-gray-500 mt-1">Welcome to Shopidy</p>
          </div>
          <button
            onClick={() => setNavDrawerOpen(false)}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <IoMdClose className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* User Info (if logged in) */}
        {user && (
          <div className="p-5 bg-amber-50 border-b border-amber-100">
            <p className="text-sm text-gray-600">Logged in as</p>
            <p className="font-semibold text-gray-800">{user.email}</p>
          </div>
        )}

        {/* Navigation Links */}
        <nav className="flex flex-col p-5">
          {navLinks.map(({ label, path }) => (
            <Link
              key={label}
              to={path}
              onClick={() => setNavDrawerOpen(false)}
              className={`py-3 px-4 rounded-lg transition-all ${
                location.pathname === path
                  ? "bg-amber-500 text-white font-medium shadow-md"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Footer Links */}
        <div className="absolute bottom-0 left-0 right-0 p-5 border-t bg-gray-50">
          <div className="flex flex-col gap-2">
            {!user ? (
              <Link
                to="/login"
                onClick={() => setNavDrawerOpen(false)}
                className="text-center bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Sign In
              </Link>
            ) : (
              <Link
                to="/profile"
                onClick={() => setNavDrawerOpen(false)}
                className="text-center bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                My Profile
              </Link>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
