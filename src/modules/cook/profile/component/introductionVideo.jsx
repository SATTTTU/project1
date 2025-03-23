import React from 'react';
import { Upload, X, Loader } from 'lucide-react';
import { useIntroVideo } from '../formik/usevideomanagement';


const IntroductionVideo = ({ initialVideo }) => {
  const {
    videoPreview,
    isUploading,
    isDeleting,
    uploadProgress,
    videoInputRef,
    handleVideoUpload,
    removeVideo,
    triggerVideoUpload
  } = useIntroVideo(initialVideo);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="space-y-4">
        <div className="flex flex-col space-y-2">
          <h3 className="text-lg font-semibold">Introduction Video</h3>
          <p className="text-sm text-gray-600">
            Upload a short video introduction (max 2 minutes) to showcase your cooking style and personality.
            This helps customers get to know you better.
          </p>
        </div>
        
        {videoPreview ? (
          <div className="relative rounded-lg overflow-hidden bg-gray-100 aspect-video">
            <video
              src={videoPreview}
              className="w-full h-full object-cover"
              controls
            />
            <button
              onClick={removeVideo}
              disabled={isDeleting}
              className="absolute top-2 right-2 bg-gray-800 bg-opacity-70 text-white p-1 rounded-full hover:bg-opacity-90 transition-opacity"
              aria-label="Remove video"
            >
              <X size={18} />
            </button>
            {isUploading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white">
                <Loader className="animate-spin mb-2" size={24} />
                <p className="text-sm font-medium">
                  {uploadProgress < 100 ? 'Uploading...' : 'Processing...'}
                </p>
                <p className="text-sm">{uploadProgress}%</p>
              </div>
            )}
            {isDeleting && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white">
                <Loader className="animate-spin mb-2" size={24} />
                <p className="text-sm font-medium">Removing video...</p>
              </div>
            )}
          </div>
        ) : (
          <div
            onClick={triggerVideoUpload}
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
          >
            <input
              type="file"
              ref={videoInputRef}
              onChange={handleVideoUpload}
              accept="video/mp4,video/quicktime,video/webm"
              className="hidden"
            />
            <Upload size={24} className="text-gray-400 mb-2" />
            <p className="font-medium text-gray-700">Click to upload video</p>
            <p className="text-sm text-gray-500">MP4, MOV, or WebM (max 2 min)</p>
          </div>
        )}

        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Video Tips:</h4>
          <ul className="space-y-1 text-sm text-gray-600">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Keep it short and energetic (under 2 minutes)</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Introduce yourself and your culinary background</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Briefly showcase your cooking style and specialties</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Ensure good lighting and clear audio</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Be authentic and let your personality shine</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default IntroductionVideo;