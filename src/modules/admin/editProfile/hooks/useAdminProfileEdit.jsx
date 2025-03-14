// useAdminProfileEditFormik.js
import { useFormik } from "formik";
import { useAdminProfileEdit } from "../api/editprofile";
import { profileEditSchema } from "../schema/editprofile";



export const useAdminProfileEditFormik = () => {
  const { mutateAsync, isLoading, isError, error, isSuccess } = useAdminProfileEdit();
  
  const formik = useFormik({
    initialValues: {
      name: "John Doe",
      email: "johndoe@example.com",
      mobile: "",
      image: "/api/placeholder/200/200",
      isEditing: false,
    },
    validationSchema: profileEditSchema, // Or your existing schema
    onSubmit: async (values) => {
      try {
        await mutateAsync(values);
        formik.setFieldValue("isEditing", false);
      } catch (err) {
        console.error("Error submitting form:", err);
      }
    },
  });
  
  return {
    formik,
    isLoading,
    isError,
    error,
    isSuccess,
  };
};