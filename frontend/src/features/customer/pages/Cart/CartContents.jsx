import React from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { useDispatch } from "react-redux";
import {
  removeFromCart,
  updateCartItemQuantity,
} from "../../../../redux/slice/cartSlice";

const CartContents = ({ cart, userId }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (productId, delta, quantity, size, color) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1) {
      dispatch(
        updateCartItemQuantity({
          productId,
          quantity: newQuantity,
          userId,
          size,
          color,
        }),
      );
    }
  };

  const handleRemoveFromCart = async (productId, size, color) => {
    dispatch(removeFromCart({ productId, userId, size, color }));
  };

  return (
    <div className="space-y-4">
      {cart.products.map((product, index) => (
        <div
          key={index}
          className="flex justify-between items-start gap-4 border-b pb-4"
        >
          <div className="flex gap-4 items-start">
            <img
              src={product.image}
              alt={product.name}
              className="w-20 h-24 object-cover rounded"
            />
            <div className="flex flex-col justify-between">
              <h3 className="font-medium">{product.name}</h3>
              <p className="text-sm text-gray-500">
                size: {product.size} | color: {product.color}
              </p>
              <div className="flex items-center mt-2">
                <button
                  onClick={() =>
                    handleAddToCart(
                      product.productId,
                      -1,
                      product.quantity,
                      product.size,
                      product.color,
                    )
                  }
                  className="border rounded px-2 py-1 text-lg font-medium hover:bg-gray-100 transition"
                >
                  -
                </button>
                <span className="mx-3">{product.quantity}</span>
                <button
                  onClick={() =>
                    handleAddToCart(
                      product.productId,
                      1,
                      product.quantity,
                      product.size,
                      product.color,
                    )
                  }
                  className="border rounded px-2 py-1 text-lg font-medium hover:bg-gray-100 transition"
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <p className="font-semibold">$ {product.price.toLocaleString()}</p>
            <button
              onClick={() =>
                handleRemoveFromCart(
                  product.productId,
                  product.size,
                  product.color,
                )
              }
              className="mt-2 hover:text-red-700 transition"
            >
              <HiOutlineTrash className="h-6 w-6 text-red-600" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartContents;
