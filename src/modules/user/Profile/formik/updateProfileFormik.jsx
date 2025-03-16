import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useProfile } from "../api/getProfile";
import { useUpdateProfile } from "../api/updateProfile";
import { profileSchema } from "./schema/updateSchema";
// import { useGetProfile } from "@/api/getProfile"; // 🔹 Fetch user profile

export const useProfileFormik = () => {
  const { data: user } = useProfile(); // Fetch user profile
  const { mutateAsync: updateProfile} = useUpdateProfile(); // Mutation for updating profile

  return useFormik({
    initialValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      image_url: user?.image_url || "",
    },
    enableReinitialize: true, // Ensures form updates when API data loads
    validationSchema: toFormikValidationSchema(profileSchema),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        console.log("Updating Profile:", values);
        await updateProfile(values); // 🔹 Correct API call
        alert("Profile updated successfully!");
      } catch (error) {
        console.error("Update error:", error);
        alert("Failed to update profile.");
      } finally {
        setSubmitting(false);
      }
    },
  });
};
