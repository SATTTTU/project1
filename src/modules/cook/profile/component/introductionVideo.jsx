import React from 'react';
import { Upload, X, Play, Loader } from 'lucide-react';

const IntroductionVideo = ({
  
  videoPreview,
  isUploading,
  uploadProgress,
  videoInputRef,
  handleVideoUpload,
  removeVideo,
  triggerVideoUpload
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Introduction Video</h2>
      <p className="text-gray-600 mb-6">
        Upload a short video introduction (max 2 minutes) to showcase your cooking style and personality.
        This helps customers get to know you better.
      </p>

      {videoPreview ? (
        <div className="mb-4">
          <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
            <video
              src={videoPreview}
              className="w-full h-full object-cover"
              controls
            />
            <button
              onClick={removeVideo}
              className="absolute top-2 right-2 bg-gray-800 bg-opacity-70 text-white p-1 rounded-full"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          
          {isUploading && (
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {uploadProgress < 100 ? 'Uploading...' : 'Processing...'}
                {uploadProgress}%
              </p>
            </div>
          )}
        </div>
      ) : (
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-12 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition-colors"
          onClick={triggerVideoUpload}
        >
          <div className="bg-blue-100 rounded-full p-4 mb-4">
            <Upload className="h-6 w-6 text-blue-600" />
          </div>
          <p className="text-gray-700 font-medium mb-1">Click to upload video</p>
          <p className="text-gray-500 text-sm text-center">MP4, MOV, or WebM (max 2 min)</p>
          <input
            ref={videoInputRef}
            type="file"
            accept="video/*"
            className="hidden"
            onChange={handleVideoUpload}
          />
        </div>
      )}

      <div className="mt-4 text-gray-600">
        <h3 className="font-medium text-gray-700 mb-2">Video Tips:</h3>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Keep it short and energetic (under 2 minutes)</li>
          <li>Introduce yourself and your culinary background</li>
          <li>Briefly showcase your cooking style and specialties</li>
          <li>Ensure good lighting and clear audio</li>
          <li>Be authentic and let your personality shine</li>
        </ul>
      </div>
    </div>
  );
};

export default IntroductionVideo;