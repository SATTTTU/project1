// Main CookProfile component
import React, { useState, useRef } from "react";
import CookNavBar from "../../../../components/ui/cooknavbar/cooknavbar";
import ProfileHeader from "./components/ProfileHeader";
import StatusBanner from "./components/StatusBanner";
import ProfileCard from "./components/ProfileCard";
import IntroductionVideo from "./components/IntroductionVideo";
import AchievementsExperience from "./components/AchievementsExperience";
import AccountSettings from "./components/AccountSettings";
import { userData } from "./data/userData";

export const CookProfile = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const videoInputRef = useRef(null);

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file type
      if (!file.type.startsWith("video/")) {
        alert("Please upload a video file");
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
          alert("Video must be under 2 minutes");
          return;
        }

        // Set video file and create preview URL
        setVideoFile(file);
        setVideoPreview(URL.createObjectURL(file));

        // Simulate upload
        simulateUpload();
      };

      video.src = URL.createObjectURL(file);
    }
  };

  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };

  const removeVideo = () => {
    setVideoFile(null);
    setVideoPreview(null);
    setUploadProgress(0);
    if (videoInputRef.current) {
      videoInputRef.current.value = "";
    }
  };

  const triggerVideoUpload = () => {
    if (videoInputRef.current) {
      videoInputRef.current.click();
    }
  };

  const videoProps = {
    videoFile,
    videoPreview,
    isUploading,
    uploadProgress,
    videoInputRef,
    handleVideoUpload,
    removeVideo,
    triggerVideoUpload,
  };

  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <CookNavBar />
      <div className="flex flex-1 overflow-hidden">
        {/* Main content */}
        <main className="flex-1 overflow-auto p-4 md:p-6 bg-gray-50">
          <ProfileHeader />
          <StatusBanner userData={userData} />
          <ProfileCard userData={userData} />
          <IntroductionVideo {...videoProps} />
          <AchievementsExperience userData={userData} />
          <AccountSettings />
        </main>
      </div>
    </div>
  );
};
