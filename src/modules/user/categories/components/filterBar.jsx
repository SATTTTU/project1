import { FiFilter } from "react-icons/fi";

export const FilterBar = ({ isFilterOpen, setIsFilterOpen, sortOption, setSortOption }) => {
  return (
    <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center">
      <button
        className="mb-4 md:mb-0 flex items-center px-4 py-2 bg-white border rounded-lg shadow-sm hover:bg-gray-50"
        onClick={() => setIsFilterOpen(!isFilterOpen)}
      >
        <FiFilter className="mr-2" />
        Filter
      </button>

      <div className="flex items-center">
        <span className="mr-2 text-gray-600">Sort by:</span>
        <select
          className="px-4 py-2 bg-white border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="recommended">Recommended</option>
          <option value="price-low-high">Price: Low to High</option>
          <option value="price-high-low">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>
    </div>
  );
};

