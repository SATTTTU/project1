import React from "react";
import { useItemFormik } from "../formik/useCategory-Menu";
const ItemForm = ({
  category,
  newItem,
  setNewItem,
  editingItem,
  handleAddItem,
}) => {
  const { formik, isEditing, isLoading, error } = useItemFormik({
    category,
    newItem,
    setNewItem,
    editingItem,
    handleAddItem,
  });

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
      <h3 className="text-xl font-bold text-center mb-6 text-[#426B1F]">
        {isEditing ? "Update Your Dish" : "Add a New Dish"}
      </h3>

      <form onSubmit={formik.handleSubmit} className="space-y-5">
        {/* Dish Name */}
        <div>
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
            Dish Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="What's your dish called? (e.g. Chicken Soup)"
            className="p-3 border-2 border-gray-300 rounded-lg w-full focus:border-[#426B1F] focus:outline-none"
          />
          {formik.touched.name && formik.errors.name && (
            <div className="mt-1 text-red-500 text-sm bg-red-50 p-2 rounded">
              <span role="img" aria-label="warning">⚠️</span> {formik.errors.name}
            </div>
          )}
        </div>

        {/* Price */}
        <div>
          <label htmlFor="price" className="block text-gray-700 font-medium mb-2">
            Price
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">$</span>
            </div>
            <input
              id="price"
              type="number"
              name="price"
              value={formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="How much does it cost? (e.g. 12.99)"
              className="p-3 pl-8 border-2 border-gray-300 rounded-lg w-full focus:border-[#426B1F] focus:outline-none"
              step="0.01"
              min="0"
            />
          </div>
          {formik.touched.price && formik.errors.price && (
            <div className="mt-1 text-red-500 text-sm bg-red-50 p-2 rounded">
              <span role="img" aria-label="warning">⚠️</span> {formik.errors.price}
            </div>
          )}
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Tell customers about your dish (ingredients, taste, etc.)"
            className="p-3 border-2 border-gray-300 rounded-lg w-full focus:border-[#426B1F] focus:outline-none"
            rows={3}
          />
          {formik.touched.description && formik.errors.description && (
            <div className="mt-1 text-red-500 text-sm bg-red-50 p-2 rounded">
              <span role="img" aria-label="warning">⚠️</span> {formik.errors.description}
            </div>
          )}
        </div>

        {/* Image Upload Section */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Dish Photo</label>
          <div className="flex flex-col items-center">
            {/* Image preview */}
            {formik.values.image ? (
              <div className="mb-4 w-full">
                <div className="relative rounded-lg overflow-hidden border-2 border-gray-300 w-full h-48">
                  <img
                    src={
                      typeof formik.values.image === "string"
                        ? formik.values.image
                        : formik.values.image instanceof File
                        ? URL.createObjectURL(formik.values.image)
                        : ""
                    }
                    alt="Food preview"
                    className="h-full w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => formik.setFieldValue("image", null)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 shadow-md hover:bg-red-600"
                    aria-label="Remove image"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ) : (
              <div className="mb-4 w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p className="mt-2 text-sm text-gray-500">Add a photo of your dish</p>
              </div>
            )}

            {/* File input */}
            <input
              type="file"
              id="image"
              name="image"
              accept="image/jpeg,image/png"
              onChange={(event) => {
                const file = event.currentTarget.files?.[0];
                formik.setFieldValue("image", file);
                formik.setFieldTouched("image", true, true); // Ensure touched state and validation
              }}
              onBlur={formik.handleBlur}
              className="hidden"
            />
            <label
              htmlFor="image"
              className="w-full cursor-pointer bg-gray-100 text-gray-700 font-medium px-4 py-3 rounded-lg hover:bg-gray-200 border border-gray-300 flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                  clipRule="evenodd"
                />
              </svg>
              {formik.values.image ? "Change Photo" : "Take a Photo"}
            </label>
          </div>

          {formik.touched.image && formik.errors.image && (
            <div className="mt-1 text-red-500 text-sm bg-red-50 p-2 rounded">
              <span role="img" aria-label="warning">⚠️</span> {formik.errors.image}
            </div>
          )}
        </div>

        {/* Save Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-[#426B1F] text-white py-3 px-6 rounded-lg font-medium text-lg hover:bg-[#365818] transition-colors shadow-md flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Working...
              </>
            ) : (
              <>{isEditing ? "Update Dish" : "Add Dish to Menu"}</>
            )}
          </button>
        </div>
      </form>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
          <p className="font-medium">Something went wrong:</p>
          <p>{error.message || "Could not save your dish. Please try again."}</p>
        </div>
      )}
    </div>
  );
};

export default ItemForm;