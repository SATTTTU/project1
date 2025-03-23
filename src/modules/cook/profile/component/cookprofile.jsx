import React, { useState, useEffect } from "react";
import { useCookEditFormik } from "../formik/useupdatecookprofile";
import LocationMap from "@/components/ui/locationMap/locationmap";
import { UsegetCookLocation } from "../api/getCookLocation";


export const ProfileCard = () => {
  const {mutateAsync:fetchCookLOcation}=UsegetCookLocation();
  const { formik, isLoading } = useCookEditFormik();
  const [imagePreview, setImagePreview] = useState("/api/placeholder/200/200");
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    // Set initial image preview when form is initialized
    if (formik.values.image && !(formik.values.image instanceof File)) {
      setImagePreview(formik.values.image);
    }
  }, [formik.values.image]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Verify the file type
      if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
        // toast.error("Only JPG, JPEG, and PNG files are allowed");
        return;
      }
      
      // Store the actual file object in formik
      formik.setFieldValue("image", file);
      
      // Create preview for UI
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditToggle = () => {
    setIsEditMode(!isEditMode);
    formik.setFieldValue("isEditing", !formik.values.isEditing);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    formik.handleSubmit(event);
    setIsEditMode(false);
  };

  const handleCancel = () => {
    setIsEditMode(false);
    formik.setFieldValue("isEditing", false);
    formik.resetForm();
    setImagePreview(formik.initialValues.image);
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Profile Card */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Header Gradient */}
        <div className="relative h-48 bg-gradient-to-r from-green-500 to-green-700">
          {!isEditMode && (
            <button 
              onClick={handleEditToggle}
              className="absolute top-4 right-4 bg-white text-gray-800 px-4 py-2 rounded-full font-medium shadow-md hover:bg-gray-100 transition-colors"
            >
              Edit Profile
            </button>
          )}
          
          {/* Profile Image */}
          <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-16">
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white bg-white shadow-md">
                <img src={imagePreview} alt="Profile" className="w-full h-full object-cover" />
              </div>
              {isEditMode && (
                <label htmlFor="profile-pic" className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md cursor-pointer hover:bg-gray-100">
                  <input type="file" id="profile-pic" className="hidden" accept="image/png,image/jpeg,image/jpg" onChange={handleImageChange} />
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </label>
              )}
            </div>
          </div>
        </div>
        
        {/* Profile Content */}
        <div className="pt-20 pb-6 px-8">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Full Name */}
              <div>
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
                  <p className="text-gray-800 font-medium">{formik.values.name}</p>
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
                  <p className="text-gray-800 font-medium">{formik.values.mobile || "Not provided"}</p>
                )}
                {formik.errors.mobile && formik.touched.mobile && (
                  <div className="text-red-500 text-xs mt-1">{formik.errors.mobile}</div>
                )}
              </div>

              {/* Email - Read Only */}
              {!isEditMode && formik.values.email && (
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                  <p className="text-gray-800 font-medium">{formik.values.email}</p>
                </div>
              )}

              {/* Action Buttons */}
              {isEditMode && (
                <div className="flex space-x-4 pt-4">
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
              <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
                {formik.errors.submit}
              </div>
            )}
          </form>
          <label htmlFor="">Your LOcation</label>
          <LocationMap
          fetchLocationFn={fetchCookLOcation}
          title="cook location"/>
        </div>
      </div>
    </div>
  );
};