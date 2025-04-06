import { useState, useRef, useEffect } from "react";
import { Search, X, Loader2 } from "lucide-react";
import { useAddCartItem } from "../../cart/api/addItems";
import { useSearch } from "../api/search";
import { FiStar } from "react-icons/fi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const SearchBar = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [loadingCartItem, setLoadingCartItem] = useState(null);
	const [showDropdown, setShowDropdown] = useState(false);
	const searchRef = useRef(null);
	const navigate = useNavigate();

	const { mutateAsync: addToCart } = useAddCartItem();

	const {
		data: searchResults,
		isLoading,
		error,
	} = useSearch({
		query: searchTerm,
		queryConfig: { enabled: searchTerm.length > 0 },
	});

	const handleInputChange = (e) => {
		setSearchTerm(e.target.value);
		setShowDropdown(e.target.value.length > 0);
	};

	const clearSearch = () => {
		setSearchTerm("");
		setShowDropdown(false);
	};

	const handleAddToCart = async (dish) => {
		try {
			setLoadingCartItem(dish.menu_item_id);
			await addToCart({ menu_item_id: dish.menu_item_id, quantity: 1 });
			toast.success(`${dish?.name} added to cart!`, { autoClose: 2000 });
		} catch (error) {
			console.error("Error adding to cart:", error);
			toast.error("Failed to add item to cart.", { autoClose: 2000 });
		} finally {
			setLoadingCartItem(null);
		}
	};

	useEffect(() => {
		function handleClickOutside(event) {
			if (searchRef.current && !searchRef.current.contains(event.target)) {
				setShowDropdown(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const imageUrl = "https://khajabox-bucket.s3.ap-south-1.amazonaws.com/";

	return (
		<div
			className="relative w-full max-w-4xl mx-auto px-4 py-2"
			ref={searchRef}
		>
			<div className="flex items-center border border-slate-300 rounded-full shadow-sm bg-white focus-within:ring-2 focus-within:ring-green-500 transition">
				<div className="pl-4">
					<Search className="h-5 w-5 text-gray-500" />
				</div>
				<input
					type="text"
					placeholder="Search for dishes..."
					value={searchTerm}
					onChange={handleInputChange}
					className="w-full px-4 py-2 text-base md:text-lg rounded-full focus:outline-none"
					aria-label="Search for dishes"
				/>
				{searchTerm && (
					<button
						onClick={clearSearch}
						className="pr-4 text-gray-400 hover:text-red-500"
						aria-label="Clear search"
					>
						<X className="w-5 h-5" />
					</button>
				)}
			</div>

			{showDropdown && (
				<div className="absolute left-0 mt-2 w-full bg-white border border-slate-200 rounded-lg shadow-xl z-50 max-h-[500px] overflow-y-auto">
					{isLoading && (
						<div className="flex justify-center p-6">
							<Loader2 className="h-8 w-8 animate-spin text-primary" />
						</div>
					)}

					{error && (
						<div className="p-4 bg-red-50 text-red-500 rounded-md">
							<p>Error: {error.message}</p>
						</div>
					)}

					{!isLoading && !error && searchResults?.length === 0 && (
						<div className="p-4 text-center text-gray-500">
							<p>No results found for "{searchTerm}"</p>
						</div>
					)}

					{searchResults?.length > 0 && (
						<div>
							{searchResults.map((dish) => (
								<div
									key={dish.menu_item_id}
									className="p-4 border-b border-slate-200 hover:bg-gray-100 transition flex flex-col sm:flex-row sm:items-center justify-between cursor-pointer gap-4"
									onClick={() => navigate(`/food/${dish.menu_item_id}`)}
								>
									<div className="flex items-center space-x-4">
										<img
											src={`${imageUrl}${dish?.image_url}`}
											alt={dish?.name}
											className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md shadow-sm hover:scale-105 transition-transform"
											onClick={(e) => {
												e.stopPropagation();
												navigate(`/food/${dish.menu_item_id}`);
											}}
											onError={(e) => {
												e.target.src = "/placeholder.svg";
											}}
										/>
										<div>
											<h2
												className="text-base sm:text-lg font-semibold text-blue-700 hover:underline"
												onClick={(e) => {
													e.stopPropagation();
													navigate(`/food/${dish.menu_item_id}`);
												}}
											>
												{dish?.name}
											</h2>
											<p className="text-gray-600 text-sm">
												Cook:{" "}
												<button
													className="text-blue-500 hover:underline"
													onClick={(e) => {
														e.stopPropagation();
														navigate(`/cook/${dish.cook_id}`);
													}}
												>
													{dish.cook_name}
												</button>
											</p>
											<p className="text-gray-800 font-bold text-sm">
												Rs. {dish.price}
											</p>
											<div className="flex items-center mt-1">
												{[...Array(5)].map((_, index) => (
													<FiStar
														key={index}
														className={`h-4 w-4 ${
															index < Math.round(dish.average_rating)
																? "text-yellow-400 fill-yellow-400"
																: "text-gray-300"
														}`}
													/>
												))}
											</div>
										</div>
									</div>

									<button
										className="bg-[#426B1F] text-white text-sm sm:text-base py-2 px-4 rounded-md font-semibold hover:bg-green-700 transition disabled:opacity-50"
										onClick={(e) => {
											e.stopPropagation();
											handleAddToCart(dish);
										}}
										disabled={loadingCartItem === dish.menu_item_id}
										aria-label={`Add ${dish?.name} to cart`}
									>
										{loadingCartItem === dish.menu_item_id
											? "Adding..."
											: "Add to Cart"}
									</button>
								</div>
							))}
						</div>
					)}
				</div>
			)}
		</div>
	);
};
