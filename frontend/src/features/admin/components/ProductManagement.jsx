import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import CustomTable from "../../components/common/CustomTable";
import {
  fetchAdminProducts,
  deleteProduct,
} from "../../../redux/slice/adminProductSlice";
import confirmDelete from "../../components/common/ConfirmDelete";

const ProductManagement = () => {
  const dispatch = useDispatch();

  const { products, loading, page, totalPages } = useSelector(
    (state) => state.adminProducts
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
      successMessage: "🗑️ Product deleted successfully",
      errorMessage: "❌ Failed to delete product",
    });
  };

  const columns = [
    { title: "Name", key: "name" },
    {
      title: "Price",
      key: "price",
      render: (row) => `₹${row.price}`,
    },
    { title: "SKU", key: "sku" },
    {
      title: "Actions",
      key: "actions",
      render: (row) => (
        <div className="flex gap-2">
          <Link
            to={`/admin/products/${row._id}/edit`}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded transition"
          >
            Edit
          </Link>
          <button
            onClick={() => handleDelete(row._id)}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-2 lg:p-4 xl:p-6">
      <div className="flex justify-between mb-6">
        <h2 className="text-xl xl:text-2xl font-bold">Product Management</h2>
        <Link
          to="/admin/products/create"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
        >
          + Add
        </Link>
      </div>

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
  );
};

export default ProductManagement;
