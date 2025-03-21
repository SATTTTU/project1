import React, { useState, useEffect, useRef } from "react";
import { FiSearch } from "react-icons/fi";
import { search, useSearch } from "../api/search";

export const SearchBar = ({ navigate, handleAddToCart }) => {
  const searchRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);

  // Fetch search results using the custom hook
  const { data: searchResults, isLoading } = useSearch({
    queryConfig: {
      queryKey: ['search', searchTerm],
      queryFn: () => search({ query: searchTerm }),
      enabled: searchTerm.length > 0, // Only fetch data when there is a search term
    },
  });

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowResults(value.trim() !== "");
  };

  // Handle search submission (navigates to a search results page)
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative mt-2 md:mt-0 md:w-96" ref={searchRef}>
      <form onSubmit={handleSearchSubmit}>
        <div className="relative">
          <input
            type="text"
            placeholder="Search from menu..."
            className="pl-10 pr-4 py-2 w-full border rounded-full"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <FiSearch className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          <button
            type="submit"
            className="absolute right-2 top-1.5 bg-green-600 text-white p-1 rounded-full hover:bg-green-700 transition-colors"
            aria-label="Search"
          >
            <FiSearch className="w-4 h-4" />
          </button>
        </div>
      </form>

      {/* Search Results Dropdown */}
      {showResults && (
        <div className="absolute z-50 mt-2 w-full bg-white rounded-lg shadow-lg border overflow-hidden">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">Loading...</div>
          ) : searchResults && searchResults.length > 0 ? (
            <div className="max-h-[70vh] overflow-y-auto">
              {searchResults.map((result) => (
                <div
                  key={result.id}
                  className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer"
                  onClick={() => navigate(`/food/${result.id}`)}
                >
                  <img
                    src={result.img || "/placeholder.svg"}
                    alt={result.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{result.name}</h4>
                    <p className="text-green-600 font-semibold">${result.price}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(result);
                    }}
                    className="px-2 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700"
                  >
                    Add
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-gray-500">No results found</div>
          )}
        </div>
      )}
    </div>
  );
};
