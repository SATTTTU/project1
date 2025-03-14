// components/FileUpload.jsx
import React from "react";

const FileUpload = ({
  label,
  name,
  accept,
  file,
  handleFileChange,
  handleDrop,
  handleDragOver,
  removeFile,
  fileInputRefs,
  errors,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-medium mb-2">{label}</label>
      <div
        className={`border-2 border-dashed rounded-lg p-4 text-center ${
          file ? "border-green-500 bg-green-50" : "border-gray-300 hover:border-[#4b6c1e]"
        } transition-colors cursor-pointer`}
        onDrop={(e) => handleDrop(e, name)}
        onDragOver={handleDragOver}
        onClick={() => fileInputRefs[name].current.click()}
      >
        <input
          type="file"
          name={name}
          ref={fileInputRefs[name]}
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
        />

        {file ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <svg
                className="w-6 h-6 text-green-500 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              <span className="text-sm truncate max-w-xs">
                {file.name}
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
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
        ) : (
          <div>
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="mt-1 text-sm text-gray-600">
              Drag and drop a file here, or click to select
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {accept === "image/*"
                ? "JPG, PNG or GIF up to 5MB"
                : "PDF, JPG, PNG up to 5MB"}
            </p>
          </div>
        )}
      </div>
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
      )}
    </div>
  );
};

export default FileUpload;