import React from "react";
import { Upload } from "lucide-react";

const CertificatesStep = ({ formik }) => {
  const handleFileChange = (field) => (e) => {
    const file = e.target.files[0];

    if (!formik.values[field]) {
      formik.setFieldValue(field, [file]);
    } else {
      formik.setFieldValue(field, [...formik.values[field], file]);
    }
  };

  const removeFile = (field, index) => {
    if (formik.values[field] && formik.values[field].length > index) {
      const newFiles = [...formik.values[field]];
      newFiles.splice(index, 1);
      formik.setFieldValue(field, newFiles);
    }
  };

  const certificates = formik.values.certificates || [];

  return (
		<div className="w-full space-y-6">
			<h2 className="text-2xl font-bold text-gray-800">
				Upload Certificates & Experience
			</h2>
			<p className="text-gray-600">
				You can optionally upload your certificates and enter your experience
				letters.
			</p>

			<div className="space-y-4">
				{/* Certificates Upload */}
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Certificates <span className="text-gray-400">(Optional)</span>
					</label>
					<div className="flex items-center space-x-2">
						<label
							className="cursor-pointer border-2 border-dashed rounded-lg p-4 w-full flex flex-col items-center justify-center hover:bg-gray-50"
							style={{ borderColor: "#426B1F" }}
						>
							<Upload className="h-8 w-8 mb-2" style={{ color: "#426B1F" }} />
							<span className="text-sm text-gray-500">
								Upload certificate files
							</span>
							<input
								type="file"
								className="hidden"
								accept=".pdf,.jpg,.jpeg,.png"
								onChange={handleFileChange("certificates")}
							/>
						</label>
					</div>

					{certificates.length > 0 && (
						<div className="mt-3 space-y-2">
							<p className="text-sm font-medium text-gray-700">
								Uploaded Certificates:
							</p>
							{certificates.map((file, index) => (
								<div
									key={index}
									className="flex justify-between items-center p-2 bg-gray-50 rounded"
								>
									<span className="text-sm text-gray-700 truncate max-w-xs">
										{file?.name}
									</span>
									<button
										type="button"
										onClick={() => removeFile("certificates", index)}
										className="text-red-500 hover:text-red-700"
									>
										Remove
									</button>
								</div>
							))}
						</div>
					)}
				</div>

				{/* Experience Letters Text Field */}
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Experience <span className="text-gray-400">(Optional)</span>
					</label>
					<textarea
						name="experienceLetters"
						className="w-full border rounded-md px-3 py-2 text-sm"
						placeholder="Write about your work experience..."
						rows={4}
						value={formik.values.experienceLetters || ""}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>
				</div>
			</div>
		</div>
	);
};

export default CertificatesStep;
