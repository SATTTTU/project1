import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { toast } from "react-toastify";
import { categorySchema } from "./schema/menuschema";
import { useCreateCategory } from "../api/createCategory";
import { useNavigate } from "react-router-dom";

export const useCategoryFormik = ({
  editingCategory,
  categories = [],
  setCategories,
  setShowAddCategory,
  setEditingCategory,
}) => {
  const initialCategory = editingCategory
    ? categories.find((c) => c.id === editingCategory)
    : null;

  const { mutateAsync, isLoading, isError, error, isSuccess } = useCreateCategory({
    mutationConfig: {
      onSuccess: (response) => {
        console.log("Category created/updated successfully via API", response);
      },
      onError: (error) => {
        console.error("API Error:", error);
        const errorMessage =
          error.response?.data?.message || error.message || "An error occurred while saving the category";
        toast.error(errorMessage);
      },
    },
  });

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: initialCategory?.name || "",
      description: initialCategory?.description || "",
    },
    validationSchema: toFormikValidationSchema(categorySchema),
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        const categoryName = values.name.trim();
        const categoryDescription = values.description.trim();

        if (categoryName && categoryDescription) {
          if (editingCategory) {
            // Create API payload for updating
            const updatePayload = {
              id: editingCategory,
              name: categoryName,
              description: categoryDescription,
              action: "update",
            };

            // Call API to update category
            await mutateAsync(updatePayload);

            // Optimistically update local state
            setCategories(
              categories.map((category) =>
                category.id === editingCategory
                  ? { ...category, name: categoryName, description: categoryDescription }
                  : category
              )
            );

            setEditingCategory(null);
            toast.success("Category updated successfully");
            navigate("/cook/menu");
          } else {
            // Check if category already exists locally
            const existingCategory = categories.find(
              (c) => c.name.toLowerCase() === categoryName.toLowerCase()
            );

            if (existingCategory) {
              toast.info("Category already exists");
              return;
            }

            // Create API payload for new category
            const createPayload = {
              name: categoryName,
              description: categoryDescription,
              action: "create",
            };

            // Optimistically update the categories list before the API response
            const newCategory = {
              id: Math.max(...categories.map((c) => c.id || 0), 0) + 1, // Fallback for local ID
              name: categoryName,
              description: categoryDescription,
              isExpanded: true,
              items: [],
            };

            setCategories([...categories, newCategory]);

            // Call API to create category
            const response = await mutateAsync(createPayload);

            // Update with the ID from the API response if available
            const updatedCategory = {
              ...newCategory,
              id: response?.data?.id || newCategory.id,
            };

            // Update local state with the final category after API success
            setCategories(
              categories.map((category) =>
                category.id === newCategory.id ? updatedCategory : category
              )
            );

            toast.success("Category added successfully");
            navigate("/cook/menu");
          }

          resetForm();
          setShowAddCategory(false);
        }
      } catch (err) {
        console.error("Submission Error:", err);
        const errorMessage =
          err?.response?.data?.message || err.message || "An error occurred while saving the category";
        toast.error(errorMessage);
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
    isSuccess,
  };
};
