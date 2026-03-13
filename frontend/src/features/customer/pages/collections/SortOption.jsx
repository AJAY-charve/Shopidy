import React from "react";
import { useSearchParams } from "react-router-dom";

const SortOption = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (e) => {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  };

  return (
    <select
      onChange={handleChange}
      value={searchParams.get("sortBy") || ""}
      className="border rounded-md px-3 py-2 text-sm"
    >
      <option value="">Default</option>
      <option value="priceAsc">Price: Low to High</option>
      <option value="priceDesc">Price: High to Low</option>
      <option value="popularity">Popularity</option>
    </select>
  );
};

export default SortOption;
