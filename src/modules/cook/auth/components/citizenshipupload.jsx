import { AlertCircle, Upload } from "lucide-react";

export const CitizenshipUploadStep = ({ formData, errors, handleFileChange }) => {
  return (
    <div className="w-full space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Upload Citizenship Documents</h2>
      <p className="text-gray-600">Please upload passport-size photos of your citizenship card (front and back)</p>
      
      <div className="space-y-4">
        {/* Citizenship Front */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Citizenship Front</label>
          <div className="flex items-center space-x-2">
            <label 
              className="cursor-pointer border-2 border-dashed rounded-lg p-4 w-full flex flex-col items-center justify-center hover:bg-gray-50"
              style={{ borderColor: errors.citizenshipFront ? 'red' : '#426B1F' }}
            >
              <Upload className="h-8 w-8 mb-2" style={{ color: '#426B1F' }} />
              <span className="text-sm text-gray-500">
                {formData.citizenshipFront ? formData.citizenshipFront.name : 'Upload passport-size photo'}
              </span>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => handleFileChange(e, 'citizenshipFront')} // Call Formik handler
              />
            </label>
          </div>
          {errors.citizenshipFront && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.citizenshipFront}
            </p>
          )}
        </div>

        {/* Citizenship Back */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Citizenship Back</label>
          <div className="flex items-center space-x-2">
            <label 
              className="cursor-pointer border-2 border-dashed rounded-lg p-4 w-full flex flex-col items-center justify-center hover:bg-gray-50"
              style={{ borderColor: errors.citizenshipBack ? 'red' : '#426B1F' }}
            >
              <Upload className="h-8 w-8 mb-2" style={{ color: '#426B1F' }} />
              <span className="text-sm text-gray-500">
                {formData.citizenshipBack ? formData.citizenshipBack.name : 'Upload passport-size photo'}
              </span>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => handleFileChange(e, 'citizenshipBack')} // Call Formik handler
              />
            </label>
          </div>
          {errors.citizenshipBack && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.citizenshipBack}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
