// import Loading from "./Loading";

// const CustomTable = ({
//   columns = [],
//   data = [],
//   loading = false,
//   currentPage,
//   totalPages,
//   onPageChange,
//   rowsPerPage,
//   onRowsPerPageChange,
//   pageSizeOptions = [10, 20, 50],
// }) => {
//   return (
//     <div className="bg-white rounded-sm shadow w-full">
//       {/* top controls */}
//       <div className="flex justify-between items-center p-2 lg:p-4 xl:p-6 border-b">
//         <p className="text-sm text-gray-600">
//           Page {currentPage} of {totalPages}
//         </p>

//         <select
//           value={rowsPerPage}
//           onChange={(e) => {
//             onRowsPerPageChange(Number(e.target.value));
//             onPageChange(1);
//           }}
//           className="border rounded px-2 py-1 text-sm"
//         >
//           {pageSizeOptions.map((size) => (
//             <option key={size} value={size}>
//               {size}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* table */}
//       <div className="overflow-x-auto">
//         <table className="min-w-full text-sm">
//           <thead className="bg-gray-100">
//             <tr>
//               {columns.map((col) => (
//                 <th key={col.key} className="px-4 py-3 text-left">
//                   {col.title}
//                 </th>
//               ))}
//             </tr>
//           </thead>

//           <tbody>
//             {loading && (
//               <tr>
//                 <td colSpan={columns.length} className="text-center py-10">
//                   {/* Loading... */}
//                   <Loading />
//                 </td>
//               </tr>
//             )}

//             {!loading && data.length === 0 && (
//               <tr>
//                 <td colSpan={columns.length} className="text-center py-10">
//                   No data found
//                 </td>
//               </tr>
//             )}

//             {!loading &&
//               data.map((row, index) => (
//                 <tr key={row._id || index} className="border-b">
//                   {columns.map((col) => (
//                     <td key={col.key} className="px-4 py-3">
//                       {col.render ? col.render(row) : row[col.key]}
//                     </td>
//                   ))}
//                 </tr>
//               ))}
//           </tbody>
//         </table>
//       </div>

//       {/* pagination */}
//       <div className="flex justify-center gap-4 p-2 lg:p-4 xl:p-6">
//         <button
//           onClick={() => onPageChange(currentPage - 1)}
//           disabled={currentPage === 1}
//           className="px-3 py-1 border rounded"
//         >
//           Prev
//         </button>

//         <button
//           onClick={() => onPageChange(currentPage + 1)}
//           disabled={currentPage === totalPages}
//           className="px-3 py-1 border rounded"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CustomTable;

import React from "react";
import Loading from "./Loading";
import {
  FaChevronLeft,
  FaChevronRight,
  FaSort,
  FaSortUp,
  FaSortDown,
} from "react-icons/fa";

