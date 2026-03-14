import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CustomTable from "../../../components/common/CustomTable";
import { fetchUserOrders } from "../../../../redux/slice/orderSlice";
import Error from "../../../components/common/Error";
import { FaEye } from "react-icons/fa";
import { BsBagCheck } from "react-icons/bs";

const MyOrders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    orders = [],
    loading,
    error,
    page,
    totalPages,
  } = useSelector((state) => state.order);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    dispatch(fetchUserOrders({ page: currentPage, limit: rowsPerPage }));
  }, [dispatch, currentPage, rowsPerPage]);

  const handleViewOrder = (id) => {
    navigate(`/order/${id}`);
  };

  const getStatusBadge = (isPaid) => {
    return isPaid ? (
      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
        Paid
      </span>
    ) : (
      <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
        Pending
      </span>
    );
  };

  const columns = [
    {
      title: "Product",
      key: "image",
      render: (row) => (
        <div className="flex items-center gap-3">
          <img
            src={row.orderItems?.[0]?.image}
            alt={row.orderItems?.[0]?.name}
            className="w-12 h-12 object-cover rounded-lg border border-gray-200"
          />
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-gray-900 line-clamp-1">
              {row.orderItems?.[0]?.name}
            </p>
            <p className="text-xs text-gray-500">
              {row.orderItems?.length}{" "}
              {row.orderItems?.length === 1 ? "item" : "items"}
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Order ID",
      key: "_id",
      render: (row) => (
        <span className="font-mono text-sm font-medium text-gray-900">
          #{row._id.slice(-8)}
        </span>
      ),
    },
    {
      title: "Date",
      key: "createdAt",
      render: (row) => (
        <span className="text-sm text-gray-600">
          {new Date(row.createdAt).toLocaleDateString()}
        </span>
      ),
    },
    {
      title: "Delivery",
      key: "shippingAddress",
      render: (row) => (
        <span className="text-sm text-gray-600">
          {row.shippingAddress?.city}, {row.shippingAddress?.country}
        </span>
      ),
    },
    {
      title: "Items",
      key: "items",
      render: (row) => (
        <span className="text-sm font-medium text-gray-900">
          {row.orderItems?.length || 0}
        </span>
      ),
    },
    {
      title: "Total",
      key: "totalPrice",
      render: (row) => (
        <span className="text-sm font-bold text-gray-900">
          ₹{row.totalPrice}
        </span>
      ),
    },
    {
      title: "Status",
      key: "isPaid",
      render: (row) => getStatusBadge(row.isPaid),
    },
    {
      title: "Action",
      key: "actions",
      render: (row) => (
        <button
          onClick={() => handleViewOrder(row._id)}
          className="p-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
          title="View Order"
        >
          <FaEye className="text-sm" />
        </button>
      ),
    },
  ];

  if (error) {
    return <Error />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Simple Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
            <BsBagCheck className="text-xl text-amber-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <CustomTable
            columns={columns}
            data={orders}
            loading={loading}
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={setRowsPerPage}
          />
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
