import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { profileEditSchema } from "../schema/editprofile";
import { useAdminProfile } from "../api/getprofile"; // Adjust the import path
import { useAdminProfileEdit } from "../api/editprofile";

export const useAdminProfileEditFormik = () => {
  const { mutateAsync: editProfile, isLoading: isEditing } = useAdminProfileEdit();
  const { mutateAsync: fetchProfile, isLoading: isFetching } = useAdminProfile();
  const [initialValues, setInitialValues] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profileData = await fetchProfile(); // Get data from API
        setInitialValues({
          name: profileData?.name || "John Doe",
          email: profileData?.email || "johndoe@example.com",
          mobile: profileData?.mobile || "",
          image: profileData?.image || "/api/placeholder/200/200",
          isEditing: false,
        });
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };

    loadProfile();
  }, [fetchProfile]);

  const formik = useFormik({
    initialValues: initialValues || {
      name: "John Doe",
      email: "johndoe@example.com",
      mobile: "",
      image: "/api/placeholder/200/200",
      isEditing: false,
    },
    enableReinitialize: true, // Update form when initialValues change
    validationSchema: toFormikValidationSchema(profileEditSchema),
    onSubmit: async (values, helpers) => {
      try {
        await editProfile(values);
      } catch (err) {
        helpers.setErrors({ submit: err?.response?.data?.message || "An error occurred" });
      }
    },
  });

  return { formik, isLoading: isFetching || isEditing };
};
