
import React, { useState } from "react";
import { ChevronDown, ChevronUp, Edit, Plus, Trash } from 'lucide-react';

const CategoryRow = ({
  category,
  toggleCategory,
  handleDeleteCategory,
  setShowAddItem,
  setEditingCategory,
  setNewCategory,
  setShowAddCategory,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getFullImageUrl = (imagePath) => {
    if (!imagePath) return "/api/placeholder/80/80";

    if (imagePath.startsWith("http")) return imagePath;

    const storageUrl = import.meta.env.VITE_BUCKET_URL.endsWith("/")
      ? `${import.meta.env.VITE_BUCKET_URL}/`
      : `${import.meta.env.VITE_BUCKET_URL}/`;
    return `${storageUrl}${imagePath}`;
  };

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
    toggleCategory(category.id);
  };

  if (!category) {
    return <tr><td colSpan={4} className="text-center">Category not found</td></tr>;
  }

  return (
		<>
			{/* Category Row */}
			<tr className="bg-gray-50">
				<td className="px-6 py-4">
					<div className="flex items-center">
						<button
							onClick={handleToggleExpand}
							className="mr-2 text-gray-500 hover:text-gray-700"
						>
							{isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
						</button>
						<span className="font-medium">{category?.name}</span>
					</div>
				</td>
				<td className="px-6 py-4"></td>
				<td className="px-6 py-4">
					<span className="text-sm text-gray-500">
						{category.items.length} items
					</span>
				</td>
				<td className="px-6 py-4 text-right text-sm space-x-2">
					<button
						onClick={() => {
							setEditingCategory(category.id);
							setNewCategory(category?.name);
							setShowAddCategory(true);
						}}
						className="text-blue-500 hover:text-blue-700 cursor-pointer"
					>
						<Edit size={18} />
					</button>
					<button
						onClick={() => {
							setShowAddItem(category.id);
						}}
						className="text-[#426B1F] hover:text-[#365818] cursor-pointer"
					>
						<Plus size={18} />
					</button>
					<button
						onClick={() => handleDeleteCategory(category.id)}
						className="text-red-500 hover:text-red-700 cursor-pointer"
					>
						<Trash size={18} />
					</button>
				</td>
			</tr>
		</>
	);
};

export default CategoryRow;