const CustomTable = ({
  columns = [],
  data = [],
  loading = false,
  currentPage,
  totalPages,
  onPageChange,
  rowsPerPage,
  onRowsPerPageChange,
  pageSizeOptions = [10, 20, 50, 100],
  sortColumn,
  sortDirection,
  onSort,
  showPagination = true,
  showPageInfo = true,
  showRowsPerPage = true,
  emptyMessage = "No data found",
  className = "",
}) => {
  const getSortIcon = (column) => {
    if (!column.sortable) return null;
    if (sortColumn === column.key) {
      return sortDirection === "asc" ? (
        <FaSortUp className="inline ml-1 text-amber-500" />
      ) : (
        <FaSortDown className="inline ml-1 text-amber-500" />
      );
    }
    return <FaSort className="inline ml-1 text-gray-400" />;
  };

  const handleSort = (column) => {
    if (!column.sortable) return;
    if (onSort) {
      onSort(column.key);
    }
  };

  const renderCell = (row, column) => {
    try {
      if (column.render) {
        return column.render(row);
      }

      // Handle nested keys like "user.name"
      if (column.key.includes(".")) {
        const keys = column.key.split(".");
        let value = row;
        for (const key of keys) {
          value = value?.[key];
          if (value === undefined) break;
        }
        return value !== undefined ? value : "N/A";
      }

      return row[column.key] !== undefined ? row[column.key] : "N/A";
    } catch (error) {
      return "N/A";
    }
  };

  const startItem = (currentPage - 1) * rowsPerPage + 1;
  const endItem = Math.min(currentPage * rowsPerPage, data.length);

  return (
    <div
      className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden ${className}`}
    >
      {/* Top Controls */}
      {(showPageInfo || showRowsPerPage) && (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-4 py-3 bg-gray-50 border-b border-gray-200">
          {showPageInfo && (
            <p className="text-sm text-gray-600">
              Showing{" "}
              <span className="font-medium">
                {data.length > 0 ? startItem : 0}
              </span>{" "}
              to <span className="font-medium">{endItem}</span> of{" "}
              <span className="font-medium">{data.length}</span> results
            </p>
          )}

          {showRowsPerPage && (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">Show:</span>
              <select
                value={rowsPerPage}
                onChange={(e) => {
                  onRowsPerPageChange(Number(e.target.value));
                  onPageChange(1);
                }}
                className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                {pageSizeOptions.map((size) => (
                  <option key={size} value={size}>
                    {size} entries
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((col, index) => (
                <th
                  key={col.key || index}
                  onClick={() => handleSort(col)}
                  className={`px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                    col.sortable ? "cursor-pointer hover:text-gray-700" : ""
                  }`}
                >
                  <div className="flex items-center">
                    {col.title}
                    {getSortIcon(col)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {loading && (
              <tr>
                <td colSpan={columns.length} className="px-4 py-10">
                  <div className="flex justify-center">
                    <Loading />
                  </div>
                </td>
              </tr>
            )}

            {!loading && data.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="px-4 py-16 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <svg
                      className="w-12 h-12 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <p className="text-gray-500 text-sm">{emptyMessage}</p>
                  </div>
                </td>
              </tr>
            )}

            {!loading &&
              data.map((row, rowIndex) => (
                <tr
                  key={row._id || row.id || rowIndex}
                  className="hover:bg-gray-50 transition-colors"
                >
                  {columns.map((col, colIndex) => (
                    <td
                      key={`${rowIndex}-${col.key || colIndex}`}
                      className="px-4 py-3 text-sm text-gray-700"
                    >
                      {renderCell(row, col)}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {showPagination && totalPages > 0 && (
        <div className="flex justify-between items-center gap-4 px-4 py-3 bg-gray-50 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium
                disabled:opacity-50 disabled:cursor-not-allowed
                enabled:hover:bg-gray-50 enabled:hover:border-gray-400
                transition-colors"
            >
              <FaChevronLeft className="text-xs" />
              Prev
            </button>

            {/* Page Numbers */}
            <div className="hidden sm:flex gap-1">
              {[...Array(totalPages)].map((_, i) => {
                const pageNum = i + 1;
                // Show limited page numbers
                if (
                  pageNum === 1 ||
                  pageNum === totalPages ||
                  (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={pageNum}
                      onClick={() => onPageChange(pageNum)}
                      className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors
                        ${
                          currentPage === pageNum
                            ? "bg-amber-500 text-white"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                    >
                      {pageNum}
                    </button>
                  );
                } else if (
                  (pageNum === currentPage - 2 && currentPage > 3) ||
                  (pageNum === currentPage + 2 && currentPage < totalPages - 2)
                ) {
                  return (
                    <span
                      key={pageNum}
                      className="w-8 h-8 flex items-center justify-center text-gray-400"
                    >
                      ...
                    </span>
                  );
                }
                return null;
              })}
            </div>

            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium
                disabled:opacity-50 disabled:cursor-not-allowed
                enabled:hover:bg-gray-50 enabled:hover:border-gray-400
                transition-colors"
            >
              Next
              <FaChevronRight className="text-xs" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomTable;
