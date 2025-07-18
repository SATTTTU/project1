import { useState } from "react";
import { BiCategory } from "react-icons/bi";
import { FiArrowLeft } from "react-icons/fi";
import { useCategoryItems } from "../api/getCategory";
import { useCategoryMenuItems } from "../api/getCategoryMenu";
import { DishCard } from "./dishCard";
import Dishes from "../../../../assets/defaultDishes.jpg";


export const CookCategories = ({ cookId, onAddToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const { data: menuItems, isLoading, error } = useCategoryItems(cookId);

  const { data: categoryDishes, isLoading: isLoadingDishes } = useCategoryMenuItems(selectedCategory, { enabled: !!selectedCategory });

  if (isLoading) return <div className="text-center py-8">Loading categories...</div>;
  if (error) return <p className="text-red-500 text-center py-8">Error fetching categories.</p>;
  if (!menuItems || menuItems.length === 0) return <p className="text-center py-8">No categories found.</p>;

  const imageBaseUrl = "https://khajabox-bucket.s3.ap-south-1.amazonaws.com/";

  return (
		<div className="p-4">
			{selectedCategory ? (
				<div>
					<div className="flex items-center mb-6">
						<button
							onClick={() => setSelectedCategory(null)}
							className="mr-3 p-3 bg-[#0e9300] text-white rounded-full hover:bg-green-700 transition-colors"
						>
							<FiArrowLeft size={24} />
						</button>
						<h3 className="text-2xl font-semibold text-gray-800">
							Back to Categories
						</h3>
					</div>

					{isLoadingDishes ? (
						<div className="flex justify-center py-8">
							<div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-500"></div>
						</div>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{categoryDishes?.map((dish) => (
								<DishCard
									key={dish.id}
									dish={dish}
									menu_id={dish.id}
									onAddToCart={onAddToCart}
								/>
							))}
						</div>
					)}
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{menuItems.map((category) => (
						<div
							key={category.id}
							onClick={() => setSelectedCategory(category.id)}
							className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow transform hover:scale-105"
						>
							<div className="relative h-80">
								<img
									src={
										category?.items[0]?.image_url
											? `${imageBaseUrl}${category?.items[0]?.image_url}`
											: Dishes
									}
									alt={category?.name}
									className="object-cover w-full h-full transition-transform duration-300 ease-in-out transform hover:scale-110"
								/>
								<div className="absolute inset-0 bg-green-700 bg-opacity-40 flex justify-center items-center text-white text-2xl font-semibold opacity-0 hover:opacity-100 transition-opacity duration-300">
									{category?.name}
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};
