import { IoCloseSharp } from "react-icons/io5";
import { FiShoppingBag } from "react-icons/fi";
import { FaLock } from "react-icons/fa";
import CartContents from "../pages/Cart/CartContents";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";

const CartDrawer = ({ drawerOpen, toggleCartDrawer }) => {
  const navigate = useNavigate();
  const { user, guestId } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const [cartTotal, setCartTotal] = useState(0);

  const userId = user ? user._id : null;

  useEffect(() => {
    if (cart?.products?.length > 0) {
      const total = cart.products.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );
      setCartTotal(total);
    } else {
      setCartTotal(0);
    }
  }, [cart]);

  const handleCheckout = () => {
    toggleCartDrawer();
    if (!user) {
      navigate("/login?redirect=checkout");
    } else {
      navigate("/checkout");
    }
  };

  return (
    <>
      {/* Backdrop */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={toggleCartDrawer}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-2xl transform transition-transform duration-500 ease-in-out z-50 flex flex-col
          ${drawerOpen ? "translate-x-0" : "translate-x-full"}
          w-full sm:w-96 md:w-96 lg:w-[32rem]`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="relative">
              <FiShoppingBag className="w-6 h-6 text-gray-900" />
              {cart?.products?.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {cart.products.length}
                </span>
              )}
            </div>
            <h2 className="text-xl font-bold text-gray-900">Your Cart</h2>
          </div>
          <button
            onClick={toggleCartDrawer}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <IoCloseSharp className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        {/* Cart Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {cart && cart?.products?.length > 0 ? (
            <>
              <CartContents cart={cart} userId={userId} guestId={guestId} />

              {/* Cart Summary */}
              <div className="mt-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium text-gray-900">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-gray-900">
                    Calculated at checkout
                  </span>
                </div>
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between">
                    <span className="text-base font-bold text-gray-900">
                      Total
                    </span>
                    <span className="text-xl font-bold text-gray-900">
                      ${cartTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="bg-gray-100 rounded-full p-6 mb-4">
                <FiShoppingBag className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Your cart is empty
              </h3>
              <p className="text-gray-500 mb-6">
                Looks like you haven't added anything yet
              </p>
              <button
                onClick={toggleCartDrawer}
                className="bg-amber-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-amber-600 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>

        {/* Checkout Section */}
        {cart && cart?.products?.length > 0 && (
          <div className="border-t bg-gray-50 p-6">
            <button
              onClick={handleCheckout}
              className="w-full bg-gray-900 text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              <FaLock className="w-4 h-4" />
              Proceed to Checkout
            </button>
            <p className="text-xs text-gray-500 text-center mt-3">
              Shipping, taxes, and discounts will be calculated at checkout.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
