import React, { useState, useEffect } from "react";
import { useAdminProfileEditFormik } from "../hooks/useAdminProfileEdit";

export const MyProfile = () => {
  const { formik, isLoading, isError, error, isSuccess } = useAdminProfileEditFormik();
  
  // Initialize with a safe default value
  const [image, setImage] = useState("/api/placeholder/200/200");
  
  // Update image when formik values change
  useEffect(() => {
    if (formik?.values?.image) {
      setImage(formik.values.image);
    }
  }, [formik?.values?.image]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        setImage(result);
        formik.setFieldValue("image", result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Helper function to format mobile number as user types
  const handleMobileChange = (e) => {
    // Strip non-digit characters
    const value = e.target.value.replace(/\D/g, '');
    formik.setFieldValue("mobile", value);
  };

  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden">
      {/* Top Section with Background and Profile Photo */}
      <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        {/* Edit Profile Button */}
        {!formik.isSubmitting && !formik.values.isEditing && (
          <button
            type="button"
            onClick={() => formik.setFieldValue("isEditing", true)}
            className="absolute top-4 right-4 bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-full shadow-md transition-all duration-300 flex items-center space-x-2 z-10"
          >
            <span className="font-medium text-sm">Edit Profile</span>
          </button>
        )}
      </div>

      {/* Profile Picture */}
      <div className="relative -mt-16 px-6 flex justify-center">
        <div className="relative">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white bg-white shadow-lg">
            <img src={image} alt="Profile" className="w-full h-full object-cover" />
          </div>
          {formik.values.isEditing && (
            <label htmlFor="profile-pic" className="absolute bottom-1 right-1 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow cursor-pointer transition-all duration-200 transform hover:scale-105">
              <input
                type="file"
                id="profile-pic"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
          )}
        </div>
      </div>

      {/* User Name and Email */}
      <div className="text-center pt-2 pb-4">
        <h3 className="text-2xl font-bold text-gray-800">{formik.values.name}</h3>
        <p className="text-sm text-gray-500">{formik.values.email}</p>
      </div>

      {/* Profile Content */}
      <form onSubmit={formik.handleSubmit}>
        <div className="p-6">
          <div className="space-y-6">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                value={formik.values.name}
                onChange={formik.handleChange}
                name="name"
                disabled={!formik.values.isEditing || formik.isSubmitting}
                className={`w-full px-4 py-3 rounded-lg focus:outline-none ${
                  formik.values.isEditing ? "bg-gray-50 border border-gray-300" : "bg-white"
                }`}
              />
              {formik.errors.name && formik.touched.name && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
              )}
            </div>

            {/* Mobile Field with custom handler */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
              <input
                type="text"
                value={formik.values.mobile}
                onChange={handleMobileChange} // Use custom handler
                name="mobile"
                disabled={!formik.values.isEditing || formik.isSubmitting}
                placeholder="Enter your 10-digit mobile number"
                maxLength={10} // Limit to 10 characters
                className={`w-full px-4 py-3 rounded-lg focus:outline-none ${
                  formik.values.isEditing ? "bg-gray-50 border border-gray-300" : "bg-white"
                }`}
              />
              {formik.errors.mobile && formik.touched.mobile && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.mobile}</div>
              )}
            </div>

            {/* Save Changes Button */}
            {formik.values.isEditing && (
              <div className="pt-4 flex space-x-3">
                <button
                  type="button" 
                  className="flex-1 bg-white border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium"
                  onClick={() => {
                    formik.resetForm();
                    setImage(formik.initialValues.image || "/api/placeholder/200/200");
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-200 font-medium flex items-center justify-center"
                  disabled={isLoading || formik.isSubmitting}
                >
                  {isLoading || formik.isSubmitting ? "Saving..." : "Save Changes"}
                </button>
              </div>
            )}

            {/* Success/Error Messages */}
            {isSuccess && (
              <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-lg">
                Profile updated successfully!
              </div>
            )}
            {isError && (
              <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg">
                Error: {error?.message || "Something went wrong while updating your profile."}
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};