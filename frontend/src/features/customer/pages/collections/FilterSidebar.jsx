import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

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

  const categories = ["Top Wear", "Bottom Wear"];
  const genders = ["Men", "Women"];
  const colors = ["red", "blue", "black", "yellow", "white", "pink", "beige"];
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const materials = ["Cotton", "Denim", "Wool", "Silk"];
  const brands = ["Urban Threads", "Fashionista", "ChicStyle"];

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
      } else if (!Array.isArray(value) && value !== "" && value !== null) {
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

  const handleClearFilters = () => {
    setFilters(defaultFilters);
    setSearchParams({});
  };

  return (
    <div className="p-5 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Filters</h2>
        <button
          onClick={handleClearFilters}
          className="text-sm text-red-500 hover:underline cursor-pointer"
        >
          Clear all
        </button>
      </div>

      {/* Category */}
      <div>
        <p className="font-medium mb-2">Category</p>
        {categories.map((c) => (
          <label key={c} className="flex gap-2 items-center">
            <input
              type="radio"
              checked={filters.category === c}
              onChange={() => {
                const updated = { ...filters, category: c };
                setFilters(updated);
                updateParams(updated);
              }}
            />
            {c}
          </label>
        ))}
      </div>

      {/* Gender */}
      <div>
        <p className="font-medium mb-2">Gender</p>
        {genders.map((g) => (
          <label key={g} className="flex gap-2 items-center">
            <input
              type="radio"
              checked={filters.gender === g}
              onChange={() => {
                const updated = { ...filters, gender: g };
                setFilters(updated);
                updateParams(updated);
              }}
            />
            {g}
          </label>
        ))}
      </div>

      {/* Color */}
      <div>
        <p className="font-medium mb-2">Color</p>
        <div className="flex gap-2 flex-wrap">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => {
                const updated = { ...filters, color };
                setFilters(updated);
                updateParams(updated);
              }}
              className={`w-8 h-8 rounded-full border ${
                filters.color === color ? "ring-2 ring-black" : ""
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>

      {/* Size */}
      <div>
        <p className="font-medium mb-2">Size</p>
        {sizes.map((s) => (
          <label key={s} className="flex gap-2 items-center">
            <input
              type="checkbox"
              checked={filters.size.includes(s)}
              onChange={() => handleCheckbox("size", s)}
            />
            {s}
          </label>
        ))}
      </div>

      {/* Material */}
      <div>
        <p className="font-medium mb-2">Material</p>
        {materials.map((m) => (
          <label key={m} className="flex gap-2 items-center">
            <input
              type="checkbox"
              checked={filters.material.includes(m)}
              onChange={() => handleCheckbox("material", m)}
            />
            {m}
          </label>
        ))}
      </div>

      {/* Brand */}
      <div>
        <p className="font-medium mb-2">Brand</p>
        {brands.map((b) => (
          <label key={b} className="flex gap-2 items-center">
            <input
              type="checkbox"
              checked={filters.brand.includes(b)}
              onChange={() => handleCheckbox("brand", b)}
            />
            {b}
          </label>
        ))}
      </div>

      {/* Price */}
      <div>
        <p className="font-medium mb-2">Max Price: ₹{filters.maxPrice}</p>
        <input
          type="range"
          min="0"
          max="5000"
          value={filters.maxPrice}
          onChange={(e) => {
            const updated = {
              ...filters,
              maxPrice: Number(e.target.value),
            };
            setFilters(updated);
            updateParams(updated);
          }}
          className="w-full"
        />
      </div>

      {/* Mobile Apply */}
      <button
        onClick={closeSidebar}
        className="lg:hidden w-full bg-black text-white py-2 rounded"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default FilterSidebar;
