import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaPlus, FaEye, FaBox } from "react-icons/fa";
import CustomTable from "../../components/common/CustomTable";
import {
  fetchAdminProducts,
  deleteProduct,
} from "../../../redux/slice/adminProductSlice";
import confirmDelete from "../../components/common/ConfirmDelete";

const ProductManagement = () => {
  const dispatch = useDispatch();

  const { products, loading, page, totalPages } = useSelector(
    (state) => state.adminProducts,
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    dispatch(fetchAdminProducts({ page: currentPage, limit: rowsPerPage }));
  }, [dispatch, currentPage, rowsPerPage]);

  const handleDelete = (id) => {
    confirmDelete({
      title: "Delete Product?",
      description: "This product will be permanently removed.",
      onConfirm: () => dispatch(deleteProduct(id)).unwrap(),
      successMessage: "Product deleted successfully",
      errorMessage: "Failed to delete product",
    });
  };

  const columns = [
    {
      title: "Product",
      key: "name",
      render: (row) => (
        <div className="flex items-center gap-3">
          {row.images?.[0] ? (
            <img
              src={row.images[0].url}
              alt={row.name}
              className="w-10 h-10 rounded-lg object-cover border border-gray-200"
            />
          ) : (
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <FaBox className="text-gray-400" />
            </div>
          )}
          <span className="font-medium text-gray-900">{row.name}</span>
        </div>
      ),
    },
    {
      title: "Price",
      key: "price",
      render: (row) => (
        <span className="font-semibold text-gray-900">₹{row.price}</span>
      ),
    },
    {
      title: "Stock",
      key: "countInStock",
      render: (row) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            row.countInStock > 10
              ? "bg-green-100 text-green-700"
              : row.countInStock > 0
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
          }`}
        >
          {row.countInStock} units
        </span>
      ),
    },
    {
      title: "SKU",
      key: "sku",
      render: (row) => <span className="font-mono text-sm">{row.sku}</span>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (row) => (
        <div className="flex gap-2">
          <Link
            to={`/admin/products/${row._id}/edit`}
            className="p-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
            title="Edit Product"
          >
            <FaEdit className="text-sm" />
          </Link>
          {/* <Link
            to={`/product/${row._id}`}
            target="_blank"
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            title="View Product"
          >
            <FaEye className="text-sm" />
          </Link> */}
          <button
            onClick={() => handleDelete(row._id)}
            className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            title="Delete Product"
          >
            <FaTrash className="text-sm" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
              <FaBox className="text-white" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Product Management
            </h1>
          </div>

          <Link
            to="/admin/products/create"
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors shadow-md"
          >
            <FaPlus />
            Add New Product
          </Link>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <CustomTable
            columns={columns}
            data={products}
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

export default ProductManagement;
