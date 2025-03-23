// MenuPage.jsx
import React, { useState } from "react";
import { Plus } from "lucide-react";
import CookNavBAr from "@/components/ui/cooknavbar/cooknavbar";
import CategoryForm from "@/modules/cook/menu/component/categoryform";
import MenuTable from "@/modules/cook/menu/component/menutable";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const MenuPage = () => {
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [newCategory, setNewCategory] = useState("");
  const [categories, setCategories] = useState([]);  // ✅ Add categories state

  return (
    <QueryClientProvider client={queryClient}>
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
                categories={categories}           // ✅ Pass categories as prop
                setCategories={setCategories}     // ✅ Pass setCategories as prop
                newCategory={newCategory}
                setNewCategory={setNewCategory}
                editingCategory={editingCategory}
                setShowAddCategory={setShowAddCategory}
                setEditingCategory={setEditingCategory}
              />
            )}

            {/* Categories and Items Table */}
            <MenuTable
              categories={categories}            // ✅ Pass categories to MenuTable
              setCategories={setCategories}      // ✅ Pass setCategories to MenuTable
              setEditingCategory={setEditingCategory}
              setNewCategory={setNewCategory}
              setShowAddCategory={setShowAddCategory}
            />
          </main>
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default MenuPage;
