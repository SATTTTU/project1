import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, Edit, Plus, Trash } from "lucide-react";
import { useCategory } from "../api/getCategory";

const CategoryRow = ({
  categoryId,
  toggleCategory,
  handleDeleteCategory,
  resetItemForm,
  setShowAddItem,
  setEditingCategory,
  setNewCategory,
  setShowAddCategory,
}) => {
  const [category, setCategory] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const { data, isLoading, error, isError } = useCategory();

  useEffect(() => {
    if (data) {
      const foundCategory = data.find((item) => item.id === Number(categoryId));
      setCategory(foundCategory);
    }
  }, [categoryId, data]);

  // Function to construct the full image URL
  const getFullImageUrl = (imagePath) => {
    if (!imagePath) return "/api/placeholder/80/80";
    if (imagePath.startsWith("http")) return imagePath;
    const baseUrl = import.meta.env.VITE_APP_API_URL;
    const storageUrl = baseUrl.endsWith("/")
      ? `${baseUrl}storage/`
      : `${baseUrl}/storage/`;
    return `${storageUrl}${imagePath}`;
  };

  if (isLoading) {
    return <tr><td colSpan="4" className="text-center">Loading...</td></tr>;
  }

  if (isError) {
    return <tr><td colSpan="4" className="text-center">Error: {error.message}</td></tr>;
  }

  if (!category) {
    return <tr><td colSpan="4" className="text-center">Category not found</td></tr>;
  }

  return (
    <>
      <tr className="bg-gray-50">
        <td className="px-6 py-4">
          <div className="flex items-center">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mr-2 text-gray-500 hover:text-gray-700"
            >
              {isExpanded ? (
                <ChevronUp size={18} />
              ) : (
                <ChevronDown size={18} />
              )}
            </button>
            <span className="font-medium">{category.name}</span>
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
              setNewCategory(category.name);
              setShowAddCategory(true);
            }}
            className="text-blue-500 hover:text-blue-700"
          >
            <Edit size={18} />
          </button>
          <button
            onClick={() => {
              resetItemForm();
              setShowAddItem(category.id);
            }}
            className="text-[#426B1F] hover:text-[#365818]"
          >
            <Plus size={18} />
          </button>
          <button
            onClick={() => handleDeleteCategory(category.id)}
            className="text-red-500 hover:text-red-700"
          >
            <Trash size={18} />
          </button>
        </td>
      </tr>
      {isExpanded && category.items.length > 0 && (
        <tr>
          <td colSpan="4" className="px-6 py-4">
            <div className="space-y-1"> {/* Simple vertical list */}
              {category.items.map((item) => (
                <div key={item.id} className="flex items-center py-2 border-b border-gray-100">
                  <div className="w-12 h-12 mr-3 flex-shrink-0">
                    <img
                      src={getFullImageUrl(item.image_url)}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-sm font-medium">{item.name}</h3>
                    <p className="text-xs text-gray-500">{item.description}</p>
                  </div>
                  <div className="text-right flex-shrink-0 ml-4">
                    <p className="text-sm font-semibold">${item.price}</p>
                  </div>
                  <div className="flex-shrink-0 ml-4 flex space-x-2">
                    <button className="text-gray-400 hover:text-blue-500">
                      <Edit size={16} />
                    </button>
                    <button className="text-gray-400 hover:text-red-500">
                      <Trash size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default CategoryRow;