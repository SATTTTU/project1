import { useState, useRef, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useUserProfileEditFormik } from "../formik/updateProfileFormik";
import { useProfile } from "../api/getProfile";
import { usegetLocation } from "../../dashboard/api/get-location";
import LocationMap from "@/components/ui/locationMap/locationmap";

export const ProfileContent = () => {
  const { formik } = useUserProfileEditFormik();
  const { data: profile, refetch } = useProfile();
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const { mutateAsync: fetchLocation } = usegetLocation();

  useEffect(() => {
    if (profile?.image_url && !preview) {
      setPreview(`https://khajabox-bucket.s3.ap-south-1.amazonaws.com/${profile.image_url}`);
    }
  }, [profile]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      formik.setFieldValue("image", file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await formik.handleSubmit();
    await refetch();
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-4">
      <div className="flex flex-col items-center mb-6">
        <div onClick={handleAvatarClick} className="relative cursor-pointer group">
          <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            {preview ? (
              <img src={preview} alt="Profile" className="w-full h-full object-cover" />
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
        <input ref={fileInputRef} type="file" name="image" accept="image/*" onChange={handleImageChange} className="hidden" />
        <label className="mt-2 text-sm text-gray-500">Click on Image to change</label>
        {formik.errors?.image && <p className="text-red-500">{formik.errors.image}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">Name</label>
        <input type="text" name="name" value={formik.values?.name || ""} onChange={formik.handleChange} className="w-full px-4 py-2 border rounded-md" />
        {formik.errors?.name && <p className="text-red-500">{formik.errors.name}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">Email</label>
        <input type="email" name="email" value={formik.values?.email || ""} onChange={formik.handleChange} className="w-full px-4 py-2 border rounded-md" />
        {formik.errors?.email && <p className="text-red-500">{formik.errors.email}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">Phone</label>
        <input type="tel" name="phone_number" value={formik.values?.phone_number || ""} onChange={formik.handleChange} className="w-full px-4 py-2 border rounded-md" />
        {formik.errors?.phone_number && <p className="text-red-500">{formik.errors.phone_number}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Your Location</label>
        <LocationMap fetchLocationFn={fetchLocation} title="Your Location" />
      </div>

      <button type="submit" disabled={formik.isSubmitting} className="px-6 py-2 bg-green-600 text-white rounded-md">
        {formik.isSubmitting ? "Updating..." : "Save Changes"}
      </button>
    </form>
  );
};
