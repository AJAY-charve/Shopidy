import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FaTimes, FaChevronDown, FaChevronUp } from "react-icons/fa";

const defaultFilters = {
  category: "",
  gender: "",
  color: "",
  size: [],
  material: [],
  brand: [],
  maxPrice: 5000,
};

const FilterSidebar = ({ closeSidebar }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState(defaultFilters);
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    gender: true,
    color: true,
    size: true,
    material: false,
    brand: false,
    price: true,
  });

  const categories = ["Top Wear", "Bottom Wear", "Winter Wear", "Summer Wear"];
  const genders = ["Men", "Women", "Unisex"];
  const colors = [
    "Red",
    "Blue",
    "Black",
    "Yellow",
    "White",
    "Pink",
    "Beige",
    "Green",
    "Purple",
    "Orange",
  ];
  const sizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];
  const materials = ["Cotton", "Denim", "Wool", "Silk", "Polyester", "Linen"];
  const brands = [
    "Urban Threads",
    "Fashionista",
    "ChicStyle",
    "StreetWear",
    "Classic",
  ];

  // URL → State sync
  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);

    setFilters({
      category: params.category || "",
      gender: params.gender || "",
      color: params.color || "",
      size: params.size ? params.size.split(",") : [],
      material: params.material ? params.material.split(",") : [],
      brand: params.brand ? params.brand.split(",") : [],
      maxPrice: params.maxPrice ? Number(params.maxPrice) : 5000,
    });
  }, [searchParams]);

  // State → URL update
  const updateParams = (updated) => {
    const params = new URLSearchParams();

    Object.entries(updated).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length) {
        params.set(key, value.join(","));
      } else if (
        !Array.isArray(value) &&
        value !== "" &&
        value !== null &&
        value !== 5000
      ) {
        params.set(key, value);
      }
    });

    setSearchParams(params);
  };

  const handleCheckbox = (name, value) => {
    const updated = {
      ...filters,
      [name]: filters[name].includes(value)
        ? filters[name].filter((v) => v !== value)
        : [...filters[name], value],
    };
    setFilters(updated);
    updateParams(updated);
  };

  const handleRadio = (name, value) => {
    const updated = { ...filters, [name]: value };
    setFilters(updated);
    updateParams(updated);
  };

  const handleClearFilters = () => {
    setFilters(defaultFilters);
    setSearchParams({});
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.category) count++;
    if (filters.gender) count++;
    if (filters.color) count++;
    count += filters.size.length;
    count += filters.material.length;
    count += filters.brand.length;
    if (filters.maxPrice !== 5000) count++;
    return count;
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-5 border-b bg-gradient-to-r from-gray-50 to-white">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          <p className="text-xs text-gray-500 mt-1">
            {getActiveFilterCount()} filters applied
          </p>
        </div>
        <div className="flex items-center gap-2">
          {getActiveFilterCount() > 0 && (
            <button
              onClick={handleClearFilters}
              className="text-xs text-amber-600 hover:text-amber-700 font-medium px-3 py-1 hover:bg-amber-50 rounded-full transition-colors"
            >
              Clear all
            </button>
          )}
          <button
            onClick={closeSidebar}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FaTimes />
          </button>
        </div>
      </div>

      {/* Filter Content - Scrollable */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5">
        {/* Category */}
        <div className="border-b pb-4">
          <button
            onClick={() => toggleSection("category")}
            className="flex justify-between items-center w-full mb-2"
          >
            <p className="font-medium text-gray-900">Category</p>
            {expandedSections.category ? (
              <FaChevronUp className="text-gray-400" />
            ) : (
              <FaChevronDown className="text-gray-400" />
            )}
          </button>
          {expandedSections.category && (
            <div className="space-y-2">
              {categories.map((c) => (
                <label
                  key={c}
                  className="flex items-center gap-3 text-sm text-gray-700 hover:text-amber-600 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="category"
                    checked={filters.category === c}
                    onChange={() => handleRadio("category", c)}
                    className="w-4 h-4 text-amber-500 focus:ring-amber-500"
                  />
                  {c}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Gender */}
        <div className="border-b pb-4">
          <button
            onClick={() => toggleSection("gender")}
            className="flex justify-between items-center w-full mb-2"
          >
            <p className="font-medium text-gray-900">Gender</p>
            {expandedSections.gender ? (
              <FaChevronUp className="text-gray-400" />
            ) : (
              <FaChevronDown className="text-gray-400" />
            )}
          </button>
          {expandedSections.gender && (
            <div className="space-y-2">
              {genders.map((g) => (
                <label
                  key={g}
                  className="flex items-center gap-3 text-sm text-gray-700 hover:text-amber-600 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="gender"
                    checked={filters.gender === g}
                    onChange={() => handleRadio("gender", g)}
                    className="w-4 h-4 text-amber-500 focus:ring-amber-500"
                  />
                  {g}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Color */}
        <div className="border-b pb-4">
          <button
            onClick={() => toggleSection("color")}
            className="flex justify-between items-center w-full mb-2"
          >
            <p className="font-medium text-gray-900">Color</p>
            {expandedSections.color ? (
              <FaChevronUp className="text-gray-400" />
            ) : (
              <FaChevronDown className="text-gray-400" />
            )}
          </button>
          {expandedSections.color && (
            <div className="flex flex-wrap gap-2">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => handleRadio("color", color)}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    filters.color === color
                      ? "border-amber-500 scale-110 shadow-md"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  style={{ backgroundColor: color.toLowerCase() }}
                  title={color}
                />
              ))}
            </div>
          )}
        </div>

        {/* Size */}
        <div className="border-b pb-4">
          <button
            onClick={() => toggleSection("size")}
            className="flex justify-between items-center w-full mb-2"
          >
            <p className="font-medium text-gray-900">Size</p>
            {expandedSections.size ? (
              <FaChevronUp className="text-gray-400" />
            ) : (
              <FaChevronDown className="text-gray-400" />
            )}
          </button>
          {expandedSections.size && (
            <div className="flex flex-wrap gap-2">
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => handleCheckbox("size", s)}
                  className={`px-3 py-1.5 text-sm border rounded-md transition-all ${
                    filters.size.includes(s)
                      ? "bg-amber-500 text-white border-amber-500"
                      : "bg-white text-gray-700 border-gray-300 hover:border-amber-500"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Material */}
        <div className="border-b pb-4">
          <button
            onClick={() => toggleSection("material")}
            className="flex justify-between items-center w-full mb-2"
          >
            <p className="font-medium text-gray-900">Material</p>
            {expandedSections.material ? (
              <FaChevronUp className="text-gray-400" />
            ) : (
              <FaChevronDown className="text-gray-400" />
            )}
          </button>
          {expandedSections.material && (
            <div className="space-y-2">
              {materials.map((m) => (
                <label
                  key={m}
                  className="flex items-center gap-3 text-sm text-gray-700 hover:text-amber-600 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={filters.material.includes(m)}
                    onChange={() => handleCheckbox("material", m)}
                    className="w-4 h-4 rounded text-amber-500 focus:ring-amber-500"
                  />
                  {m}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Brand */}
        <div className="border-b pb-4">
          <button
            onClick={() => toggleSection("brand")}
            className="flex justify-between items-center w-full mb-2"
          >
            <p className="font-medium text-gray-900">Brand</p>
            {expandedSections.brand ? (
              <FaChevronUp className="text-gray-400" />
            ) : (
              <FaChevronDown className="text-gray-400" />
            )}
          </button>
          {expandedSections.brand && (
            <div className="space-y-2">
              {brands.map((b) => (
                <label
                  key={b}
                  className="flex items-center gap-3 text-sm text-gray-700 hover:text-amber-600 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={filters.brand.includes(b)}
                    onChange={() => handleCheckbox("brand", b)}
                    className="w-4 h-4 rounded text-amber-500 focus:ring-amber-500"
                  />
                  {b}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Price Range */}
        <div className="pb-2">
          <button
            onClick={() => toggleSection("price")}
            className="flex justify-between items-center w-full mb-2"
          >
            <p className="font-medium text-gray-900">Price Range</p>
            {expandedSections.price ? (
              <FaChevronUp className="text-gray-400" />
            ) : (
              <FaChevronDown className="text-gray-400" />
            )}
          </button>
          {expandedSections.price && (
            <div className="space-y-3">
              <p className="text-sm text-gray-600">Max: ₹{filters.maxPrice}</p>
              <input
                type="range"
                min="0"
                max="5000"
                step="100"
                value={filters.maxPrice}
                onChange={(e) => {
                  const updated = {
                    ...filters,
                    maxPrice: Number(e.target.value),
                  };
                  setFilters(updated);
                  updateParams(updated);
                }}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>₹0</span>
                <span>₹5000+</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Apply Button */}
      <div className="lg:hidden p-5 border-t bg-white">
        <button
          onClick={closeSidebar}
          className="w-full bg-amber-500 text-white py-3 rounded-lg font-medium hover:bg-amber-600 transition-colors shadow-md"
        >
          Apply Filters ({getActiveFilterCount()})
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;
