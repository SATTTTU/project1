// hooks/useCategoryFormik.js
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { toast } from "react-toastify";
import { categorySchema } from "./schema/menuschema";
import { useCreateCategory } from "../api/createCategory";

export const useCategoryFormik = ({
  editingCategory,
  categories,
  setCategories,
  setShowAddCategory,
  setEditingCategory,
}) => {
  const initialCategory = editingCategory
    ? categories.find((c) => c.id === editingCategory)
    : null;

  // Initialize the API mutation hook
  const { mutateAsync, isLoading, isError, error, isSuccess } =
    useCreateCategory({
      mutationConfig: {
        onSuccess: () => {
          console.log("Category created/updated successfully via API");
        },
      },
    });

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

            // Update local state
            setCategories(
              categories.map((category) =>
                category.id === editingCategory
                  ? {
                      ...category,
                      name: categoryName,
                      description: categoryDescription,
                    }
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
              toast.info("Category already exists");
              return;
            }

            // Create API payload for new category
            const createPayload = {
              name: categoryName,
              description: categoryDescription,
              action: "create",
            };

            // Call API to create category
            const response = await mutateAsync(createPayload);

            // Get the ID from API response if available, otherwise use local ID
            const newId = Math.max(...categories.map((c) => c.id || 0), 0) + 1;
            const categoryId = response?.data?.id || newId;

            // Add new category to local state
            setCategories([
              ...categories,
              {
                id: categoryId,
                name: categoryName,
                description: categoryDescription,
                isExpanded: true,
                items: [],
              },
            ]);
            toast.success("Category added successfully");
          }

          resetForm();
          setShowAddCategory(false);
        }
      } catch (err) {
        console.error("API Error Response:", err.response);
        const errorMessage =
          err?.response?.data?.message ||
          "An error occurred while saving the category";
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
