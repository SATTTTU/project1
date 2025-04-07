import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { toast } from "react-toastify";
import { itemSchema } from "./schema/itemSchema";
import { useEffect } from "react";
import { useUpdateMenuItem } from "../api/update-menuItems";

export const useEditFormik = ({
	category,
	newItem,
	setNewItem,
	editingItem,
	setOpenModal,
}) => {
	console.log("formkit*********edit");
	const {
		mutate: updateMenuItem,
		isLoading,
		error,
		isSuccess,
	} = useUpdateMenuItem({
		onSuccess: (updatedData) => {
			toast.success("Item updated successfully");

			// Update newItem state with fresh values
			setNewItem((prev) => ({
				...prev,
				name: updatedData.data.name,
				description: updatedData.data.description,
				price: updatedData.data.price,
				image: updatedData.data.image_url, // ✅ match backend response
			}));
		},
		onError: (err) => {
			console.error("API Error:", err);
			toast.error("An error occurred while updating the item");
		},
		onSettled: () => {
			setOpenModal(false);
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
		enableReinitialize: true,
		validationSchema: toFormikValidationSchema(itemSchema),
		validate: (values) => {
			if (values.price !== undefined && values.price !== "") {
				values.price = Number(values.price);
			}
			return {};
		},
		onSubmit: async (values, { setSubmitting, resetForm }) => {
			try {
				if (!editingItem) {
					toast.error("Missing item ID for update");
					return;
				}

				const data = {
					name: values.name,
					description: values.description,
					price: Number(values.price),
					image: values.image,
					category_id: values.category_id || category?.id,
				};

				console.log("Submitting update:", data);
				updateMenuItem({ menuId: editingItem, data });

				resetForm();
				// setNewItem(null);
				// onClose()
			} catch (err) {
				console.error("Submit Error:", err);
				const errorMessage =
					err.response?.data?.error || "Error updating the item";
				toast.error(errorMessage);
			} finally {
				setSubmitting(false);
			}
		},
	});

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
