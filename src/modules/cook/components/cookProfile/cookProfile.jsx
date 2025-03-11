import CookNavBAr from "../../../../components/ui/cooknavbar/cooknavbar";
import React, { useState, useRef } from "react";
import {
  FaCamera,
  FaUser,
  FaVideo,
  FaTrash,
  FaAward,
  FaBriefcase,
  FaUtensils,
} from "react-icons/fa";

export const cookProfile = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const videoInputRef = useRef(null);

  // Sample user data
  const userData = {
    name: "Alka Rai",
    email: "alakarai@example.com",
    phone: "+91 98765 43210",
    address: "123 Main Street, Kathmandu",
    joinedDate: "January 2023",
    totalOrders: 156,
    rating: 4.8,
    specialties: ["Newari", "Tamang", "Rai"],
    bio: "Passionate cook with over 10 years of experience in authentic Nepalese cuisine. Specializing in traditional dishes with a modern twist.",
    achievements: [
      "Best Home Cook Award 2023",
      "Featured in Kathmandu Food Festival",
      "100+ 5-star ratings",
    ],
    availabilityStatus: "Available for bookings",
  };

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

  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <CookNavBAr />
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}

        {/* Main content */}
        <main className="flex-1 overflow-auto p-4 md:p-6 bg-gray-50">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">My Cook Profile</h1>
            <p className="text-sm text-gray-500">
              Manage your profile and showcase your culinary expertise
            </p>
          </div>

          {/* Status Banner */}
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-3 w-3 bg-green-500 rounded-full mr-2"></div>
              <span className="font-medium text-green-800">
                {userData.availabilityStatus}
              </span>
            </div>
            <button className="text-sm text-green-700 hover:text-green-900 underline">
              Change Status
            </button>
          </div>

          {/* Profile Card */}
          <div className="mb-8 rounded-lg bg-white p-6 shadow-sm">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="h-32 w-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    <img
                      src="/placeholder.svg?height=128&width=128"
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <button className="absolute bottom-0 right-0 rounded-full bg-[#426B1F] p-2 text-white shadow-sm">
                    <FaCamera className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-4 text-center">
                  <h2 className="text-xl font-bold">{userData.name}</h2>
                  <p className="text-sm text-gray-500">
                    Cook since {userData.joinedDate}
                  </p>
                  <div className="mt-2 flex items-center justify-center">
                    <div className="flex items-center">
                      <span className="text-yellow-400">★</span>
                      <span className="ml-1 font-medium">
                        {userData.rating}
                      </span>
                    </div>
                    <span className="mx-2 text-gray-300">•</span>
                    <span className="text-sm text-gray-500">
                      {userData.totalOrders} orders
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex-1 space-y-6">
                <div>
                  <h3 className="text-lg font-medium">Personal Information</h3>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-500">
                        Full Name
                      </label>
                      <input
                        type="text"
                        defaultValue={userData.name}
                        className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-[#426B1F] focus:outline-none focus:ring-1 focus:ring-[#426B1F]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">
                        Email
                      </label>
                      <input
                        type="email"
                        defaultValue={userData.email}
                        className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-[#426B1F] focus:outline-none focus:ring-1 focus:ring-[#426B1F]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        defaultValue={userData.phone}
                        className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-[#426B1F] focus:outline-none focus:ring-1 focus:ring-[#426B1F]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">
                        Address
                      </label>
                      <input
                        type="text"
                        defaultValue={userData.address}
                        className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-[#426B1F] focus:outline-none focus:ring-1 focus:ring-[#426B1F]"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    Bio
                  </label>
                  <textarea
                    defaultValue={userData.bio}
                    rows={3}
                    className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-[#426B1F] focus:outline-none focus:ring-1 focus:ring-[#426B1F]"
                    placeholder="Tell customers about yourself and your cooking..."
                  />
                </div>

                <div>
                  <h3 className="text-lg font-medium">Specialties</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {userData.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="inline-flex rounded-full bg-[#426B1F]/10 px-3 py-1 text-sm font-medium text-[#426B1F]"
                      >
                        {specialty}
                      </span>
                    ))}
                    <button className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
                      + Add More
                    </button>
                  </div>
                </div>

                <div className="pt-4">
                  <button className="rounded-md bg-[#426B1F] px-4 py-2 text-white hover:bg-[#365818]">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Introduction Video */}
          <div className="mb-8 rounded-lg bg-white p-6 shadow-sm">
            <h3 className="text-lg font-medium flex items-center">
              <FaVideo className="mr-2 text-[#426B1F]" /> Introduction Video
              (max 2 minutes)
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Share a brief introduction about yourself and your cooking style
              to attract more customers
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

          {/* Achievements & Experience */}
          <div className="mb-8 rounded-lg bg-white p-6 shadow-sm">
            <h3 className="text-lg font-medium flex items-center">
              <FaAward className="mr-2 text-[#426B1F]" /> Achievements &
              Experience
            </h3>

            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Years of Cooking Experience
                </label>
                <div className="mt-1 flex items-center">
                  <select className="rounded-md border border-gray-300 p-2 focus:border-[#426B1F] focus:outline-none focus:ring-1 focus:ring-[#426B1F]">
                    <option>1-3 years</option>
                    <option>3-5 years</option>
                    <option selected>5-10 years</option>
                    <option>10+ years</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Achievements
                </label>
                <div className="mt-2 space-y-2">
                  {userData.achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-gray-50 p-2 rounded"
                    >
                      <span>{achievement}</span>
                      <button className="text-gray-400 hover:text-red-500">
                        <FaTrash className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  <div className="flex mt-2">
                    <input
                      type="text"
                      placeholder="Add new achievement"
                      className="flex-1 rounded-l-md border border-gray-300 p-2 focus:border-[#426B1F] focus:outline-none focus:ring-1 focus:ring-[#426B1F]"
                    />
                    <button className="rounded-r-md bg-[#426B1F] px-4 py-2 text-white hover:bg-[#365818]">
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Account Settings */}
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="text-lg font-medium">Account Settings</h3>
            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between py-2">
                <div>
                  <h4 className="font-medium">Notifications</h4>
                  <p className="text-sm text-gray-500">
                    Receive order and promotional notifications
                  </p>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="peer sr-only"
                  />
                  <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#426B1F] peer-checked:after:translate-x-full"></div>
                </label>
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <h4 className="font-medium">SMS Alerts</h4>
                  <p className="text-sm text-gray-500">
                    Receive text messages for new orders
                  </p>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input type="checkbox" className="peer sr-only" />
                  <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#426B1F] peer-checked:after:translate-x-full"></div>
                </label>
              </div>
              <div className="border-t pt-4">
                <button className="text-red-600 hover:text-red-800">
                  Deactivate Account
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
