import { useFormik } from "formik"
import { toFormikValidationSchema } from "zod-formik-adapter"
import { z } from "zod"
import { toast } from "react-toastify"
import { api } from "@/lib/api-client"
import { useMutation } from "@tanstack/react-query"

// Password change schema
const passwordChangeSchema = z
  .object({
    currentPassword: z.string().min(6, "Current password is required"),
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

// API function to change password
const changePassword = async (passwordData) => {

  const response = await api.post("/api/cooks/change-password", passwordData, 
   
  )
  return response.data
}

export const usePasswordForm = (initialValues = {}) => {
  const mutation = useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      toast.success("Password changed successfully")
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to change password")
    },
  })

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      ...initialValues,
    },
    validationSchema: toFormikValidationSchema(passwordChangeSchema),
    onSubmit: async (values, helpers) => {
      try {
        await mutation.mutateAsync({
          current_password: values.currentPassword,
          new_password: values.newPassword,
        })

        // Reset form after successful submission
        helpers.resetForm()
      } catch (err) {
        console.error("Password change error:", err)
        helpers.setErrors({
          submit: err?.response?.data?.message || "An error occurred",
        })
      }
    },
  })

  return {
    formik,
    isSubmitting: mutation.isLoading,
  }
}

