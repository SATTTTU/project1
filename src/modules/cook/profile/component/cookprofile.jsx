"use client"

import { useState, useEffect } from "react"
import { UseProfileFormik } from "../formik/useupdatecookprofile"
import LocationMap from "@/components/ui/locationMap/locationmap"
import { UsegetCookLocation } from "../api/getCookLocation"

export const ProfileCard = ({ userData }) => {
  const { mutateAsync: fetchCookLocation } = UsegetCookLocation()
  const { formik, isLoading } = UseProfileFormik(userData)
  const [imagePreview, setImagePreview] = useState(userData?.image || "https://i.pinimg.com/236x/2a/80/ea/2a80ea63bdda2062c36f951f0c8dcc13.jpg")
  const [isEditMode, setIsEditMode] = useState(false)

  useEffect(() => {
    if (formik.values.image && !(formik.values.image instanceof File)) {
      setImagePreview(formik.values.image)
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
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
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
    setImagePreview(formik.initialValues.image)
  }
	const profilePhotoUrl = "https://khajabox-bucket.s3.ap-south-1.amazonaws.com/";

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      {/* Profile Card */}
      <div className="w-full bg-white ">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between py-6">
            {/* Profile Image and Edit Button */}
            <div className="flex items-center space-x-6 w-full md:w-auto">
              <div className="relative">
              
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white bg-white shadow-md flex items-center justify-center">
  {userData?.image_url ? (
    <img
      src={`${profilePhotoUrl}${userData.image_url}`}
      alt="profile"
      className="rounded-full lg:h-30 w-30 h-30 mb-4 object-cover"
      onError={(e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.style.display = "none";
      }}
    />
  ) : (
    <div className="bg-gray-300 text-white text-xl font-semibold w-full h-full flex items-center justify-center">
      {/* Just placeholder text */}
      <img src="https://i.pinimg.com/236x/2a/80/ea/2a80ea63bdda2062c36f951f0c8dcc13.jpg" alt="" />
    </div>
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

                {/* Mobile Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Mobile Number</label>
                  {isEditMode ? (
                    <input
                      type="text"
                      name="mobile"
                      value={formik.values.mobile}
                      onChange={formik.handleChange}
                      maxLength={10}
                      placeholder="Enter 10-digit mobile number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  ) : (
                    <p className="text-gray-800 font-medium">{userData?.phone || "Not provided"}</p>
                  )}
                  {formik.errors.mobile && formik.touched.mobile && (
                    <div className="text-red-500 text-xs mt-1">{formik.errors.mobile}</div>
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