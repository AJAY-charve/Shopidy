import React, { useState } from "react";
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

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearchToggle = () => {
    setOpen((prev) => !prev);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (!searchTerm.trim()) return;

    dispatch(setFilters({ search: searchTerm }));
    dispatch(fetchProductByFilters({ search: searchTerm }));

    navigate(`/collections/all?search=${searchTerm}`);
    setOpen(false);
  };

  return (
    <div
      className={`flex items-center justify-center transition-all duration-300
        ${
          isOpen ? "absolute top-0 left-0 w-full bg-white h-24 z-50" : "w-auto"
        }`}
    >
      {isOpen ? (
        <form
          onSubmit={handleSearch}
          className="relative flex items-center justify-center w-full"
        >
          {/* Input */}
          <div className="relative w-1/2">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-100 px-4 py-2 pl-4 pr-12 rounded-lg
              focus:outline-none w-full placeholder:text-gray-700"
            />

            {/* Search icon */}
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2
              text-gray-600 hover:text-gray-800"
            >
              <HiMagnifyingGlass className="h-6 w-6" />
            </button>
          </div>

          {/* Close button */}
          <button
            type="button"
            className="absolute right-4 top-1/2 -translate-y-1/2
            text-gray-600 hover:text-gray-800"
            onClick={handleSearchToggle}
          >
            <HiMiniXMark className="h-6 w-6" />
          </button>
        </form>
      ) : (
        <button onClick={handleSearchToggle}>
          <HiMagnifyingGlass className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
