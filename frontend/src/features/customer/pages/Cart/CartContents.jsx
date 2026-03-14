import { HiOutlineTrash } from "react-icons/hi";
import { FiMinus, FiPlus } from "react-icons/fi";
import { useDispatch } from "react-redux";
import {
  removeFromCart,
  updateCartItemQuantity,
} from "../../../../redux/slice/cartSlice";

const CartContents = ({ cart, userId }) => {
  const dispatch = useDispatch();

  const handleUpdateQuantity = (
    productId,
    delta,
    currentQuantity,
    size,
    color,
  ) => {
    const newQuantity = currentQuantity + delta;
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

  const handleRemoveFromCart = (productId, size, color) => {
    dispatch(removeFromCart({ productId, userId, size, color }));
  };

  if (!cart?.products?.length) return null;

  return (
    <div className="space-y-6">
      {cart.products.map((item) => (
        <div
          key={`${item.productId}-${item.size}-${item.color}`}
          className="flex gap-4 group relative bg-white rounded-lg hover:shadow-md transition-shadow p-2"
        >
          {/* Product Image */}
          <div className="relative w-24 h-28 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Product Details */}
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-900 hover:text-amber-600 transition-colors line-clamp-1">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Size:{" "}
                  <span className="font-medium text-gray-700">{item.size}</span>{" "}
                  | Color:{" "}
                  <span className="font-medium text-gray-700 capitalize">
                    {item.color}
                  </span>
                </p>
              </div>
              <button
                onClick={() =>
                  handleRemoveFromCart(item.productId, item.size, item.color)
                }
                className="text-gray-400 hover:text-red-500 transition-colors p-1"
                aria-label="Remove item"
              >
                <HiOutlineTrash className="w-5 h-5" />
              </button>
            </div>

            {/* Price and Quantity */}
            <div className="flex items-end justify-between mt-3">
              <div className="flex items-center border border-gray-200 rounded-lg">
                <button
                  onClick={() =>
                    handleUpdateQuantity(
                      item.productId,
                      -1,
                      item.quantity,
                      item.size,
                      item.color,
                    )
                  }
                  className="px-3 py-2 hover:bg-gray-50 transition-colors disabled:opacity-50"
                  disabled={item.quantity <= 1}
                  aria-label="Decrease quantity"
                >
                  <FiMinus
                    className={`w-3 h-3 ${item.quantity <= 1 ? "text-gray-300" : "text-gray-600"}`}
                  />
                </button>
                <span className="w-10 text-center font-medium text-gray-700">
                  {item.quantity}
                </span>
                <button
                  onClick={() =>
                    handleUpdateQuantity(
                      item.productId,
                      1,
                      item.quantity,
                      item.size,
                      item.color,
                    )
                  }
                  className="px-3 py-2 hover:bg-gray-50 transition-colors"
                  aria-label="Increase quantity"
                >
                  <FiPlus className="w-3 h-3 text-gray-600" />
                </button>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-gray-900">
                  ${(item.price * item.quantity).toLocaleString()}
                </span>
                <p className="text-xs text-gray-500">
                  ${item.price.toLocaleString()} each
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Cart Total */}
      <div className="border-t pt-4 mt-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium text-gray-900">
            $
            {cart.products
              .reduce((sum, item) => sum + item.price * item.quantity, 0)
              .toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium text-green-600">Free</span>
        </div>
      </div>
    </div>
  );
};

export default CartContents;
