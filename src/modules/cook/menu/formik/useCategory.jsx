// hooks/useCategoryFormik.js
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { toast } from "react-toastify";
import { categorySchema } from "./schema/menuschema";
import { UseCreateCategory } from "../api/createCategory";

export const useCategoryFormik = ({
  editingCategory,
  categories,
  setCategories,
  setShowAddCategory,
  setEditingCategory
}) => {
  const initialCategory = editingCategory
    ? categories.find((c) => c.id === editingCategory)?.name || ""
    : "";

  // Initialize the API mutation hook
  const { mutateAsync, isLoading, isError, error, isSuccess } = UseCreateCategory({
    mutationConfig: {
      onSuccess: () => {
        // You can add additional success handling if needed
        console.log("Category created/updated successfully via API");
      },
    },
  });

  const formik = useFormik({
    initialValues: {
      name: initialCategory
    },
    validationSchema: toFormikValidationSchema(categorySchema),
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        const categoryName = values.name.trim();
        
        if (categoryName) {
          if (editingCategory) {
            // Create API payload for updating
            const updatePayload = {
              id: editingCategory,
              name: categoryName,
              action: "update"
            };
            
            // Call API to update category
            await mutateAsync(updatePayload);
            
            // Update local state
            setCategories(
              categories.map((category) =>
                category.id === editingCategory
                  ? { ...category, name: categoryName }
                  : category
              )
            );
            setEditingCategory(null);
            toast.success("Category updated successfully");
          } else {
            // Check if category already exists locally
            const existingCategory = categories.find(
              (c) => c.name.toLowerCase() === categoryName.toLowerCase()
            );
            
            if (existingCategory) {
              // If exists, just focus on it
              setCategories(
                categories.map((c) =>
                  c.id === existingCategory.id
                    ? { ...c, isExpanded: true }
                    : c
                )
              );
              toast.info("Category already exists");
            } else {
              // Create API payload for new category
              const newId = Math.max(...categories.map((c) => c.id), 0) + 1;
              const createPayload = {
                name: categoryName,
                action: "create"
              };
              
              // Call API to create category
              const response = await mutateAsync(createPayload);
              
              // Get the ID from API response if available, otherwise use local ID
              const categoryId = response?.data?.id || newId;
              
              // Add new category to local state
              setCategories([
                ...categories,
                {
                  id: categoryId,
                  name: categoryName,
                  isExpanded: true,
                  items: [],
                },
              ]);
              toast.success("Category added successfully");
            }
          }
          
          resetForm();
          setShowAddCategory(false);
        }
      } catch (err) {
        const errorMessage = err?.response?.data?.message || "An error occurred";
        toast.error(errorMessage);
        console.error("Category operation failed:", err);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return {
    formik,
    isEditing: !!editingCategory,
    isLoading,
    isError,
    error,
    isSuccess
  };
};