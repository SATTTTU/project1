import React from 'react';
import { Upload } from 'lucide-react';

const CertificatesStep = ({ formik }) => {
  const handleFileChange = (field) => (e) => {
    const file = e.target.files[0];
    
    // Check if the field exists in formik values
    if (!formik.values[field]) {
      // Initialize as an array if it doesn't exist
      formik.setFieldValue(field, [file]);
    } else {
      // Add to existing array if it exists
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

  // Make sure the fields exist in formik values
  const certificates = formik.values.certificates || [];
  const experienceLetters = formik.values.experienceLetters || [];

  return (
    <div className="w-full space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Upload Certificates & Experience</h2>
      <p className="text-gray-600">Please upload your educational certificates and work experience letters</p>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Certificates</label>
          <div className="flex items-center space-x-2">
            <label
              className="cursor-pointer border-2 border-dashed rounded-lg p-4 w-full flex flex-col items-center justify-center hover:bg-gray-50"
              style={{ borderColor: '#426B1F' }}
            >
              <Upload className="h-8 w-8 mb-2" style={{ color: '#426B1F' }} />
              <span className="text-sm text-gray-500">Upload certificate files</span>
              <input
                type="file"
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange('certificates')}
              />
            </label>
          </div>
          
          {certificates.length > 0 && (
            <div className="mt-3 space-y-2">
              <p className="text-sm font-medium text-gray-700">Uploaded Certificates:</p>
              {certificates.map((file, index) => (
                <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-sm text-gray-700 truncate max-w-xs">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => removeFile('certificates', index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
          {formik.touched.certificates && formik.errors.certificates && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.certificates}</div>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Experience Letters</label>
          <div className="flex items-center space-x-2">
            <label
              className="cursor-pointer border-2 border-dashed rounded-lg p-4 w-full flex flex-col items-center justify-center hover:bg-gray-50"
              style={{ borderColor: '#426B1F' }}
            >
              <Upload className="h-8 w-8 mb-2" style={{ color: '#426B1F' }} />
              <span className="text-sm text-gray-500">Upload experience letters</span>
              <input
                type="file"
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange('experienceLetters')}
              />
            </label>
          </div>
          
          {experienceLetters.length > 0 && (
            <div className="mt-3 space-y-2">
              <p className="text-sm font-medium text-gray-700">Uploaded Experience Letters:</p>
              {experienceLetters.map((file, index) => (
                <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-sm text-gray-700 truncate max-w-xs">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => removeFile('experienceLetters', index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
          {formik.touched.experienceLetters && formik.errors.experienceLetters && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.experienceLetters}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CertificatesStep;