import { useState, useRef } from "react";
import foodimage from "../../../../assets/butterchicken.png";

export const useMenuManagement = () => {
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

  return {
    categories,
    showAddCategory,
    editingCategory,
    newCategory,
    showAddItem,
    editingItem,
    newItem,
    fileInputRef,
    setCategories,
    setShowAddCategory,
    setEditingCategory,
    setNewCategory,
    setShowAddItem,
    setEditingItem,
    setNewItem,
    handleImageUpload,
    toggleCategory,
    handleAddCategory,
    resetItemForm,
    handleAddItem,
    handleEditItem,
    handleDeleteCategory,
    handleDeleteItem,
    toggleItemAvailability,
  };
};
