// components/CategoryForm.jsx
import React from "react";
import { X } from "lucide-react";

const CategoryForm = ({
  newCategory,
  setNewCategory,
  editingCategory,
  categories,
  setCategories,
  setShowAddCategory,
  setEditingCategory,
}) => {
  // Add or edit category
  const handleAddCategory = () => {
    if (newCategory.trim()) {
      if (editingCategory) {
        // Update existing category
        setCategories(
          categories.map((category) =>
            category.id === editingCategory
              ? { ...category, name: newCategory }
              : category
          )
        );
        setEditingCategory(null);
      } else {
        // Check if category already exists
        const existingCategory = categories.find(
          (c) => c.name.toLowerCase() === newCategory.toLowerCase()
        );

        if (existingCategory) {
          // If exists, just focus on it
          setCategories(
            categories.map((c) =>
              c.id === existingCategory.id ? { ...c, isExpanded: true } : c
            )
          );
        } else {
          // Add new category
          const newId = Math.max(...categories.map((c) => c.id), 0) + 1;
          setCategories([
            ...categories,
            {
              id: newId,
              name: newCategory,
              isExpanded: true,
              items: [],
            },
          ]);
        }
      }
      setNewCategory("");
      setShowAddCategory(false);
    }
  };

  return (
    <div className="mb-6 p-4 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">
          {editingCategory ? "Edit Category" : "Add New Category"}
        </h3>
        <button
          onClick={() => setShowAddCategory(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          <X size={18} />
        </button>
      </div>
      <div className="flex-col flex gap-2">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Category Name"
          className="flex-1 p-2 border rounded"
        />

        <button
          onClick={handleAddCategory}
          className="bg-[#426B1F] w-fit flex justify-end items-end text-white px-4 py-2 rounded hover:bg-[#365818]"
        >
          {editingCategory ? "Update" : "Add"}
        </button>
      </div>
    </div>
  );
};

export default CategoryForm;
