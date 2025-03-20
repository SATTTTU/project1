import React from "react";
import { useMenuItems } from "../api/get-items";

export const PopularItems = () => {
	const { data: menuItems, isLoading, error } = useMenuItems();

	if (isLoading) {
		return (
			<div className="p-6 text-center">
				<div className="animate-pulse">Loading menu items...</div>
			</div>
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

	return (
		<div className="container mx-auto p-4">
			<h2 className="text-2xl font-bold mb-6">Our Menu</h2>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{menuItems.map((item) => (
					<div
						key={item.id}
						className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
					>
						{item.image && (
							<div className="h-48 overflow-hidden">
								<img
									src={item.image}
									alt={item.name}
									className="w-full h-full object-cover"
								/>
							</div>
						)}

						<div className="p-4">
							<div className="flex justify-between items-start">
								<h3 className="text-lg font-bold">{item.name}</h3>
								<span className="text-green-600 font-semibold">
									Rs. {parseFloat(item.price).toFixed(2)}
								</span>
							</div>

							{item.description && (
								<p className="text-gray-600 mt-2 text-sm">
									{item.description.length > 100
										? `${item.description.substring(0, 100)}...`
										: item.description}
								</p>
							)}

							<button className="mt-4 bg-[#426B1F] text-white px-4 py-2 rounded-md w-full hover:bg-[#375a1a] transition-colors">
								Add to Cart
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
