"use client"

import { useEffect, useState } from "react"
import { useFormik } from "formik"
import { toFormikValidationSchema } from "zod-formik-adapter"
import { cookprofileEditSchema } from "./schema/cookprofileupdateschema"
import { toast } from "react-toastify"
import { UpdateProfile } from "../api/updatecookprofile"
import { useProfile } from "../api/getcookprofile"

export const UseProfileFormik = () => {
  const { mutateAsync: editProfile, isLoading: isEditing } = UpdateProfile()
  const { data: profileData, isLoading: isFetching, error: profileError } = useProfile()
  const [initialValues, setInitialValues] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    mobile: "",
    image: "/api/placeholder/200/200",
    isEditing: false,
  })

  // Function to get the full image URL
  const getFullImageUrl = (imagePath) => {
    if (!imagePath) return "/api/placeholder/200/200"

    // If it's already a full URL (starts with http/https)
    if (imagePath.startsWith("http")) return imagePath

    // Use your existing API_URL
    const storageUrl = import.meta.env.VITE_BUCKET_URL.endsWith("/")
      ? `${import.meta.env.VITE_BUCKET_URL}/`
      : `${import.meta.env.VITE_BUCKET_URL}/`
    return `${storageUrl}${imagePath}`
  }

  useEffect(() => {
    if (profileData) {
      setInitialValues({
        name: profileData?.name || "John Doe",
        email: profileData?.email || "johndoe@example.com",
        mobile: profileData?.mobile || "",
        image: profileData?.image_url ? getFullImageUrl(profileData.image_url) : "/api/placeholder/200/200",
        isEditing: false,
      })
    }
  }, [profileData])

  useEffect(() => {
    if (profileError) {
      console.error("Profile error:", profileError)
      toast.error("Failed to load profile data")
    }
  }, [profileError])

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: toFormikValidationSchema(cookprofileEditSchema),
    onSubmit: async (values, helpers) => {
      try {
        // Create FormData for file upload
        const formData = new FormData()

        // Add text fields
        formData.append("name", values.name)
        formData.append("mobile", values.mobile)

        // Only append the image if it's a File object
        if (values.image instanceof File) {
          formData.append("image", values.image)
          console.log("Uploading file:", values.image.name, values.image.type)
        }

        // Submit the form
        await editProfile(formData)
        toast.success("Successfully updated profile")
      } catch (err) {
        console.error("Update error:", err?.response?.data || err)
        helpers.setErrors({
          submit: err?.response?.data?.message || "An error occurred",
        })
        toast.error("Something went wrong")
      }
    },
  })

  return {
    formik,
    isLoading: isFetching || isEditing,
    error: profileError,
  }
}

