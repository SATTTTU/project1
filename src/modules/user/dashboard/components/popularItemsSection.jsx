import React, { useState } from "react";
import { usePopularDishes } from "../api/get-items";
import { useAddCartItem } from "../../cart/api/addItems";
import { toast } from "react-toastify";
import Dishes from "../../../../assets/defaultDishes.jpg";
import { useNavigate } from "react-router-dom";

export const PopularItemsPage = () => {
  const navigate = useNavigate();
  const { data: menuItems, isLoading, error } = usePopularDishes();
  const { mutateAsync: addToCart, isLoading: isAddingToCart } = useAddCartItem();
  const imageUrl = "https://khajabox-bucket.s3.ap-south-1.amazonaws.com/";

  const [visibleItems, setVisibleItems] = useState(4);

  const handleAddToCart = async (dish, e) => {
		e.stopPropagation();
		try {
			await addToCart({
				menu_item_id: dish.menu_item_id,
				quantity: 1,
			});
			toast.success(`${dish?.name} added to cart! 🛒`);
		} catch (error) {
			toast.error("Failed to add item to cart. Try again!");
			console.error("Error adding to cart:", error);
		}
	};

	// const handleLoadMore = () => {
	//   setVisibleItems((prev) => prev + 6);
	// };

	if (isLoading) {
		return (
			<div className="p-6 text-center animate-pulse">Loading menu items...</div>
		);
	}

	if (error) {
		return (
			<div className="p-6 text-center text-red-500">
				Error loading menu items: {error.message}
			</div>
		);
	}

	if (!menuItems || menuItems.length === 0) {
		return (
			<div className="p-6 text-center">
				No menu items available at the moment.
			</div>
		);
	}

	const itemsToShow = menuItems.slice(0, visibleItems);

	return (
		<div className="container mx-auto px-4 py-6">
			<h2 className="text-3xl font-bold mb-8 text-center text-[#0e9300]">
				Our Popular Dishes
			</h2>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{itemsToShow.map((item) => (
					<div
						key={item.id}
						onClick={() => navigate(`/food/${item.menu_item_id}`)}
						className="bg-white rounded-2xl shadow-lg border border-slate-200 hover:shadow-2xl hover:scale-[1.02] transition-transform duration-300 cursor-pointer flex flex-col"
					>
						<div className="h-48 w-full overflow-hidden rounded-t-2xl">
							<img
								src={item?.image_url ? `${imageUrl}${item.image_url}` : Dishes}
								alt={item?.name || "Dish"}
								className="w-full h-full object-cover"
								onError={(e) => (e.target.src = Dishes)}
							/>
						</div>

						<div className="p-4 flex flex-col flex-grow">
							<div className="flex items-center gap-2 mb-1">
								<div
									onClick={(e) => {
										e.stopPropagation();
										navigate(`/cook/${item.cook_id}`);
									}}
									className="flex items-center gap-2 cursor-pointer group"
								>
									<p className="text-sm text-gray-600 group-hover:text-green-600">
										<span className="font-bold">Cook:</span> {item.cook_name}
									</p>
								</div>
							</div>

							<h3 className="text-lg font-semibold text-gray-800 mb-1">
								{item?.name}
							</h3>

							{/* <p className="text-md font-bold text-green-700 mb-2">
                Rs. {item.price}
              </p> */}

							{item.description && (
								<p className="text-sm text-gray-500 mb-4">
									{item.description.length > 80
										? `${item.description.substring(0, 80)}...`
										: item.description}
								</p>
							)}

							<div className="mt-auto pt-2 flex justify-between items-center">
								<button
									className="bg-[#0e9300] text-white py-1.5 px-4 rounded-md font-medium hover:bg-green-800 transition-all text-sm"
									onClick={(e) => handleAddToCart(item, e)}
									disabled={isAddingToCart}
								>
									{isAddingToCart ? "Adding..." : "Add to Cart"}
								</button>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* {visibleItems < menuItems.length && (
        <div className="text-center mt-8">
          <button
            onClick={handleLoadMore}
            className="text-[#426B1F] border border-[#426B1F] py-2 px-6 rounded-md font-semibold transition hover:bg-[#426B1F] hover:text-white"
            disabled={isAddingToCart}
          >
            {isAddingToCart ? "Loading..." : "Load More..."}
          </button>
        </div>
      )} */}
		</div>
	);
};
