import React from "react";
import { FaVideo, FaTrash } from "react-icons/fa";

const IntroductionVideo = ({
  videoPreview,
  videoInputRef,
  isUploading,
  uploadProgress,
  handleVideoUpload,
  removeVideo,
  triggerVideoUpload,
}) => {
  return (
    <div className="mb-8 rounded-lg bg-white p-6 shadow-sm">
      <h3 className="text-lg font-medium flex items-center">
        <FaVideo className="mr-2 text-[#426B1F]" /> Introduction Video (max 2
        minutes)
      </h3>
      <p className="text-sm text-gray-500 mt-1">
        Share a brief introduction about yourself and your cooking style to
        attract more customers
      </p>

      <div className="mt-4">
        {!videoPreview ? (
          <div
            onClick={triggerVideoUpload}
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer hover:border-[#426B1F] transition-colors"
          >
            <FaVideo className="text-gray-400 text-4xl mb-3" />
            <p className="text-gray-600 font-medium">
              Click to upload your intro video
            </p>
            <p className="text-gray-500 text-sm mt-1">
              MP4 or WebM format, max 2 minutes
            </p>
            <input
              type="file"
              accept="video/*"
              className="hidden"
              onChange={handleVideoUpload}
              ref={videoInputRef}
            />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative rounded-lg overflow-hidden">
              <video
                src={videoPreview}
                controls
                className="w-full rounded-lg"
                style={{ maxHeight: "300px" }}
              />
              <button
                onClick={removeVideo}
                className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700"
              >
                <FaTrash className="h-4 w-4" />
              </button>
            </div>

            {isUploading && (
              <div className="w-full">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Uploading video...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-[#426B1F] h-2 rounded-full"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default IntroductionVideo;
