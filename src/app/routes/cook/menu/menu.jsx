// MenuPage.jsx
import React, { useState } from "react";
import { Plus } from "lucide-react";
import { initialCategories } from "@/modules/cook/menu/component/initialdata";
import CookNavBAr from "@/components/ui/cooknavbar/cooknavbar";
import CategoryForm from "@/modules/cook/menu/component/categoryform";
import MenuTable from "@/modules/cook/menu/component/menutable";

export const MenuPage = () => {
  const [categories, setCategories] = useState(initialCategories);
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
            <CategoryForm
              newCategory={newCategory}
              setNewCategory={setNewCategory}
              editingCategory={editingCategory}
              categories={categories}
              setCategories={setCategories}
              setShowAddCategory={setShowAddCategory}
              setEditingCategory={setEditingCategory}
            />
          )}

          {/* Categories and Items Table */}
          <MenuTable
            categories={categories}
            setCategories={setCategories}
            showAddItem={showAddItem}
            setShowAddItem={setShowAddItem}
            editingItem={editingItem}
            setEditingItem={setEditingItem}
            newItem={newItem}
            setNewItem={setNewItem}
            resetItemForm={resetItemForm}
            setEditingCategory={setEditingCategory}
            setNewCategory={setNewCategory}
            setShowAddCategory={setShowAddCategory}
          />
        </main>
      </div>
    </div>
  );
};

export default MenuPage;
