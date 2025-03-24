import React, { useState, useRef, useEffect } from "react";
import { useSearch } from "../api/search";
import { useNavigate } from "react-router-dom";
import { useGetSingleCook } from "../../cooks/api/getCookProfie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { storeCartItem } from "../../cart/api/addItems";
import { IoSearchOutline } from "react-icons/io5";

export const SearchBar = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCookId, setSelectedCookId] = useState(null);
	const [loadingCartItem, setLoadingCartItem] = useState(null);
	const [showDropdown, setShowDropdown] = useState(false);
	const navigate = useNavigate();
	const searchRef = useRef(null);

	const {
		data: searchResults,
		isLoading,
		error,
	} = useSearch({
		query: searchTerm,
		queryConfig: { enabled: searchTerm.length > 0 },
	});

	const { isFetching } = useGetSingleCook(selectedCookId, {
		queryConfig: {
			enabled: !!selectedCookId,
			onSuccess: () => {
				navigate(`/cook/${selectedCookId}`);
			},
		},
	});

	const handleInputChange = (e) => {
		setSearchTerm(e.target.value);
		setShowDropdown(e.target.value.length > 0);
	};

	const handleCookClick = (cookId) => {
		setSelectedCookId(cookId);
		setShowDropdown(false);
	};

	const handleAddToCart = async (dish) => {
		try {
			setLoadingCartItem(dish.menu_item_id);
			await storeCartItem({ menu_item_id: dish.menu_item_id, quantity: 1 });

			toast.success(`${dish.name} added to cart! 🛒`, {
				position: "top-right",
			});
		} catch (error) {
			toast.error("Failed to add item to cart. Try again!", {
				position: "top-right",
			});
			console.error("Error adding to cart:", error);
		} finally {
			setLoadingCartItem(null);
		}
	};

	// Close dropdown when clicking outside
	useEffect(() => {
		function handleClickOutside(event) {
			if (searchRef.current && !searchRef.current.contains(event.target)) {
				setShowDropdown(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<div className="relative p-6" ref={searchRef}>
			{/* Search Input */}
      <div className="flex rounded-full border border-slate-300 lg:shadow-lg w-full">
  <div className="ml-4 flex items-center">
    <IoSearchOutline />
  </div>
  <input
  type="text"
  placeholder="Search for dishes..."
  value={searchTerm}
  onChange={handleInputChange}
  className="w-full sm:w-96 md:w-[500px] lg:w-[600px] xl:w-[700px] p-3 text-lg focus:outline-none transition-all duration-200"
/>

</div>


			{/* Search Results Popup */}
			{showDropdown && (
				<div className="absolute left-0 mt-2 w-full max-w-2xl bg-white shadow-lg rounded-lg p-4 z-50">
					{isLoading && <p className="text-gray-600">Loading...</p>}
					{error && <p className="text-red-500">Error: {error.message}</p>}

					{searchResults?.length > 0 ? (
						<div className="max-h-80 overflow-y-auto">
							{searchResults.map((dish) => (
								<div
									key={dish.menu_item_id}
									className="p-3 border-b hover:bg-gray-100 transition flex items-center justify-between"
								>
									{/* Dish Info */}
									<div className="flex items-center space-x-4">
										<img
											src={dish.image_url}
											alt={dish.name}
											className="w-16 h-16 rounded-md object-cover"
										/>
										<div>
											<h2 className="text-lg font-semibold">{dish.name}</h2>
											<p className="text-gray-600">
												Cook:{" "}
												<span
													className="font-medium text-blue-500 hover:underline cursor-pointer"
													onClick={() => handleCookClick(dish.cook_id)}
												>
													{dish.cook_name}
												</span>
											</p>
											<p className="text-gray-800 font-bold">${dish.price}</p>
										</div>
									</div>

									{/* Add to Cart Button */}
									<button
										className="bg-[#426B1F] text-white py-2 px-4 rounded-md font-semibold hover:bg-[#426B1F] transition disabled:opacity-50"
										onClick={() => handleAddToCart(dish)}
										disabled={loadingCartItem === dish.menu_item_id}
									>
										{loadingCartItem === dish.menu_item_id
											? "Adding..."
											: "Add to Cart 🛒"}
									</button>
								</div>
							))}
						</div>
					) : (
						<p className="text-gray-500">No results found</p>
					)}
				</div>
			)}

			{/* Show loading state if fetching cook details */}
			{isFetching && (
				<p className="mt-4 text-blue-500 text-center">
					Loading cook profile...
				</p>
			)}
		</div>
	);
};
