import React, { useState, useRef } from "react";
import {
  Menu,
  User,
  Plus,
  Edit,
  Trash,
  ChevronDown,
  ChevronUp,
  X,
  Utensils,
  Upload,
} from "lucide-react";
import { Sidebar } from "../../../../components/ui/sideBar/sidebar";
import foodimage from "../../../../assets/butterchicken.png";
import CookNavBAr from "@/components/ui/cooknavbar/cooknavbar";

export const MenuPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Momo",
      isExpanded: true,
      items: [
        {
          id: 101,
          name: "Chicken Momo",
          price: 150,
          description: "Steamed dumplings filled with spiced chicken",
          image: foodimage,
          available: true,
        },
        {
          id: 102,
          name: "Paneer Momo",
          price: 140,
          description: "Steamed dumplings with cottage cheese filling",
          image: foodimage,
          available: true,
        },
      ],
    },
    {
      id: 2,
      name: "Chowmein",
      isExpanded: false,
      items: [
        {
          id: 201,
          name: "Veg Chowmein",
          price: 120,
          description: "Stir-fried noodles with mixed vegetables",
          image: foodimage,
          available: true,
        },
      ],
    },
  ]);

  const [showAddCategory, setShowAddCategory] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [newCategory, setNewCategory] = useState("");
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

  const fileInputRef = useRef(null);

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewItem({
        ...newItem,
        image: file,
        imagePreview: imageUrl,
      });
    }
  };

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
                      image: newItem.imagePreview || foodimage,
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

  // Delete category
  const handleDeleteCategory = (categoryId) => {
    setCategories(categories.filter((category) => category.id !== categoryId));
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
    <div className="flex h-screen flex-col">
      <CookNavBAr />
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 overflow-auto p-4 md:p-6 bg-gray-50">
          <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold">Menu Management</h1>
              <p className="text-sm text-gray-500">
                Organize your dishes by categories
              </p>
            </div>
            <button
              className="mt-4 md:mt-0 flex items-center rounded-md bg-[#426B1F] px-4 py-2 text-white hover:bg-[#365818]"
              onClick={() => {
                setShowAddCategory(true);
                setEditingCategory(null);
                setNewCategory("");
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add New Category
            </button>
          </div>

          {/* Add/Edit Category Form */}
          {showAddCategory && (
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
          )}

          {/* Categories and Items Table */}
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
                {categories.map((category) => (
                  <React.Fragment key={category.id}>
                    {/* Category Row */}
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

                    {/* Add/Edit Item Form */}
                    {showAddItem === category.id && (
                      <tr className="bg-gray-100">
                        <td colSpan={4} className="px-6 py-4">
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <h4 className="font-medium">
                                {editingItem
                                  ? `Edit Item in ${category.name}`
                                  : `Add New Item to ${category.name}`}
                              </h4>
                              <button
                                onClick={resetItemForm}
                                className="text-gray-500 hover:text-gray-700"
                              >
                                <X size={18} />
                              </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <input
                                type="text"
                                value={newItem.name}
                                onChange={(e) =>
                                  setNewItem({
                                    ...newItem,
                                    name: e.target.value,
                                  })
                                }
                                placeholder="Item Name"
                                className="p-2 border rounded"
                              />
                              <input
                                type="number"
                                value={newItem.price}
                                onChange={(e) =>
                                  setNewItem({
                                    ...newItem,
                                    price: e.target.value,
                                  })
                                }
                                placeholder="Price"
                                className="p-2 border rounded"
                              />
                              <textarea
                                value={newItem.description}
                                onChange={(e) =>
                                  setNewItem({
                                    ...newItem,
                                    description: e.target.value,
                                  })
                                }
                                placeholder="Description"
                                className="p-2 border rounded md:col-span-2"
                                rows={2}
                              />

                              {/* Image Upload Section */}
                              <div className="md:col-span-2">
                                <div className="flex items-center gap-4">
                                  <div className="flex-shrink-0">
                                    {newItem.imagePreview ? (
                                      <img
                                        src={newItem.imagePreview}
                                        alt="Preview"
                                        className="h-20 w-20 object-cover rounded-md border"
                                      />
                                    ) : (
                                      <div className="h-20 w-20 bg-gray-200 rounded-md border flex items-center justify-center">
                                        <Utensils
                                          className="text-gray-400"
                                          size={24}
                                        />
                                      </div>
                                    )}
                                  </div>
                                  <div className="flex-1">
                                    <input
                                      type="file"
                                      ref={fileInputRef}
                                      onChange={handleImageUpload}
                                      accept="image/*"
                                      className="hidden"
                                    />
                                    <button
                                      onClick={() =>
                                        fileInputRef.current.click()
                                      }
                                      className="flex items-center gap-2 p-2 border rounded text-gray-700 hover:bg-gray-50"
                                    >
                                      <Upload size={16} />
                                      {newItem.imagePreview
                                        ? "Change Image"
                                        : "Upload Image"}
                                    </button>
                                    <p className="text-xs text-gray-500 mt-1">
                                      Recommended: Square image, 500x500px or
                                      larger
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center">
                                <input
                                  type="checkbox"
                                  id="available"
                                  checked={newItem.available}
                                  onChange={(e) =>
                                    setNewItem({
                                      ...newItem,
                                      available: e.target.checked,
                                    })
                                  }
                                  className="mr-2"
                                />
                                <label htmlFor="available">Available</label>
                              </div>
                            </div>
                            <div className="flex justify-end">
                              <button
                                onClick={() => handleAddItem(category.id)}
                                className="bg-[#426B1F] text-white px-4 py-2 rounded hover:bg-[#365818]"
                              >
                                {editingItem ? "Update Item" : "Add Item"}
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}

                    {/* Item Rows */}
                    {category.isExpanded &&
                      category.items.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 pl-12">
                            <div className="flex items-center">
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                className="h-10 w-10 rounded-full object-cover mr-3"
                              />
                              <div>
                                <div className="font-medium">{item.name}</div>
                                <div className="text-sm text-gray-500 line-clamp-1">
                                  {item.description}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="font-medium">₹{item.price}</span>
                          </td>
                          <td className="px-6 py-4">
                            <div
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                item.available
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                              onClick={() =>
                                toggleItemAvailability(category.id, item.id)
                              }
                              style={{ cursor: "pointer" }}
                            >
                              <span
                                className={`mr-1 h-2 w-2 rounded-full ${
                                  item.available ? "bg-green-500" : "bg-red-500"
                                }`}
                              ></span>
                              {item.available ? "Available" : "Unavailable"}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right space-x-2">
                            <button
                              onClick={() => handleEditItem(category.id, item)}
                              className="text-blue-500 hover:text-blue-700"
                            >
                              <Edit size={18} />
                            </button>
                            <button
                              onClick={() =>
                                handleDeleteItem(category.id, item.id)
                              }
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </React.Fragment>
                ))}

                {/* Empty State */}
                {categories.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-10 text-center text-gray-500"
                    >
                      <div className="flex flex-col items-center">
                        <Utensils className="h-10 w-10 mb-2 text-gray-400" />
                        <p>No menu categories yet</p>
                        <p className="text-sm">
                          Click "Add New Category" to get started
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};
