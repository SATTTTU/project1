import { FiStar } from "react-icons/fi";

const FilterPanel = ({ priceRange, setPriceRange, ratingFilter, setRatingFilter }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h3 className="font-bold text-lg mb-4">Filters</h3>

      <div className="mb-6">
        <h4 className="font-medium mb-2">Price Range</h4>
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-600">Rs. {priceRange[0]}</span>
          <span className="text-gray-600">Rs. {priceRange[1]}</span>
        </div>
        <input
          type="range"
          min="0"
          max="20"
          step="1"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      <div>
        <h4 className="font-medium mb-2">Minimum Rating</h4>
        <div className="flex items-center space-x-4">
          {[0, 3, 3.5, 4, 4.5].map((rating) => (
            <button
              key={rating}
              className={`flex items-center px-3 py-1 rounded-full ${
                ratingFilter === rating ? "bg-green-100 text-green-800" : "bg-gray-100"
              }`}
              onClick={() => setRatingFilter(rating)}
            >
              {rating > 0 ? (
                <>
                  <FiStar
                    className={`${ratingFilter === rating ? "text-green-600" : "text-gray-500"} mr-1 ${rating === ratingFilter ? "fill-current" : ""}`}
                  />
                  {rating}+
                </>
              ) : (
                "Any"
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;