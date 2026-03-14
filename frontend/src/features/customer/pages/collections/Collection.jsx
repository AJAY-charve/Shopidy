import React, { useEffect, useRef, useState } from "react";
import { FaFilter, FaTimes } from "react-icons/fa";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FilterSidebar from "./FilterSidebar";
import SortOption from "./SortOption";
import ProductGrid from "../Products/ProductGrid";
import { fetchProductByFilters } from "../../../../redux/slice/productSlice";
import { BsGrid3X3GapFill } from "react-icons/bs";

const Collection = () => {
  const { collection } = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector((state) => state.products);

  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const queryParams = Object.fromEntries([...searchParams]);

  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(12);

  useEffect(() => {
    dispatch(
      fetchProductByFilters({
        collection,
        ...queryParams,
        page,
        limit: rows,
      }),
    );
  }, [collection, searchParams, page, rows, dispatch]);

  useEffect(() => {
    setPage(1);
  }, [collection, searchParams]);

  // Close sidebar on outside click (mobile)
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setIsSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getCollectionTitle = () => {
    if (collection === "men") return "Men's Collection";
    if (collection === "women") return "Women's Collection";
    return "All Collection";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* MOBILE TOP BAR */}
      <div className="lg:hidden sticky top-0 z-30 bg-white border-b shadow-sm px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <BsGrid3X3GapFill className="text-amber-500" />
          <h2 className="text-sm font-semibold uppercase">
            {getCollectionTitle()}
          </h2>
        </div>

        <button
          onClick={() => setIsSidebarOpen(true)}
          className="flex items-center gap-2 text-sm font-medium border border-gray-300 px-4 py-2 rounded-lg bg-white hover:bg-gray-50 transition-colors"
        >
          <FaFilter className="text-amber-500" />
          Filter
        </button>
      </div>

      <div className="flex">
        {/* OVERLAY (mobile) */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* SIDEBAR */}
        <aside
          ref={sidebarRef}
          className={`
            fixed lg:static top-0 left-0 z-40
            w-80 h-full bg-white border-r shadow-xl lg:shadow-none
            transform transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
            lg:translate-x-0
          `}
        >
          <FilterSidebar closeSidebar={() => setIsSidebarOpen(false)} />
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 p-4 lg:p-8">
          {/* DESKTOP HEADER */}
          <div className="hidden lg:flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {getCollectionTitle()}
              </h1>
              <p className="text-gray-500 mt-1">
                Showing {products.length} products
              </p>
            </div>

            <div className="flex items-center gap-3">
              <SortOption />

              <select
                value={rows}
                onChange={(e) => {
                  setRows(Number(e.target.value));
                  setPage(1);
                }}
                className="border border-gray-300 px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                <option value={8}>8 per page</option>
                <option value={12}>12 per page</option>
                <option value={16}>16 per page</option>
                <option value={24}>24 per page</option>
              </select>
            </div>
          </div>

          {/* Active Filters (Mobile) */}
          {searchParams.size > 0 && (
            <div className="lg:hidden flex flex-wrap gap-2 mb-4">
              {Array.from(searchParams.entries()).map(([key, value]) => (
                <span
                  key={key}
                  className="bg-amber-100 text-amber-700 text-xs px-3 py-1 rounded-full flex items-center gap-1"
                >
                  {key}: {value}
                  <button
                    onClick={() => {
                      searchParams.delete(key);
                      setSearchParams(searchParams);
                    }}
                    className="hover:text-amber-900"
                  >
                    <FaTimes className="text-xs" />
                  </button>
                </span>
              ))}
            </div>
          )}

          <ProductGrid products={products} loading={loading} error={error} />
        </main>
      </div>
    </div>
  );
};

export default Collection;
