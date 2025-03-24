import { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { BiCategory } from "react-icons/bi";
import { DishCard } from "./dishCard";
import { useCategoryItems } from "../api/getCategory";
import { useCategoryMenuItems } from "../api/getCategoryMenu";

export const CookCategories = ({ cookId,menuId, onAddToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const { data: menuItems, isLoading, error } = useCategoryItems(cookId);
  const { data: Items } = useCategoryMenuItems(menuId);
  console.log("menu vitra item",Items)


  console.log("Fetched menu items:", menuItems);

  if (isLoading) return <p>Loading menu items...</p>;
  if (error) return <p className="text-red-500">Error fetching menu items.</p>;
  if (!menuItems || menuItems.length === 0) return <p>No menu items found.</p>;

  const categoriesMap = menuItems.reduce((acc, dish) => {
    const category = dish.name || "Other";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(dish);
    return acc;
  }, {});

  const categories = Object.keys(categoriesMap).map((name) => ({
    name,
    dishes: categoriesMap[name],
    count: categoriesMap[name].length,
  }));

  return (
    <div>
      {selectedCategory ? (
        <div>
          <div className="flex items-center mb-6">
            <button
              onClick={() => setSelectedCategory(null)}
              className="mr-3 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            >
              <FiArrowLeft />
            </button>
            <h3 className="text-xl font-semibold">{selectedCategory}</h3>
            <span className="ml-2 text-sm text-gray-500">
              ({categoriesMap[selectedCategory].length}{" "}
              {categoriesMap[selectedCategory].length === 1 ? "item" : "items"})
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoriesMap[selectedCategory].map((dish) => (
              <DishCard key={dish.id} menu_id={dish.id} dish={dish} onAddToCart={onAddToCart} />
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              onClick={() => setSelectedCategory(category.name)}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className="relative h-40">
                <img
                  src={category.dishes[0]?.img}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <div className="text-center">
                    <BiCategory className="mx-auto text-white text-3xl mb-2" />
                    <h3 className="text-white font-bold text-lg">{category.name}</h3>
                    <p className="text-white text-sm">
                      {category.count} {category.count === 1 ? "dish" : "dishes"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
