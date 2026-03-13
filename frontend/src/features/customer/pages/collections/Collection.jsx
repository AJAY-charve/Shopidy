import React, { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa6";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FilterSidebar from "./FilterSidebar";
import SortOption from "./SortOption";
import ProductGrid from "../Products/ProductGrid";
import { fetchProductByFilters } from "../../../../redux/slice/productSlice";

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* MOBILE TOP BAR */}
      <div className="lg:hidden sticky top-0 z-30 bg-white border-b px-4 py-3 flex justify-between items-center">
        <h2 className="text-sm font-semibold uppercase">All Collection</h2>

        <button
          onClick={() => setIsSidebarOpen(true)}
          className="flex items-center gap-2 text-sm font-medium border px-3 py-2 rounded"
        >
          <FaFilter />
          Filter
        </button>
      </div>

      <div className="flex">
        {/* OVERLAY (mobile) */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* SIDEBAR */}
        <aside
          ref={sidebarRef}
          className={`
            fixed lg:static top-0 left-0 z-40
            w-72 h-full bg-white border-r
            transform transition-transform duration-300
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
            lg:translate-x-0
          `}
        >
          <FilterSidebar closeSidebar={() => setIsSidebarOpen(false)} />
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 p-4 lg:p-8">
          {/* DESKTOP HEADER */}
          <div className="hidden lg:flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold uppercase">All Collection</h1>

            <div className="flex items-center gap-3">
              <SortOption />

              <select
                value={rows}
                onChange={(e) => {
                  setRows(Number(e.target.value));
                  setPage(1);
                }}
                className="border px-2 py-1 rounded"
              >
                <option value={8}>8</option>
                <option value={12}>12</option>
                <option value={160}>16</option>
              </select>
            </div>
          </div>

          <ProductGrid products={products} loading={loading} error={error} />
        </main>
      </div>
    </div>
  );
};

export default Collection;
