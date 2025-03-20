import { useState, useRef } from "react";
import { useUploadIntroVideo, useDeleteIntroVideo } from "../api/cookprofile";
import { useInstantLayoutTransition } from "framer-motion";

export const useIntroVideo = (initialVideo = null) => {
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(initialVideo);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const videoInputRef = useRef(null);
  const { toast } = useInstantLayoutTransition();

  // Use the mutation hooks
  const { mutate: uploadVideo, isLoading: isUploadLoading } = useUploadIntroVideo({
    onSuccess: () => {
      toast({
        title: "Video uploaded",
        description: "Your introduction video has been uploaded successfully",
        variant: "success",
      });
      setIsUploading(false);
      setUploadProgress(100);
    },
    onError: (error) => {
      toast({
        title: "Upload failed",
        description: error.message || "Failed to upload video",
        variant: "destructive",
      });
      setIsUploading(false);
    },
    onMutate: () => {
      setIsUploading(true);
      setUploadProgress(0);
      // Start progress simulation
      simulateProgress();
    }
  });

  const { mutate: deleteVideo, isLoading: isDeleteLoading } = useDeleteIntroVideo({
    onSuccess: () => {
      toast({
        title: "Video removed",
        description: "Your introduction video has been removed",
        variant: "success",
      });
      // Clear local state
      setVideoFile(null);
      setVideoPreview(null);
      setUploadProgress(0);
    },
    onError: (error) => {
      toast({
        title: "Removal failed",
        description: error.message || "Failed to remove video",
        variant: "destructive",
      });
    }
  });

  // Helper to simulate progress during upload
  const simulateProgress = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setUploadProgress(progress);
      
      // Cap at 90% until actual completion
      if (progress >= 90) {
        clearInterval(interval);
      }
    }, 200);

    // Store the interval in ref to clear it when needed
    return interval;
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file type
      if (!file.type.startsWith("video/")) {
        toast({
          title: "Invalid file type",
          description: "Please upload a video file",
          variant: "destructive",
        });
        return;
      }
      
      // Create video element to check duration
      const video = document.createElement("video");
      video.preload = "metadata";
      
      video.onloadedmetadata = function () {
        window.URL.revokeObjectURL(video.src);
        const duration = video.duration;
        
        // Check if video is under 2 minutes
        if (duration > 120) {
          toast({
            title: "Video too long",
            description: "Video must be under 2 minutes",
            variant: "destructive",
          });
          return;
        }
        
        // Set video file and create preview URL
        setVideoFile(file);
        setVideoPreview(URL.createObjectURL(file));
        
        // Upload the file
        const formData = new FormData();
        formData.append("video", file);
        uploadVideo(formData);
      };
      
      video.src = URL.createObjectURL(file);
    }
  };

  const removeVideo = () => {
    if (videoPreview) {
      // Call API to delete the video if it exists on the server
      deleteVideo();
    } else {
      // Just clear the local state if it's not yet uploaded
      setVideoFile(null);
      setVideoPreview(null);
      setUploadProgress(0);
    }
    
    // Reset file input
    if (videoInputRef.current) {
      videoInputRef.current.value = "";
    }
  };

  const triggerVideoUpload = () => {
    if (videoInputRef.current) {
      videoInputRef.current.click();
    }
  };

  // Return all the state and handlers needed by the IntroductionVideo component
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