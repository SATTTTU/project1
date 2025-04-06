import React, { useCallback,  useReducer } from "react";
import { useCategory } from "../../menu/api/getCategory";
import { FoodItem } from "./fooditem";

// Reducer for toggling category expansion state
const categoryReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE":
      return { ...state, [action.id]: !state[action.id] };
    default:
      return state;
  }
};

const MenuManagement = () => {
  const { data: categories, isLoading, error } = useCategory();
  const [expandedCategories, dispatch] = useReducer(categoryReducer, {});

  // Memoized toggle function
  const toggleCategory = useCallback(
    (categoryId) => dispatch({ type: "TOGGLE", id: categoryId }),
    []
  );

  if (isLoading) return <p className="text-center py-8 text-gray-600">Loading menu...</p>;
  if (error) return <p className="text-center py-8 text-red-500">Error: {error.message}</p>;

  return (
		<div className="container mx-auto px-4 py-6">
			<h1 className="text-2xl font-bold mb-6">Menu Management</h1>

			{categories.map((category) => (
				<div
					key={category.id}
					className="mb-6 border rounded-lg shadow-sm bg-white"
				>
					<button
						className="w-full flex justify-between items-center p-4 border-b cursor-pointer hover:bg-gray-50 focus:outline-none"
						onClick={() => toggleCategory(category.id)}
						aria-expanded={expandedCategories[category.id]}
					>
						<h2 className="text-xl font-semibold">{category?.name}</h2>
						<span className="text-sm text-gray-600 hover:text-gray-800">
							{expandedCategories[category.id] ? "▲ Collapse" : "▼ Expand"}
						</span>
					</button>

					{expandedCategories[category.id] && (
						<div className="p-4">
							{category.items.length > 0 ? (
								<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
									{category.items.map((item) => (
										<FoodItem key={item.id} item={item} />
									))}
								</div>
							) : (
								<p className="text-center text-gray-500">
									No items in this category
								</p>
							)}
						</div>
					)}
				</div>
			))}
		</div>
	);
};

export default MenuManagement;
