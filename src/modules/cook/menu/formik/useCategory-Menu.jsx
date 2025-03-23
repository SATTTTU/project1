import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { toast } from "react-toastify";
import { itemSchema } from "./schema/itemSchema";
import { useCreateCategoryItem } from "../api/create-category-item";

export const useItemFormik = ({
  category,
  newItem,
  setNewItem,
  editingItem,
  handleAddItem,
}) => {
  if (!category || !category.id) {
    console.error("Invalid category provided:", category);
    toast.error("Category is missing or invalid");
    return;
  }

  const { createCategoryItem, isLoading, error, isSuccess } = useCreateCategoryItem({
    mutationConfig: {
      onSuccess: () => {
        toast.success(editingItem ? "Item updated successfully" : "Item added successfully");
        handleAddItem();
      },
      onError: (err) => {
        console.error("API Error:", err);
        toast.error("An error occurred while saving the item");
      },
    },
  });

  const formik = useFormik({
    initialValues: {
      name: newItem?.name || "",
      price: newItem?.price || "",
      description: newItem?.description || "",
      image: newItem?.image || null,
      category_id: category?.id || null,
    },
    validationSchema: toFormikValidationSchema(itemSchema),
    validate: (values) => {
      const errors = {};
      if (values.price !== undefined && values.price !== "") {
        values.price = Number(values.price);
      }
      return errors;
    },
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const data = {
          action: editingItem ? "update" : "create",
          id: editingItem, // Simply use editingItem directly as the ID
          name: values.name,
          description: values.description,
          price: Number(values.price),
          image: values.image,
          category_id: values.category_id || category?.id,
        };
    
        console.log("Data being sent to API:", data);
    
        // Ensure that the correct action is being sent
        if (data.action === "update" && !data.id) {
          toast.error("ID is missing for update");
          return;
        }
    
        await createCategoryItem(data);
        resetForm();
      } catch (err) {
        console.error("Error occurred:", err);
        const errorMessage = err.response?.data?.error || "An error occurred while saving the item";
        toast.error(errorMessage);
      } finally {
        setSubmitting(false);
      }
    },
    
  });

  return {
    formik,
    isEditing: !!editingItem,
    isLoading,
    error,
    isSuccess,
  };
};