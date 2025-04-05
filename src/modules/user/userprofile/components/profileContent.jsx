import { useState, useRef, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useUserProfileEditFormik } from "../formik/updateProfileFormik";
import { useProfile } from "../api/getProfile";

export const ProfileContent = () => {
  const { formik } = useUserProfileEditFormik();
  const { data: profile, refetch } = useProfile();
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);

  // Set the image preview when the profile data is fetched
  useEffect(() => {
    if (profile?.image_url && !preview) {
      setPreview(`https://khajabox-bucket.s3.ap-south-1.amazonaws.com/${profile.image_url}`);
    }
  }, [profile]);

  // Handle image selection and update the Formik field without triggering validation on other fields
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Only update the image field, avoid triggering validation for other fields
      formik.setFieldValue("image", file);
      setPreview(URL.createObjectURL(file)); // Set the preview image

      // Optionally, you could call Formik's validation function for image validation here
      // For example: formik.validateField('image');
    }
  };

  // Handle avatar click to trigger the file input
  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await formik.handleSubmit();
    await refetch(); // Refetch the profile data after successful form submission
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-4">
      {/* Profile Image Upload */}
      <div className="flex flex-col items-center mb-6">
        <div onClick={handleAvatarClick} className="relative cursor-pointer group">
          <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            {preview ? (
              <img
                src={preview}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-400 text-9xl">
                <FaUserCircle />
              </span>
            )}
          </div>
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
            <span className="text-white text-xl">Change Photo</span>
          </div>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
        <label className="mt-2 text-sm text-gray-500">Click on Image to change</label>
        {formik.errors?.image && (
          <p className="text-red-500">{formik.errors.image}</p>
        )}
      </div>

      {/* Other Form Fields */}
      <div>
        <label className="block text-sm font-medium">Name</label>
        <input
          type="text"
          name="name"
          value={formik.values?.name || ""}
          onChange={formik.handleChange}
          className="w-full px-4 py-2 border border-slate-300 rounded-md"
        />
        {formik.errors?.name && (
          <p className="text-red-500">{formik.errors.name}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          name="email"
          value={formik.values?.email || ""}
          onChange={formik.handleChange}
          className="w-full px-4 py-2 border border-slate-300 rounded-md"
        />
        {formik.errors?.email && (
          <p className="text-red-500">{formik.errors.email}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">Phone</label>
        <input
          type="tel"
          name="phone"
          value={formik.values?.phone || ""}
          onChange={formik.handleChange}
          className="w-full px-4 py-2 border border-slate-300 rounded-md"
        />
        {formik.errors?.phone && (
          <p className="text-red-500">{formik.errors.phone}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={formik.isSubmitting}
        className="px-6 py-2 bg-green-600 text-white rounded-md"
      >
        {formik.isSubmitting ? "Updating..." : "Save Changes"}
      </button>
    </form>
  );
};
