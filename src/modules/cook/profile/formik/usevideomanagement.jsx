import { useState, useRef } from "react";
import { toast } from "react-toastify";
import { useDeleteIntroVideo, useUploadIntroVideo } from "../api/introvideo";
import { videoSchema } from "./schema/videoschema";

// Define Zod validation schema

export const useIntroVideo = (initialVideo = null) => {
  console.log("tiedfafdff:", initialVideo);
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(initialVideo);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const videoInputRef = useRef(null);

  // Upload API
  const { mutate: uploadVideo, isLoading: isUploadLoading } =
    useUploadIntroVideo({
      onSuccess: () => {
        toast.success("Video uploaded successfully");
        setIsUploading(false);
        setUploadProgress(100);
      },
      onError: (error) => {
        toast.error(error.message || "Failed to upload video");
        setIsUploading(false);
      },
      onMutate: () => {
        setIsUploading(true);
        setUploadProgress(0);
        simulateProgress();
      },
    });

  // Delete API
  const { mutate: deleteVideo, isLoading: isDeleteLoading } =
    useDeleteIntroVideo({
      onSuccess: () => {
        toast.success("Video removed successfully");
        setVideoFile(null);
        setVideoPreview(null);
        setUploadProgress(0);
      },
      onError: (error) => {
        toast.error(error.message || "Failed to remove video");
      },
    });

  // Simulate upload progress
  const simulateProgress = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setUploadProgress(progress);
      if (progress >= 90) {
        clearInterval(interval);
      }
    }, 200);
    return interval;
  };

  // Handle file upload
  const handleVideoUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      toast.error("Please select a video file");
      return;
    }

    try {
      // Create FormData first
      const formData = new FormData();
      formData.append("video", file);

      // Set video preview
      const previewUrl = URL.createObjectURL(file);
      setVideoPreview(previewUrl);
      setVideoFile(file);

      // Validate file using schema
      await videoSchema.parseAsync({ video: file });

      // Upload video
      uploadVideo(formData);
    } catch (error) {
      console.error("Validation error:", error);
      // Handle Zod validation errors
      if (error.errors && error.errors.length > 0) {
        toast.error(error.errors[0].message);
      } else {
        toast.error(error.message || "File validation failed");
      }
      // Reset file input and preview
      if (videoInputRef.current) {
        videoInputRef.current.value = "";
      }
      setVideoPreview(null);
      setVideoFile(null);
    }
  };

  // Remove video
  const removeVideo = () => {
    if (videoPreview || initialVideo) {
      deleteVideo();
    } else {
      setVideoFile(null);
      setVideoPreview(null);
      setUploadProgress(0);
    }
    if (videoInputRef.current) {
      videoInputRef.current.value = "";
    }
  };

  const triggerVideoUpload = () => {
    if (videoInputRef.current) {
      videoInputRef.current.click();
    }
  };

  return {
    videoFile,
    videoPreview,
    isUploading: isUploading || isUploadLoading,
    isDeleting: isDeleteLoading,
    uploadProgress,
    videoInputRef,
    handleVideoUpload,
    removeVideo,
    triggerVideoUpload,
  };
};
