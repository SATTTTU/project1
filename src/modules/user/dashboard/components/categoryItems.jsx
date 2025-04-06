import React from 'react';
import { useMenuItemsByCategory } from '../api/get-items';
// import { useMenuItemsByCategory } from '../path/to/your/hooks';

const CategoryMenuItems = ({ menuItemId }) => {
  const { data: menuItems, isLoading, error } = useMenuItemsByCategory(menuItemId);

  if (isLoading) return <div>Loading items...</div>;
  if (error) return <div>Error loading items: {error.message}</div>;
  if (!menuItems || menuItems.length === 0) return <div>No items found in this category</div>;

  return (
		<div>
			<h2>Menu Items</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{menuItems.map((item) => (
					<div key={item.id} className="border p-4 rounded">
						<h3>{item?.name}</h3>
						<p>Rs. {parseFloat(item.price).toFixed(2)}</p>
						{item.description && <p>{item.description}</p>}
						<button className="bg-green-600 text-white px-4 py-2 rounded mt-2">
							Add to Cart
						</button>
					</div>
				))}
			</div>
		</div>
	);
};

export default CategoryMenuItems;