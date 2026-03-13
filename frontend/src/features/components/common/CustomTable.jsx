import Loading from "./Loading";

const CustomTable = ({
  columns = [],
  data = [],
  loading = false,
  currentPage,
  totalPages,
  onPageChange,
  rowsPerPage,
  onRowsPerPageChange,
  pageSizeOptions = [10, 20, 50],
}) => {
  return (
    <div className="bg-white rounded-sm shadow w-full">
      {/* top controls */}
      <div className="flex justify-between items-center p-2 lg:p-4 xl:p-6 border-b">
        <p className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </p>

        <select
          value={rowsPerPage}
          onChange={(e) => {
            onRowsPerPageChange(Number(e.target.value));
            onPageChange(1);
          }}
          className="border rounded px-2 py-1 text-sm"
        >
          {pageSizeOptions.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      {/* table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className="px-4 py-3 text-left">
                  {col.title}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td colSpan={columns.length} className="text-center py-10">
                  {/* Loading... */}
                  <Loading />
                </td>
              </tr>
            )}

            {!loading && data.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="text-center py-10">
                  No data found
                </td>
              </tr>
            )}

            {!loading &&
              data.map((row, index) => (
                <tr key={row._id || index} className="border-b">
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3">
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* pagination */}
      <div className="flex justify-center gap-4 p-2 lg:p-4 xl:p-6">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded"
        >
          Prev
        </button>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CustomTable;
