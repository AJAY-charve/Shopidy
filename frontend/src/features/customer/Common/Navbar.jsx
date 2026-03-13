import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineUser,
  HiOutlineShoppingBag,
  HiBars3BottomRight,
} from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";
import SearchBar from "./SearchBar";
import CartDrawer from "../Layout/CartDrawer";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);

  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const cartItemCount = cart?.products?.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <>
      {/* NAVBAR */}
      <nav className="sticky top-0 z-40 bg-white border-b">
        <div className="container mx-auto flex items-center justify-between px-4 py-3 md:py-4">
          {/* Logo */}
          <Link to="/" className="text-xl md:text-2xl font-semibold">
            FashionStore
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6">
            {[
              ["Collection", "collections/all"],
              ["Men", "collections/all?gender=Men"],
              ["Women", "collections/all?gender=Women"],
              ["Top Wear", "collections/all?category=Top Wear"],
              ["Bottom Wear", "collections/all?category=Bottom Wear"],
            ].map(([label, path]) => (
              <Link
                key={label}
                to={path}
                className="text-sm font-medium uppercase text-gray-600 hover:text-black"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-3 md:gap-4">
            {user?.role === "admin" && (
              <Link
                to="/admin"
                className="hidden sm:block bg-black text-white px-3 py-1 rounded text-xs"
              >
                Admin
              </Link>
            )}

            <Link to="/profile">
              <HiOutlineUser className="w-6 h-6 text-gray-700" />
            </Link>

            {/* Cart */}
            <button onClick={() => setDrawerOpen(true)} className="relative">
              <HiOutlineShoppingBag className="w-6 h-6 text-gray-700" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Search */}
            <div className="hidden sm:block w-40 md:w-56">
              <SearchBar />
            </div>

            {/* Mobile Menu Icon */}
            <button
              className="md:hidden"
              onClick={() => setNavDrawerOpen(true)}
            >
              <HiBars3BottomRight className="w-7 h-7 text-gray-700" />
            </button>
          </div>
        </div>
      </nav>

      {/* CART DRAWER */}
      <CartDrawer
        drawerOpen={drawerOpen}
        toggleCartDrawer={() => setDrawerOpen(false)}
      />

      {/* MOBILE NAV DRAWER */}
      <div
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity ${
          navDrawerOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setNavDrawerOpen(false)}
      />

      <aside
        className={`fixed top-0 left-0 z-50 h-full w-3/4 sm:w-1/2 md:w-1/3 bg-white
        transform transition-transform duration-300
        ${navDrawerOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button onClick={() => setNavDrawerOpen(false)}>
            <IoMdClose className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <nav className="flex flex-col gap-4 p-4 text-gray-700">
          {[
            ["Collection", "collections/all"],
            ["Men", "collections/all?gender=Men"],
            ["Women", "collections/all?gender=Women"],
            ["Top Wear", "collections/all?category=Top Wear"],
            ["Bottom Wear", "collections/all?category=Bottom Wear"],
          ].map(([label, path]) => (
            <Link
              key={label}
              to={path}
              onClick={() => setNavDrawerOpen(false)}
              className="text-base hover:text-black"
            >
              {label}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Navbar;
