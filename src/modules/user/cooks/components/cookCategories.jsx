import { useState } from "react";
import { BiCategory } from "react-icons/bi";
import { FiArrowLeft } from "react-icons/fi";
import { useCategoryItems } from "../api/getCategory";
import { useCategoryMenuItems } from "../api/getCategoryMenu";
import { DishCard } from "./DishCard";

export const CookCategories = ({ cookId, onAddToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Fetch all categories
  const { data: menuItems, isLoading, error } = useCategoryItems(cookId);
  console.log("cateory",menuItems)

  // Fetch menu items inside selected category
  const { data: categoryDishes, isLoading: isLoadingDishes } =
    useCategoryMenuItems(selectedCategory, { enabled: !!selectedCategory });

    console.log("menu items inside category", categoryDishes)

  if (isLoading) return <p>Loading categories...</p>;
  if (error) return <p className="text-red-500">Error fetching categories.</p>;
  if (!menuItems || menuItems.length === 0) return <p>No categories found.</p>;

  return (
    <div>
      {selectedCategory ? (
        // Show dishes when a category is selected
        <div>
          <div className="flex items-center mb-6">
            <button
              onClick={() => setSelectedCategory(null)}
              className="mr-3 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            >
              <FiArrowLeft size={24}/>
            </button>
            {/* <h3 className="text-xl font-semibold">Back to Category</h3> */}
          </div>

          {isLoadingDishes ? (
            <p>Loading dishes...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryDishes?.map((dish) => (
                <DishCard key={dish.id} dish={dish} menu_id={dish.id} onAddToCart={onAddToCart} />
              ))}
            </div>
          )}
        </div>
      ) : (
        // Show categories if no category is selected
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((category) => (
            <div
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className="relative h-40 flex items-center justify-center bg-gray-200">
                <BiCategory className="text-gray-600 text-4xl" />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold">{category.name}</h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
