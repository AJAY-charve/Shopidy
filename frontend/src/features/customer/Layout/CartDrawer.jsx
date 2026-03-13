import React from "react";
import { IoCloseSharp } from "react-icons/io5"; // IoMdClose => IoCloseSharp (modern)
import CartContents from "../pages/Cart/CartContents";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";

const CartDrawer = ({ drawerOpen, toggleCartDrawer }) => {
  const navigate = useNavigate();
  const { user, guestId } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  const userId = user ? user._id : null;

  const handleCheckout = () => {
    toggleCartDrawer();
    if (!user) {
      navigate("/login?redirect=checkout");
    } else {
      navigate("/checkout");
    }
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full bg-white shadow-2xl transform transition-transform duration-300 flex flex-col z-50
        ${drawerOpen ? "translate-x-0" : "translate-x-full"}
        w-full sm:w-3/4 md:w-1/2 lg:w-[28rem]`}
    >
      {/* Close Button */}
      <div className="flex justify-end p-4 border-b">
        <button
          onClick={toggleCartDrawer}
          className="p-2 rounded-full hover:bg-gray-200 transition"
        >
          <IoCloseSharp className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      {/* Cart Content */}
      <div className="flex-grow p-4 overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
        {cart && cart?.products?.length > 0 ? (
          <CartContents cart={cart} userId={userId} guestId={guestId} />
        ) : (
          <p className="text-gray-500 text-center mt-6">Your cart is empty.</p>
        )}
      </div>

      {/* Checkout Section */}
      <div className="p-4 border-t bg-white sticky bottom-0">
        {cart && cart?.products?.length > 0 ? (
          <button
            onClick={handleCheckout}
            className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            Checkout
          </button>
        ) : (
          <p className="text-sm text-gray-500 text-center">
            Shipping, taxes, and discounts will be calculated at checkout.
          </p>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
