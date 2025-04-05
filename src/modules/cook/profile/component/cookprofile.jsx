"use client"

import { useState, useEffect } from "react"
import { UseProfileFormik } from "../formik/useupdatecookprofile"
import LocationMap from "@/components/ui/locationMap/locationmap"
import { UsegetCookLocation } from "../api/getCookLocation"

const getFullImageUrl = (imagePath) => {
  // If no image path, return placeholder
  if (!imagePath) return "/api/placeholder/80/80"

  // If already a full URL, return as is
  if (imagePath.startsWith("http")) return imagePath

  const bucketUrl =
    typeof import.meta !== "undefined" && import.meta.env
      ? import.meta.env.VITE_BUCKET_URL
      : // For Next.js projects
        typeof process !== "undefined" && process.env
        ? process.env.NEXT_PUBLIC_BUCKET_URL
        : ""

  // Log for debugging
  console.log("Bucket URL:", bucketUrl)
  console.log("Image path:", imagePath)

  // If no bucket URL found, return placeholder
  if (!bucketUrl) {
    console.error("No bucket URL found in environment variables")
    return "/api/placeholder/80/80"
  }

  // Construct final image URL
  const finalUrl = `${bucketUrl.endsWith("/") ? bucketUrl : bucketUrl + "/"}${imagePath}`
  console.log("Final image URL:", finalUrl)
  return finalUrl
}

export const ProfileCard = ({ userData }) => {
  console.log("User data received:", userData)

  const { mutateAsync: fetchCookLocation } = UsegetCookLocation()
  const { formik, isLoading } = UseProfileFormik(userData)

  // Initialize with placeholder, then update in useEffect
  const [image, setImage] = useState("")
  const [isEditMode, setIsEditMode] = useState(false)
  const [imageError, setImageError] = useState(false)

  // Set initial image preview after component mounts
  useEffect(() => {
    if (userData?.image_url) {
      const fullImageUrl = getFullImageUrl(userData.image_url)
      console.log("Setting image preview to:", fullImageUrl)
      setImage(fullImageUrl)
      setImageError(false) // Reset error state when trying a new URL
    }
  }, [userData])

  useEffect(() => {
    if (formik.values.image && !(formik.values.image instanceof File)) {
      setImage(formik.values.image)
      setImageError(false) // Reset error state when trying a new URL
    }
  }, [formik.values.image])

  const handleImageChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
        return
      }

      formik.setFieldValue("image", file)

      const reader = new FileReader()
      reader.onload = () => {
        setImage(reader.result)
        setImageError(false) // Reset error state when trying a new URL
      }
      reader.readAsDataURL(file)
    }
  }

  const handleImageError = () => {
    console.error("Image failed to load:", image)
    setImageError(true)
  }

  const handleEditToggle = () => {
    setIsEditMode(!isEditMode)
    formik.setFieldValue("isEditing", !formik.values.isEditing)
  }

  const handleSubmit = (event) => {
    console.log("handle submit ********")
    event.preventDefault()

    formik.handleSubmit(event)
    setIsEditMode(false)
  }

  const handleCancel = () => {
    setIsEditMode(false)
    formik.setFieldValue("isEditing", false)
    formik.resetForm()
    setImage(formik.initialValues.image)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      {/* Profile Card */}
      <div className="w-full bg-white ">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between py-6">
            {/* Profile Image and Edit Button */}
            <div className="flex items-center space-x-6 w-full md:w-auto">
              <div className="relative">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white bg-white shadow-md">
                  {/* Displaying image */}
                  {imageError ? (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                  ) : (
                    <img
                      src={image || "/placeholder.svg"}
                      alt="Profile"
                      className="w-full h-full object-cover"
                      onError={handleImageError}
                    />
                  )}
                </div>
                {isEditMode && (
                  <label
                    htmlFor="profile-pic"
                    className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md cursor-pointer hover:bg-gray-100"
                  >
                    <input
                      type="file"
                      id="profile-pic"
                      className="hidden"
                      accept="image/png,image/jpeg,image/jpg"
                      onChange={handleImageChange}
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-700"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </label>
                )}
              </div>

              {/* Name and Edit Button for Mobile */}
              <div className="flex-grow flex items-center justify-between md:hidden">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">{formik.values.name}</h2>
                  <p className="text-gray-600">{formik.values.email}</p>
                </div>
                {!isEditMode && (
                  <button
                    onClick={handleEditToggle}
                    className="bg-white text-gray-800 px-4 py-2 rounded-full font-medium shadow-md hover:bg-gray-100 transition-colors"
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>

            {/* Profile Details */}
            <form onSubmit={handleSubmit} className="w-full md:w-auto flex-grow md:ml-6 mt-4 md:mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
                  {isEditMode ? (
                    <input
                      type="text"
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  ) : (
                    <p className="text-gray-800 font-medium hidden md:block">{formik.values.name}</p>
                  )}
                  {formik.errors.name && formik.touched.name && (
                    <div className="text-red-500 text-xs mt-1">{formik.errors.name}</div>
                  )}
                </div>

                

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                  {isEditMode ? (
                    <input
                      type="email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  ) : (
                    <p className="text-gray-800 font-medium">{formik.values.email}</p>
                  )}
                </div>

                {/* Action Buttons - Visible only in Edit Mode */}
                {isEditMode && (
                  <div className="col-span-1 md:col-span-2 flex space-x-4 pt-4">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="flex-1 py-2 px-4 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                      disabled={isLoading}
                    >
                      {isLoading ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                )}
              </div>

              {formik.errors.submit && (
                <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">{formik.errors.submit}</div>
              )}
            </form>

            {/* Edit Button for Desktop */}
            {!isEditMode && (
              <button
                onClick={handleEditToggle}
                className="hidden md:block bg-white text-gray-800 px-4 py-2 rounded-full font-medium shadow-md hover:bg-gray-100 transition-colors"
              >
                Edit Profile
              </button>
            )}
          </div>

          {/* Location Map */}
          <div className="w-full mt-4 pb-6">
            <label className="block text-sm font-medium text-gray-600 mb-2">Your Location</label>
            <LocationMap fetchLocationFn={fetchCookLocation} title="cook location" />
          </div>
        </div>
      </div>
    </div>
  )
}

