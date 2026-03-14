import { useSearchParams } from "react-router-dom";
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";

const SortOption = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSort = searchParams.get("sortBy") || "";

  const handleChange = (e) => {
    const value = e.target.value;
    if (value) {
      searchParams.set("sortBy", value);
    } else {
      searchParams.delete("sortBy");
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="relative">
      <select
        onChange={handleChange}
        value={currentSort}
        className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent cursor-pointer hover:border-amber-500 transition-colors"
      >
        <option value="">Sort by: Default</option>
        <option value="priceAsc">Price: Low to High</option>
        <option value="priceDesc">Price: High to Low</option>
        <option value="popularity">Popularity</option>
        <option value="newest">Newest First</option>
        <option value="rating">Customer Rating</option>
      </select>
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
        {currentSort === "priceAsc" ? (
          <FaSortAmountUp className="text-amber-500 text-sm" />
        ) : currentSort === "priceDesc" ? (
          <FaSortAmountDown className="text-amber-500 text-sm" />
        ) : (
          <svg
            className="w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        )}
      </div>
    </div>
  );
};

export default SortOption;
