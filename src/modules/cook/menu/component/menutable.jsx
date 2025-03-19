import React from "react";
import {
  ChevronDown,
  ChevronUp,
  Edit,
  Plus,
  Trash,
  Utensils,
} from "lucide-react";
import ItemForm from "./ItemForm";
import CategoryRow from "./CategoryRow";
import ItemRow from "./ItemRow";

const MenuTable = ({
  categories,
  setCategories,
  showAddItem,
  setShowAddItem,
  editingItem,
  setEditingItem,
  newItem,
  setNewItem,
  resetItemForm,
  setEditingCategory,
  setNewCategory,
  setShowAddCategory,
}) => {
  // Toggle category expansion
  const toggleCategory = (categoryId) => {
    setCategories(
      categories.map((category) =>
        category.id === categoryId
          ? { ...category, isExpanded: !category.isExpanded }
          : category
      )
    );
  };

  // Delete category
  const handleDeleteCategory = (categoryId) => {
    setCategories(categories.filter((category) => category.id !== categoryId));
  };

  // Add or edit item
  const handleAddItem = (categoryId) => {
    if (newItem.name.trim() && newItem.price) {
      if (editingItem) {
        // Update existing item
        setCategories(
          categories.map((category) =>
            category.id === categoryId
              ? {
                  ...category,
                  items: category.items.map((item) =>
                    item.id === editingItem
                      ? {
                          ...item,
                          name: newItem.name,
                          price: parseFloat(newItem.price),
                          description: newItem.description,
                          image: newItem.imagePreview || item.image,
                          available: newItem.available,
                        }
                      : item
                  ),
                }
              : category
          )
        );
      } else {
        // Add new item
        setCategories(
          categories.map((category) =>
            category.id === categoryId
              ? {
                  ...category,
                  items: [
                    ...category.items,
                    {
                      id: Date.now(),
                      name: newItem.name,
                      price: parseFloat(newItem.price),
                      description: newItem.description,
                      image: newItem.imagePreview || "/placeholder.svg",
                      available: newItem.available,
                    },
                  ],
                }
              : category
          )
        );
      }
      resetItemForm();
    }
  };

  // Start editing item
  const handleEditItem = (categoryId, item) => {
    setNewItem({
      name: item.name,
      price: item.price,
      description: item.description,
      image: null,
      imagePreview: item.image,
      available: item.available,
    });
    setEditingItem(item.id);
    setShowAddItem(categoryId);
  };

  // Delete item
  const handleDeleteItem = (categoryId, itemId) => {
    setCategories(
      categories.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              items: category.items.filter((item) => item.id !== itemId),
            }
          : category
      )
    );
  };

  // Toggle item availability
  const toggleItemAvailability = (categoryId, itemId) => {
    setCategories(
      categories.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              items: category.items.map((item) =>
                item.id === itemId
                  ? { ...item, available: !item.available }
                  : item
              ),
            }
          : category
      )
    );
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
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
                {/* Category Row */}
                <CategoryRow
                  categoryId={category.id} // Ensure category.id is being passed
                  toggleCategory={toggleCategory}
                  handleDeleteCategory={handleDeleteCategory}
                  resetItemForm={resetItemForm}
                  setShowAddItem={setShowAddItem}
                  setEditingCategory={setEditingCategory}
                  setNewCategory={setNewCategory}
                  setShowAddCategory={setShowAddCategory}
                />

                {/* Add/Edit Item Form */}
                {showAddItem === category.id && (
                  <tr className="bg-gray-100">
                    <td colSpan={4} className="px-6 py-4">
                      <ItemForm
                        category={category}
                        newItem={newItem}
                        setNewItem={setNewItem}
                        editingItem={editingItem}
                        resetItemForm={resetItemForm}
                        handleAddItem={handleAddItem}
                      />
                    </td>
                  </tr>
                )}

                {/* Item Rows */}
                {category.isExpanded &&
                  category.items.map((item) => (
                    <ItemRow
                      key={item.id}
                      item={{
                        ...item,
                        available: item.available ?? true, // Ensure 'available' exists
                      }}
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
    </div>
  );
};

export default MenuTable;