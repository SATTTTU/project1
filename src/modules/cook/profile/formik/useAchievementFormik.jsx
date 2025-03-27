import { useFormik } from "formik"
import { toFormikValidationSchema } from "zod-formik-adapter"
import { z } from "zod"
import { toast } from "react-toastify"
import { api } from "@/lib/api-client"
import { useMutation, useQueryClient } from "@tanstack/react-query"

// Achievements schema
const achievementsSchema = z.object({
  skills: z.array(z.string()).default([]),
  yearsOfExperience: z.number().min(0, "Years of experience cannot be negative").default(0),
  qualifications: z
    .array(
      z.object({
        title: z.string().min(1, "Title is required"),
        institution: z.string().min(1, "Institution is required"),
        year: z.number().min(1900, "Invalid year").max(new Date().getFullYear(), "Year cannot be in the future"),
      }),
    )
    .default([]),
})

// API function to update achievements
const updateAchievements = async (achievementsData) => {
  const token = localStorage.getItem("Cook_token")

  if (!token) {
    throw new Error("Cook not authenticated")
  }

  const response = await api.post("/api/cooks/update-achievements", achievementsData, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response.data
}

export const useAchievementsForm = (initialValues = {}) => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: updateAchievements,
    onSuccess: () => {
      toast.success("Achievements updated successfully")
      // Invalidate and refetch the profile data
      queryClient.invalidateQueries(["CookProfile"])
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to update achievements")
    },
  })

  const formik = useFormik({
    initialValues: {
      skills: [],
      yearsOfExperience: 0,
      qualifications: [],
      ...initialValues,
    },
    validationSchema: toFormikValidationSchema(achievementsSchema),
    onSubmit: async (values, helpers) => {
      try {
        await mutation.mutateAsync(values)
      } catch (err) {
        console.error("Update achievements error:", err)
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

