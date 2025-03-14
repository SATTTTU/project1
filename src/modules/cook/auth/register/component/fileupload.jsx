import React from "react";
import { FiUpload, FiFile, FiX } from "react-icons/fi";

const FileUploadField = ({ 
  name, 
  label, 
  required = false,
  formData,
  fileHandlingProps
}) => {
  const { 
    handleFileChange, 
    handleDrop, 
    handleDragOver,
    removeFile,
    fileInputRefs,
    errors
  } = fileHandlingProps;

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div
        className={`border-2 border-dashed rounded-md p-4 text-center ${
          formData[name] ? "border-[#4b6c1e] bg-[#f5f8f1]" : "border-gray-300"
        }`}
        onDrop={(e) => handleDrop(e, name)}
        onDragOver={handleDragOver}
        onClick={() => fileInputRefs[name].current.click()}
      >
        {formData[name] ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FiFile className="text-[#4b6c1e] mr-2" />
              <span className="text-sm text-gray-700 truncate">
                {formData[name].name}
              </span>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeFile(name);
              }}
              className="text-red-500 hover:text-red-700"
            >
              <FiX />
            </button>
          </div>
        ) : (
          <div>
            <FiUpload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
            <p className="text-sm text-gray-500">
              Drag & drop or click to upload
            </p>
          </div>
        )}
        <input
          ref={fileInputRefs[name]}
          type="file"
          name={name}
          onChange={handleFileChange}
          className="hidden"
          accept="image/*"
        />
      </div>
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
      )}
    </div>
  );
};

export default FileUploadField;