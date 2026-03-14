// import React, { useState } from "react";
// import { HiMagnifyingGlass, HiMiniXMark } from "react-icons/hi2";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import {
//   fetchProductByFilters,
//   setFilters,
// } from "../../../redux/slice/productSlice";

// const SearchBar = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isOpen, setOpen] = useState(false);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleSearchToggle = () => {
//     setOpen((prev) => !prev);
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();

//     if (!searchTerm.trim()) return;

//     dispatch(setFilters({ search: searchTerm }));
//     dispatch(fetchProductByFilters({ search: searchTerm }));

//     navigate(`/collections/all?search=${searchTerm}`);
//     setOpen(false);
//   };

//   return (
//     <div
//       className={`flex items-center justify-center transition-all duration-300
//         ${
//           isOpen ? "absolute top-0 left-0 w-full bg-white h-24 z-50" : "w-auto"
//         }`}
//     >
//       {isOpen ? (
//         <form
//           onSubmit={handleSearch}
//           className="relative flex items-center justify-center w-full"
//         >
//           {/* Input */}
//           <div className="relative w-1/2">
//             <input
//               type="text"
//               placeholder="Search"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="bg-gray-100 px-4 py-2 pl-4 pr-12 rounded-lg
//               focus:outline-none w-full placeholder:text-gray-700"
//             />

//             {/* Search icon */}
//             <button
//               type="submit"
//               className="absolute right-2 top-1/2 -translate-y-1/2
//               text-gray-600 hover:text-gray-800"
//             >
//               <HiMagnifyingGlass className="h-6 w-6" />
//             </button>
//           </div>

//           {/* Close button */}
//           <button
//             type="button"
//             className="absolute right-4 top-1/2 -translate-y-1/2
//             text-gray-600 hover:text-gray-800"
//             onClick={handleSearchToggle}
//           >
//             <HiMiniXMark className="h-6 w-6" />
//           </button>
//         </form>
//       ) : (
//         <button onClick={handleSearchToggle}>
//           <HiMagnifyingGlass className="h-6 w-6" />
//         </button>
//       )}
//     </div>
//   );
// };

// export default SearchBar;

import React, { useState, useRef, useEffect } from "react";
import { HiMagnifyingGlass, HiMiniXMark } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchProductByFilters,
  setFilters,
} from "../../../redux/slice/productSlice";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);

  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("recentSearches");
    if (saved) {
      setRecentSearches(JSON.parse(saved).slice(0, 5));
    }
  }, []);

  const handleSearchToggle = () => {
    setOpen((prev) => !prev);
    if (!isOpen) {
      setSearchTerm("");
    }
  };

  const saveSearch = (term) => {
    const updated = [term, ...recentSearches.filter((s) => s !== term)].slice(
      0,
      5,
    );
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  const handleSearch = (e, searchQuery = searchTerm) => {
    e?.preventDefault();

    const query = searchQuery.trim();
    if (!query) return;

    saveSearch(query);

    dispatch(setFilters({ search: query }));
    dispatch(fetchProductByFilters({ search: query }));

    navigate(`/collections/all?search=${encodeURIComponent(query)}`);
    setOpen(false);
  };

  const handleRecentClick = (term) => {
    setSearchTerm(term);
    handleSearch(null, term);
  };

  const clearRecent = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  };

  return (
    <div className="relative">
      {/* Search Toggle Button (Desktop) */}
      <button
        onClick={handleSearchToggle}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        aria-label="Search"
      >
        <HiMagnifyingGlass className="h-5 w-5 text-gray-700" />
      </button>

      {/* Search Overlay */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={handleSearchToggle}
          />

          {/* Search Panel */}
          <div className="absolute top-full right-0 mt-2 w-96 bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden">
            {/* Search Form */}
            <form onSubmit={handleSearch} className="p-4 border-b">
              <div className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pl-11 pr-12 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />

                {/* Search Icon */}
                <HiMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />

                {/* Clear Button */}
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => setSearchTerm("")}
                    className="absolute right-12 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <HiMiniXMark className="h-5 w-5" />
                  </button>
                )}

                {/* Search Button */}
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-amber-500 text-white p-1.5 rounded-lg hover:bg-amber-600 transition-colors"
                >
                  <HiMagnifyingGlass className="h-4 w-4" />
                </button>
              </div>
            </form>

            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-gray-700">
                    Recent Searches
                  </h3>
                  <button
                    onClick={clearRecent}
                    className="text-xs text-gray-500 hover:text-amber-600"
                  >
                    Clear all
                  </button>
                </div>
                <div className="space-y-2">
                  {recentSearches.map((term, index) => (
                    <button
                      key={index}
                      onClick={() => handleRecentClick(term)}
                      className="flex items-center gap-2 w-full px-2 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <HiMagnifyingGlass className="h-4 w-4 text-gray-400" />
                      <span>{term}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Popular Categories */}
            <div className="p-4 bg-gray-50 border-t">
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                Popular Categories
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "Men",
                  "Women",
                  "Top Wear",
                  "Bottom Wear",
                  "New Arrivals",
                ].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleRecentClick(cat)}
                    className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs text-gray-600 hover:border-amber-500 hover:text-amber-600 transition-colors"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-3 text-center border-t">
              <p className="text-xs text-gray-500">
                Press{" "}
                <kbd className="px-2 py-1 bg-gray-100 rounded border">
                  Enter
                </kbd>{" "}
                to search
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SearchBar;
