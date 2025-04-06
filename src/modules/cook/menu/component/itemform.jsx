import React from "react";
import { Modal, Input, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
// import { useItemFormik } from "../formik/useCategory-Menu";

const ItemFormModal = ({
  category,
  newItem,
  setNewItem,
  editingItem,
  handleAddItem,
  onClose,
  visible,
  // formik,
  // isLoading
  addItemFormik
}) => {
  if (!category || !category.id) {
    return null; // Don't render anything if category is invalid
  }

  const { formik, isEditing, isLoading, error } =addItemFormik;
  
  console.log("formik**", formik.values)


  // If formik is undefined due to any error in useItemFormik
  if (!formik) {
    return null;
  }

  // Custom Upload Handler
  const handleImageUpload = (info) => {
    const file = info.file.originFileObj;
    if (file) {
      formik.setFieldValue("image", file);
      message.success("Image uploaded successfully!");
    }
  };

  return (
    <Modal
      title={isEditing ? "Update Your Dish" : "Add a New Dish"}
      open={visible}
      onCancel={onClose}
      footer={null}
      centered
      destroyOnClose
      className="rounded-lg"
    >
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {/* Dish Name */}
        <div>
          <label className="block font-medium text-gray-700">Dishs Name</label>
          <Input
            id="name"
            name="name"
            value={formik.values?.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter dish name..."
            className="mt-1"
          />
          {formik.touched?.name && formik.errors?.name && (
            <p className="text-red-500 text-sm mt-1">{formik.errors?.name}</p>
          )}
        </div>

        {/* Price */}
        <div>
          <label className="block font-medium text-gray-700">Price (Rs.)</label>
          <Input
            id="price"
            type="number"
            name="price"
            value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter price..."
            className="mt-1"
          />
          {formik.touched.price && formik.errors.price && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.price}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium text-gray-700">Description</label>
          <Input.TextArea
            id="description"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Describe your dish..."
            rows={3}
            className="mt-1"
          />
          {formik.touched.description && formik.errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.description}
            </p>
          )}
        </div>

        {/* Image Upload */}
        <div>
          <label className="block font-medium text-gray-700">Dish Photo</label>
          <Upload
            accept="image/*"
            showUploadList={false}
            customRequest={({ file, onSuccess }) => {
              setTimeout(() => {
                onSuccess("ok");
              }, 0);
            }}
            onChange={handleImageUpload}
          >
            <Button icon={<UploadOutlined />}>
              {formik.values.image ? "Change Photo" : "Upload Photo"}
            </Button>
          </Upload>

          {formik.values.image && (
            <div className="mt-4 relative">
              <img
                src={
                  typeof formik.values.image === "string"
                    ? formik.values.image
                    : URL.createObjectURL(formik.values.image)
                }
                alt="Dish Preview"
                className="w-full h-48 object-cover rounded-lg border border-gray-300"
              />
              <Button
                danger
                size="small"
                className="absolute top-2 right-2"
                onClick={(e) => {
                  e.stopPropagation();
                  formik.setFieldValue("image", null);
                }}
              >
                Remove
              </Button>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="primary"
          htmlType="submit"
          block
          className="mt-4"
          loading={isLoading}
        >
          {isEditing ? "Update Dish" : "Add Dish"}
        </Button>
      </form>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
          <p className="font-medium">Something went wrong:</p>
          <p>{error.message || "Could not save your dish. Try again."}</p>
        </div>
      )}
    </Modal>
  );
};

export default ItemFormModal;