import { useEffect } from "react";
import MyOrders from "../orders/MyOrders";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../../../redux/slice/cartSlice";
import { logout } from "../../../../redux/slice/authSlice";
import { FaUser, FaEnvelope, FaSignOutAlt } from "react-icons/fa";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Section - Profile Card */}
          <div className="w-full md:w-1/3 lg:w-1/4">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {/* Profile Header */}
              <div className="bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-8 text-center">
                <div className="w-20 h-20 mx-auto bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-4 border-white/50">
                  <FaUser className="text-3xl text-white" />
                </div>
                <h1 className="text-xl font-bold text-white mt-4">
                  {user?.name || "User"}
                </h1>
                <p className="text-amber-100 text-sm mt-1 flex items-center justify-center gap-1">
                  <FaEnvelope className="text-xs" />
                  {user?.email}
                </p>
              </div>

              {/* Logout Button */}
              <div className="p-6">
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                >
                  <FaSignOutAlt />
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Right Section - Orders */}
          <div className="w-full md:w-2/3 lg:w-3/4">
            <MyOrders />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
