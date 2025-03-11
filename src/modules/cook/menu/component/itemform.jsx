// components/ItemForm.jsx
import React, { useRef } from "react";
import { X, Utensils, Upload } from "lucide-react";

const ItemForm = ({
  category,
  newItem,
  setNewItem,
  editingItem,
  resetItemForm,
  handleAddItem,
}) => {
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

  return (
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
                  <Utensils className="text-gray-400" size={24} />
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
                onClick={() => fileInputRef.current.click()}
                className="flex items-center gap-2 p-2 border rounded text-gray-700 hover:bg-gray-50"
              >
                <Upload size={16} />
                {newItem.imagePreview ? "Change Image" : "Upload Image"}
              </button>
              <p className="text-xs text-gray-500 mt-1">
                Recommended: Square image, 500x500px or larger
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
  );
};

export default ItemForm;
