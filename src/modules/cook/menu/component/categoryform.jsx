// components/CategoryForm.jsx
import React from "react";
import { X } from "lucide-react";
import { useCategoryFormik } from "../formik/useCategory";

const CategoryForm = ({
  categories,
  setCategories,
  setShowAddCategory,
  editingCategory,
  setEditingCategory,
}) => {
  const { formik, isEditing, isLoading } = useCategoryFormik({
    editingCategory,
    categories,
    setCategories,
    setShowAddCategory,
    setEditingCategory,
  });

  return (
    <div className="mb-6 p-4 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">
          {isEditing ? "Edit Category" : "Add New Category"}
        </h3>
        <button
          type="button"
          onClick={() => setShowAddCategory(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          <X size={18} />
        </button>
      </div>
      
      <form onSubmit={formik.handleSubmit} className="flex-col flex gap-2">
        <div>
          <input
            type="text"
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Category Name"
            className={`flex-1 p-2 border rounded w-full ${
              formik.touched.name && formik.errors.name 
                ? "border-red-500" 
                : ""
            }`}
            disabled={isLoading}
          />
          {formik.touched.name && formik.errors.name && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
          )}
        </div>
        
        <button
          type="submit"
          disabled={formik.isSubmitting || isLoading}
          className="bg-[#426B1F] w-fit flex justify-end items-end text-white px-4 py-2 rounded hover:bg-[#365818] disabled:bg-gray-400"
        >
          {isLoading ? "Processing..." : isEditing ? "Update" : "Add"}
          {isLoading && (
            <span className="ml-2 inline-block animate-spin">⌛</span>
          )}
        </button>
      </form>
    </div>
  );
};

export default CategoryForm;