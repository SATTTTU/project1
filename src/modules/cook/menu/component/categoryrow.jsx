// components/CategoryRow.jsx
import React from "react";
import { ChevronDown, ChevronUp, Edit, Plus, Trash } from "lucide-react";

const CategoryRow = ({
  category,
  toggleCategory,
  handleDeleteCategory,
  resetItemForm,
  setShowAddItem,
  setEditingCategory,
  setNewCategory,
  setShowAddCategory,
}) => {
  return (
    <tr className="bg-gray-50">
      <td className="px-6 py-4">
        <div className="flex items-center">
          <button
            onClick={() => toggleCategory(category.id)}
            className="mr-2 text-gray-500 hover:text-gray-700"
          >
            {category.isExpanded ? (
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
  );
};

export default CategoryRow;
