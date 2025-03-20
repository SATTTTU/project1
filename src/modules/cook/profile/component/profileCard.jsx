import React, { useState } from 'react';
import { Camera, Loader2 } from 'lucide-react';
import { useVideoFormik } from '../formik/usevideoupload';


const ProfileCard = ({ userData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState(userData.profileImage);

  const { formik, isSubmitting } = useVideoFormik({
    fullName: userData.fullName,
    bio: userData.bio,
    phone: userData.phone,
    cuisineSpecialties: userData.cuisineSpecialties || [],
    profileImage: null
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      formik.setFieldValue('profileImage', file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    formik.resetForm();
    setImagePreview(userData.profileImage);
  };

  const availableCuisines = [
    'Italian', 'French', 'Chinese', 'Indian', 'Japanese', 
    'Mexican', 'Mediterranean', 'American', 'Thai', 'Middle Eastern'
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>
        {!isEditing ? (
          <button 
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </button>
        ) : (
          <div className="flex space-x-2">
            <button 
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button 
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
              onClick={formik.handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Save Changes
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Profile Image */}
        <div className="mb-6 md:mb-0 md:mr-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100">
              {imagePreview ? (
                <img 
                  src={imagePreview} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                  <span className="text-xl">{userData.fullName.charAt(0)}</span>
                </div>
              )}
            </div>
            
            {isEditing && (
              <label 
                htmlFor="profileImage" 
                className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-1 cursor-pointer"
              >
                <Camera className="h-4 w-4 text-white" />
                <input 
                  type="file" 
                  id="profileImage" 
                  accept="image/*" 
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            )}
          </div>
        </div>

        {/* Profile Information */}
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              {isEditing ? (
                <div>
                  <input
                    type="text"
                    name="fullName"
                    value={formik.values.fullName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full p-2 border rounded-md"
                  />
                  {formik.touched.fullName && formik.errors.fullName && (
                    <p className="text-red-500 text-xs mt-1">{formik.errors.fullName}</p>
                  )}
                </div>
              ) : (
                <p className="text-gray-900">{userData.fullName}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              {isEditing ? (
                <div>
                  <input
                    type="tel"
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full p-2 border rounded-md"
                  />
                  {formik.touched.phone && formik.errors.phone && (
                    <p className="text-red-500 text-xs mt-1">{formik.errors.phone}</p>
                  )}
                </div>
              ) : (
                <p className="text-gray-900">{userData.phone}</p>
              )}
            </div>

            {/* Bio */}
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
              {isEditing ? (
                <div>
                  <textarea
                    name="bio"
                    value={formik.values.bio}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    rows="3"
                    className="w-full p-2 border rounded-md"
                  />
                  <p className="text-gray-500 text-xs mt-1">
                    {formik.values.bio.length}/500 characters
                  </p>
                  {formik.touched.bio && formik.errors.bio && (
                    <p className="text-red-500 text-xs mt-1">{formik.errors.bio}</p>
                  )}
                </div>
              ) : (
                <p className="text-gray-900">{userData.bio || "No bio provided"}</p>
              )}
            </div>

            {/* Cuisine Specialties */}
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cuisine Specialties
              </label>
              {isEditing ? (
                <div>
                  <div className="flex flex-wrap gap-2">
                    {availableCuisines.map((cuisine) => (
                      <label key={cuisine} className="flex items-center">
                        <input
                          type="checkbox"
                          name="cuisineSpecialties"
                          value={cuisine}
                          checked={formik.values.cuisineSpecialties.includes(cuisine)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              formik.setFieldValue('cuisineSpecialties', [
                                ...formik.values.cuisineSpecialties,
                                cuisine
                              ]);
                            } else {
                              formik.setFieldValue(
                                'cuisineSpecialties',
                                formik.values.cuisineSpecialties.filter(
                                  (c) => c !== cuisine
                                )
                              );
                            }
                          }}
                          className="mr-1"
                        />
                        <span className="text-sm">{cuisine}</span>
                      </label>
                    ))}
                  </div>
                  {formik.touched.cuisineSpecialties && formik.errors.cuisineSpecialties && (
                    <p className="text-red-500 text-xs mt-1">
                      {formik.errors.cuisineSpecialties}
                    </p>
                  )}
                </div>
              ) : (
                <div className="flex flex-wrap gap-1">
                  {userData.cuisineSpecialties && userData.cuisineSpecialties.map((cuisine) => (
                    <span 
                      key={cuisine} 
                      className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                    >
                      {cuisine}
                    </span>
                  ))}
                  {(!userData.cuisineSpecialties || userData.cuisineSpecialties.length === 0) && (
                    <span className="text-gray-500">No specialties specified</span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;