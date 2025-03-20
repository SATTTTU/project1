import React, { useState, useEffect, useRef } from "react";
import { FiSearch } from "react-icons/fi";

export const SearchBar = ({ navigate, popularItems, categories, cooks, handleAddToCart }) => {
  const searchRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [searchResults, setSearchResults] = useState({
    menuItems: [],
    categories: [],
    cooks: [],
  });

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      setShowResults(false);
    } else {
      setShowResults(true);
      performSearch(value);
    }
  };

  // Handle search submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  // Perform search across all data types
  const performSearch = (term) => {
    const lowerCaseTerm = term.toLowerCase();

    // Search menu items
    const filteredMenuItems = popularItems.filter((item) => 
      item.name.toLowerCase().includes(lowerCaseTerm)
    );

    // Search categories
    const filteredCategories = categories.filter((category) => 
      category.name.toLowerCase().includes(lowerCaseTerm)
    );

    // Search cooks
    const filteredCooks = cooks.filter((cook) => 
      cook.name.toLowerCase().includes(lowerCaseTerm)
    );

    setSearchResults({
      menuItems: filteredMenuItems,
      categories: filteredCategories,
      cooks: filteredCooks,
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchResultClick = (type, id) => {
    setShowResults(false);
    if (type === "menuItem") {
      navigate(`/food/${id}`);
    } else if (type === "category") {
      navigate(`/category/${id}`);
    } else if (type === "cook") {
      navigate(`/cook/${id}`);
    }
  };

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
          {searchResults.menuItems.length === 0 &&
          searchResults.categories.length === 0 &&
          searchResults.cooks.length === 0 ? (
            <div className="p-4 text-center text-gray-500">No results found</div>
          ) : (
            <div className="max-h-[70vh] overflow-y-auto">
              <SearchResultsMenuItems 
                items={searchResults.menuItems} 
                handleSearchResultClick={handleSearchResultClick} 
                handleAddToCart={handleAddToCart}
              />
              <SearchResultsCategories 
                categories={searchResults.categories} 
                handleSearchResultClick={handleSearchResultClick} 
              />
              <SearchResultsCooks 
                cooks={searchResults.cooks} 
                handleSearchResultClick={handleSearchResultClick} 
              />
              
              {searchResults.menuItems.length > 0 && (
                <div className="mt-2 text-center">
                  <button
                    onClick={() => {
                      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
                      setShowResults(false);
                    }}
                    className="text-green-600 text-sm hover:underline"
                  >
                    See all results
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Sub-components for search results
const SearchResultsMenuItems = ({ items, handleSearchResultClick, handleAddToCart }) => {
  if (items.length === 0) return null;
  
  return (
    <div className="p-3">
      <h3 className="text-sm font-semibold text-gray-700 mb-2 border-b pb-1">Menu Items</h3>
      <div className="grid gap-3">
        {items.map((item) => (
          <div
            key={`menu-${item.productId}`}
            className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer"
            onClick={() => handleSearchResultClick("menuItem", item.productId)}
          >
            <img
              src={item.img || "/placeholder.svg"}
              alt={item.name}
              className="w-12 h-12 object-cover rounded"
            />
            <div className="flex-1">
              <h4 className="font-medium text-sm">{item.name}</h4>
              <p className="text-green-600 font-semibold">${item.price}</p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart(item);
              }}
              className="px-2 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700"
            >
              Add
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const SearchResultsCategories = ({ categories, handleSearchResultClick }) => {
  if (categories.length === 0) return null;
  
  return (
    <div className="p-3 border-t">
      <h3 className="text-sm font-semibold text-gray-700 mb-2 border-b pb-1">Categories</h3>
      <div className="flex flex-wrap gap-3">
        {categories.map((category, index) => (
          <div
            key={`category-${index}`}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => handleSearchResultClick("category", category.id)}
          >
            <img
              src={category.img || "/placeholder.svg"}
              alt={category.name}
              className="w-14 h-14 object-cover rounded-full"
            />
            <p className="text-xs mt-1">{category.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const SearchResultsCooks = ({ cooks, handleSearchResultClick }) => {
  if (cooks.length === 0) return null;
  
  return (
    <div className="p-3 border-t">
      <h3 className="text-sm font-semibold text-gray-700 mb-2 border-b pb-1">Cooks</h3>
      <div className="flex flex-wrap gap-3">
        {cooks.map((cook, index) => (
          <div
            key={`cook-${index}`}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => handleSearchResultClick("cook", cook.id)}
          >
            <img
              src={cook.img || "/placeholder.svg"}
              alt={cook.name}
              className="w-14 h-14 object-cover rounded-full"
            />
            <p className="text-xs mt-1">{cook.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};