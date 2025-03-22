"use client";

import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Edit,
  Plus,
  Trash,
  Utensils,
} from "lucide-react";
import { useCategory } from "../api/getCategory";
import { useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import CategoryRow from "./categoryrow";
import ItemFormModal from "./itemform";
import ItemRow from "./itemrow";
import { useUpdateMenu } from "../api/update-menu";

const MenuTable = ({
  setEditingCategory,
  setNewCategory,
  setShowAddCategory,
}) => {
  const queryClient = useQueryClient();
  const { data: categories = [], isLoading, error } = useCategory();

  const [showAddItem, setShowAddItem] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [newItem, setNewItem] = useState({
    name: "",
    price: "",
    description: "",
    image: null,
    imagePreview: null,
    available: true,
  });

  // Reset the item form
  const resetItemForm = () => {
    setNewItem({
      name: "",
      price: "",
      description: "",
      image: null,
      imagePreview: null,
      available: true,
    });
    setEditingItem(null);
    setShowAddItem(null);
  };

  // Toggle category expansion
  const toggleCategory = (categoryId) => {
    queryClient.setQueryData(["categories"], (oldData) =>
      oldData.map((category) =>
        category.id === categoryId
          ? { ...category, isExpanded: !category.isExpanded }
          : category
      )
    );
  };

  // Delete category
  const handleDeleteCategory = async (categoryId) => {
    try {
      await api.delete(`/api/cooks/delete-category/${categoryId}`);
      queryClient.invalidateQueries(["categories"]);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  // Add or edit item
  const handleAddItem = async (categoryId, values) => {
    try {
      if (editingItem) {
        // Update existing item
        await api.put(`/api/cooks/update-menu-item/${editingItem}`, {
          ...values,
          category_id: categoryId,
        });
      } else {
        // Add new item
        await api.post(`/api/cooks/add-menu-item/${categoryId}`, values);
      }
      queryClient.invalidateQueries(["categories"]);
      resetItemForm();
    } catch (error) {
      console.error("Error saving item:", error);
    }
  };

  // Delete item
  const handleDeleteItem = async (categoryId, itemId) => {
    try {
      await api.delete(`/api/cooks/delete-menu-item/${itemId}`);
      queryClient.invalidateQueries(["categories"]);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  // Toggle item availability
  const toggleItemAvailability = async (categoryId, itemId) => {
    try {
      await api.put(`/api/cooks/toggle-menu-item/${itemId}`);
      queryClient.invalidateQueries(["categories"]);
    } catch (error) {
      console.error("Error toggling item availability:", error);
    }
  };

  // Start editing item
  const { mutate: updateMenuItem } = useUpdateMenu({
    onSuccess: () => {
      console.log("Menu item updated successfully!");
    },
  });

  const handleEditItem = (categoryId, item) => {
    setNewItem({
      name: item.name,
      price: item.price,
      description: item.description,
      image: null,
      imagePreview: item.image_url,
      available: item.available ?? true,
    });
    setEditingItem(item.id);
    setShowAddItem(categoryId);
  };

  // Function to call API when editing is confirmed
  const saveEditedItem = () => {
    if (!editingItem) return;
    updateMenuItem({
      menuId: editingItem, // Pass the item ID
      data: newItem, // Pass the updated item data
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#426B1F]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        <p>Error loading menu: {error.message}</p>
      </div>
    );
  }

  // Find the current category when showAddItem is not null
  const currentCategory =
    showAddItem !== null ? categories.find((c) => c.id === showAddItem) : null;

  return (
    <div className="bg-white rounded-lg shadow overflow-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Item
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {categories.length === 0 ? (
            <tr>
              <td colSpan={4} className="px-6 py-10 text-center text-gray-500">
                <div className="flex flex-col items-center">
                  <Utensils className="h-10 w-10 mb-2 text-gray-400" />
                  <p>No menu categories yet</p>
                  <p className="text-sm">
                    Click "Add New Category" to get started
                  </p>
                </div>
              </td>
            </tr>
          ) : (
            categories.map((category) => (
              <React.Fragment key={category.id}>
                <CategoryRow
                  category={category}
                  toggleCategory={toggleCategory}
                  handleDeleteCategory={handleDeleteCategory}
                  setShowAddItem={setShowAddItem}
                  setEditingCategory={setEditingCategory}
                  setNewCategory={setNewCategory}
                  setShowAddCategory={setShowAddCategory}
                />

                {category.isExpanded &&
                  category.items?.map((item) => (
                    <ItemRow
                      key={item.id}
                      item={item}
                      categoryId={category.id}
                      handleEditItem={handleEditItem}
                      handleDeleteItem={handleDeleteItem}
                      toggleItemAvailability={toggleItemAvailability}
                    />
                  ))}
              </React.Fragment>
            ))
          )}
        </tbody>
      </table>

      {/* Only render the modal when we have a valid category */}
      {showAddItem !== null && currentCategory && (
        <ItemFormModal
          category={currentCategory}
          newItem={newItem}
          setNewItem={setNewItem}
          editingItem={editingItem}
          handleAddItem={(values) => handleAddItem(showAddItem, values)}
          onClose={resetItemForm}
          visible={true}
        />
      )}
    </div>
  );
};

export default MenuTable;
