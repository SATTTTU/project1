import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { toast } from "react-toastify";
import { itemSchema } from "./schema/itemSchema";
import { useCreateCategoryItem } from "../api/create-category-item";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";


export const useItemFormik = ({
	category,
	newItem,
	setNewItem,
	editingItem,
	setOpenModal,
	// handleAddItem,
}) => {
	const queryClient= useQueryClient();
	const { createCategoryItem, isLoading, error, isSuccess } =
		useCreateCategoryItem({
			mutationConfig: {
				onSuccess: (updatedData) => {
			queryClient.invalidateQueries(["categories"]); // Replace with the actual query key you use for the category items

					toast.success(
						editingItem
							? "Item updated successfully"
							: "Item added successfully"
					);

					// ✅ Ensure newItem updates with the latest values from API response
					setNewItem((prev) => ({
						...prev,
						name: updatedData.data?.name,
						description: updatedData.data.description,
						price: updatedData.data.price,
						image: updatedData.data.image_url, // Use correct field name from API response
					}));

					// handleAddItem();
				},
				onError: (err) => {
					console.error("API Error:", err);
					toast.error("An error occurred while saving the item");
				},
				onSettled: () => {
					setOpenModal(false);
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
		enableReinitialize: true, // ✅ Ensures Formik updates when newItem changes
		validationSchema: toFormikValidationSchema(itemSchema),
		validate: (values) => {
			if (values.price !== undefined && values.price !== "") {
				values.price = Number(values.price);
			}
			return {};
		},
		onSubmit: async (values, { setSubmitting, resetForm }) => {
			try {
				const data = {
					action: editingItem ? "update" : "create",
					id: editingItem,
					name: values?.name,
					description: values.description,
					price: Number(values.price),
					image: values.image,
					category_id: values.category_id || category?.id,
				};

				console.log("Formik Values on Submit:", values);
				console.log("Original newItem:", newItem);
				console.log("Data being sent to API:", data);

				if (data.action === "update" && !data.id) {
					toast.error("ID is missing for update");
					return;
				}

				await createCategoryItem(data);
				resetForm();
				setNewItem(null); // ✅ Ensure newItem is cleared after update
			} catch (err) {
				console.error("Error occurred:", err);
				const errorMessage =
					err.response?.data?.error ||
					"An error occurred while saving the item";
				toast.error(errorMessage);
			} finally {
				setSubmitting(false);
				// setOpenModal(false);
			}
		},
	});

	// ✅ Debugging: Check if Formik reinitializes properly
	useEffect(() => {
		console.log("Formik reinitialized with:", formik.values);
	}, [formik.values]);

	return {
		formik,
		isEditing: !!editingItem,
		isLoading,
		error,
		isSuccess,
	};
};
