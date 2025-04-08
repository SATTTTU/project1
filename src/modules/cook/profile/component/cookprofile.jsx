"use client";

import { useState, useEffect } from "react";
import { UseProfileFormik } from "../formik/useupdatecookprofile";
import LocationMap from "@/components/ui/locationMap/locationmap";
import { UsegetCookLocation } from "../api/getCookLocation";
import Profile from "../../../../assets/defaultProfile.jpg";

export const ProfileCard = ({ userData }) => {
	const { mutateAsync: fetchCookLocation } = UsegetCookLocation();
	const { formik, isLoading } = UseProfileFormik(userData);
	const [imagePreview, setImagePreview] = useState(
		userData?.image_url
			? `${import.meta.env.VITE_BUCKET_URL}${userData.image_url}`
			: Profile
	);
	const [isEditMode, setIsEditMode] = useState(false);

	// Update image preview when switching form state
	useEffect(() => {
		if (!isEditMode) {
			setImagePreview(
				userData?.image_url
					? `${import.meta.env.VITE_BUCKET_URL}${userData.image_url}`
					: Profile
			);
		}
	}, [isEditMode, userData]);

	const handleImageChange = (event) => {
		const file = event.target.files[0];
		if (file && ["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
			formik.setFieldValue("image", file);
			const reader = new FileReader();
			reader.onload = () => setImagePreview(reader.result);
			reader.readAsDataURL(file);
		}
	};

	const handleEditToggle = () => {
		setIsEditMode(!isEditMode);
		formik.setFieldValue("isEditing", !formik.values.isEditing);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		await formik.handleSubmit(event);
		setIsEditMode(false);
	};

	const handleCancel = () => {
		setIsEditMode(false);
		formik.setFieldValue("isEditing", false);
		formik.resetForm();
		setImagePreview(
			userData?.image_url
				? `${import.meta.env.VITE_BUCKET_URL}${userData.image_url}`
				: Profile
		);
	};

	return (
		<div className="bg-white rounded-lg shadow-sm p-6 mb-6">
			<div className="flex flex-col md:flex-row items-center justify-between">
				{/* Profile Image Section */}
				<div className="flex items-center space-x-6 w-full md:w-auto">
					<div className="relative">
						<img
							src={imagePreview}
							onError={(e) => {
								e.target.onerror = null;
								e.target.src = Profile;
							}}
							alt="Profile"
							className="rounded-full h-20 w-22 object-cover border-2 border-white shadow-md"
						/>
						{isEditMode && (
							<label
								htmlFor="profile-pic"
								className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow cursor-pointer"
							>
								<input
									id="profile-pic"
									type="file"
									accept="image/png, image/jpeg, image/jpg"
									className="hidden"
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
				</div>

				{/* Form Section */}
				<form onSubmit={handleSubmit} className="w-full md:ml-6 mt-4 md:mt-0">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{/* Name */}
						<div className="col-span-1 md:col-span-2">
							<label className="block text-sm font-medium text-gray-600 mb-1">
								Full Name
							</label>
							{isEditMode ? (
								<input
									type="text"
									name="name"
									value={formik.values.name}
									onChange={formik.handleChange}
									className="w-full px-3 py-2 border border-gray-300 rounded-md"
								/>
							) : (
								<p className="text-gray-800 font-medium">
									{formik.values.name}
								</p>
							)}
							{formik.touched.name && formik.errors.name && (
								<p className="text-red-500 text-xs mt-1">
									{formik.errors.name}
								</p>
							)}
						</div>

						{/* Mobile */}
						<div>
							<label className="block text-sm font-medium text-gray-600 mb-1">
								Mobile Number
							</label>
							{isEditMode ? (
								<input
									type="text"
									name="mobile"
									value={formik.values.mobile}
									onChange={formik.handleChange}
									maxLength={10}
									className="w-full px-3 py-2 border border-gray-300 rounded-md"
								/>
							) : (
								<p className="text-gray-800 font-medium">
									{userData?.phone || "Not provided"}
								</p>
							)}
							{formik.touched.mobile && formik.errors.mobile && (
								<p className="text-red-500 text-xs mt-1">
									{formik.errors.mobile}
								</p>
							)}
						</div>

						{/* Email */}
						<div>
							<label className="block text-sm font-medium text-gray-600 mb-1">
								Email
							</label>
							{isEditMode ? (
								<input
									type="email"
									name="email"
									value={formik.values.email}
									onChange={formik.handleChange}
									className="w-full px-3 py-2 border border-gray-300 rounded-md"
								/>
							) : (
								<p className="text-gray-800 font-medium">
									{formik.values.email}
								</p>
							)}
						</div>
					</div>

					{/* Buttons */}
					{isEditMode ? (
						<div className="flex gap-4 mt-4">
							<button
								type="button"
								onClick={handleCancel}
								className="px-4 py-2 border rounded-md"
							>
								Cancel
							</button>
							<button
								type="submit"
								disabled={isLoading}
								className="px-4 py-2 bg-green-600 text-white rounded-md"
							>
								{isLoading ? "Saving..." : "Save Changes"}
							</button>
						</div>
					) : (
						<div className="mt-4 text-end">
							<button
								type="button"
								onClick={handleEditToggle}
								className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
							>
								Edit Profile
							</button>
						</div>
					)}

					{formik.errors.submit && (
						<div className="mt-4 bg-red-100 text-red-700 p-2 rounded">
							{formik.errors.submit}
						</div>
					)}
				</form>
			</div>

			{/* Location Map */}
			<div className="mt-6">
				<label className="block text-sm font-medium text-gray-600 mb-2">
					Your Location
				</label>
				<LocationMap
					fetchLocationFn={fetchCookLocation}
					title="cook location"
				/>
			</div>
		</div>
	);
};
