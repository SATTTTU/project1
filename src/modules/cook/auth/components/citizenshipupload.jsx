import React, { useRef } from 'react';
import { Upload } from 'lucide-react';

export const CitizenshipUploadStep = ({ formik }) => {
  const passportPhotoInputRef = useRef(null);
  const frontInputRef = useRef(null);
  const backInputRef = useRef(null);

  const handleFileChange = (field) => (e) => {
    const file = e.target.files[0];
    formik.setFieldValue(field, file);
  };

  const handleAreaClick = (inputRef) => () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  // Add drag and drop functionality
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (field) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      formik.setFieldValue(field, e.dataTransfer.files[0]);
    }
  };

  return (
		<div className="space-y-6">
			<h2 className="text-xl font-semibold text-gray-800">
				Upload Password size photo and Citizenship Documents
			</h2>
			<p className="text-gray-600">
				Please upload clear images of your citizenship documents.
			</p>

			<div className="space-y-4">
				{/* Passport-sized photo */}
				<div>
					<label className="block text-sm font-medium text-red-700 mb-1">
						Passport-sized Photo*
					</label>
					<div
						className="mt-1 flex items-center justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:bg-gray-50 transition-colors"
						onClick={handleAreaClick(passportPhotoInputRef)}
						onDragOver={handleDragOver}
						onDrop={handleDrop("passwordsizedphoto")}
					>
						<div className="space-y-1 text-center">
							<Upload className="mx-auto h-12 w-12 text-gray-400" />
							<div className="flex text-sm text-gray-600">
								<span className="text-blue-600 hover:text-blue-500">
									Upload a file
								</span>
								<input
									ref={passportPhotoInputRef}
									id="passwordsizedphoto"
									name="passwordsizedphoto"
									type="file"
									className="sr-only"
									onChange={handleFileChange("passwordsizedphoto")}
									accept="image/*"
								/>
								<p className="pl-1">or drag and drop</p>
							</div>
							<p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>

							{formik.values.passwordsizedphoto && (
								<p className="text-sm text-green-600">
									File selected: {formik.values.passwordsizedphoto?.name}
								</p>
							)}
						</div>
					</div>
					{formik.touched.passwordsizedphoto &&
						formik.errors.passwordsizedphoto && (
							<div className="text-red-500 text-sm mt-1">
								{formik.errors.passwordsizedphoto}
							</div>
						)}
				</div>

				{/* Rest of the component remains the same */}
				{/* Front side upload */}
				<div>
					<label className="block text-sm font-medium text-red-700  mb-1">
						Citizenship Front Side*
					</label>
					<div
						className="mt-1 flex items-center justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:bg-gray-50 transition-colors"
						onClick={handleAreaClick(frontInputRef)}
						onDragOver={handleDragOver}
						onDrop={handleDrop("citizenshipFront")}
					>
						<div className="space-y-1 text-center">
							<Upload className="mx-auto h-12 w-12 text-gray-400" />
							<div className="flex text-sm text-gray-600">
								<span className="text-blue-600 hover:text-blue-500">
									Upload a file
								</span>
								<input
									ref={frontInputRef}
									id="citizenshipFront"
									name="citizenshipFront"
									type="file"
									className="sr-only"
									onChange={handleFileChange("citizenshipFront")}
									accept="image/*"
								/>
								<p className="pl-1">or drag and drop</p>
							</div>
							<p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>

							{formik.values.citizenshipFront && (
								<p className="text-sm text-green-600">
									File selected: {formik.values.citizenshipFront?.name}
								</p>
							)}
						</div>
					</div>
					{formik.touched.citizenshipFront &&
						formik.errors.citizenshipFront && (
							<div className="text-red-500 text-sm mt-1">
								{formik.errors.citizenshipFront}
							</div>
						)}
				</div>

				{/* Back side upload */}
				<div>
					<label className="block text-sm font-medium text-red-700  mb-1">
						Citizenship Back Side*
					</label>
					<div
						className="mt-1 flex items-center justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:bg-gray-50 transition-colors"
						onClick={handleAreaClick(backInputRef)}
						onDragOver={handleDragOver}
						onDrop={handleDrop("citizenshipBack")}
					>
						<div className="space-y-1 text-center">
							<Upload className="mx-auto h-12 w-12 text-gray-400" />
							<div className="flex text-sm text-gray-600">
								<span className="text-blue-600 hover:text-blue-500">
									Upload a file
								</span>
								<input
									ref={backInputRef}
									id="citizenshipBack"
									name="citizenshipBack"
									type="file"
									className="sr-only"
									onChange={handleFileChange("citizenshipBack")}
									accept="image/*"
								/>
								<p className="pl-1">or drag and drop</p>
							</div>
							<p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>

							{formik.values.citizenshipBack && (
								<p className="text-sm text-green-600">
									File selected: {formik.values.citizenshipBack?.name}
								</p>
							)}
						</div>
					</div>
					{formik.touched.citizenshipBack && formik.errors.citizenshipBack && (
						<div className="text-red-500 text-sm mt-1">
							{formik.errors.citizenshipBack}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};