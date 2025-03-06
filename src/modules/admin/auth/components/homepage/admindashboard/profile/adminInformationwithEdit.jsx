import React, { useState } from "react";
import { FaEdit, FaCamera, FaSave } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const MyProfile = ({ onClose }) => {
  const [name, setName] = useState("John Doe");
  const [email] = useState("johndoe@example.com");
  const [mobile, setMobile] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("/api/placeholder/200/200");
  const [isEditing, setIsEditing] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = () => {
    // Implement save logic here
    setIsEditing(false);
    // You might want to add API call to save changes
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }} 
      animate={{ opacity: 1, scale: 1 }} 
      exit={{ opacity: 0, scale: 0.9 }} 
      transition={{ duration: 0.3 }}
      className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70 z-50 p-4"
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header with Profile Image */}
        <div className="relative h-48 bg-gradient-to-r from-blue-600 to-purple-600 flex justify-center items-center">
          <Link to='/admin/dashboard' className="absolute top-4 right-4">
            <IoMdClose className="text-white text-2xl hover:text-gray-200 transition-colors" />
          </Link>
          
          {/* Profile Picture Upload */}
          <div className="relative">
            <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden relative">
              <img
                src={image}
                alt="Profile"
                className="w-full h-full object-cover"
              />
              <label 
                htmlFor="profile-pic" 
                className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
              >
                <FaCamera className="text-white text-2xl" />
                <input 
                  type="file" 
                  id="profile-pic" 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleImageChange} 
                />
              </label>
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div className="p-6">
          {/* Name */}
          <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-1">Name</label>
            <div className="flex items-center">
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setIsEditing(true);
                }}
                disabled={!isEditing}
                className={`w-full py-2 outline-none border-b-2 ${
                  isEditing 
                    ? 'border-blue-500' 
                    : 'border-gray-300'
                }`}
              />
              {!isEditing && (
                <FaEdit 
                  onClick={() => setIsEditing(true)}
                  className="ml-2 text-gray-500 hover:text-blue-600 cursor-pointer"
                />
              )}
            </div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              type="email"
              value={email}
              disabled
              className="w-full py-2 text-gray-500 bg-gray-100 border-b-2 border-gray-300"
            />
          </div>

          {/* Mobile Number */}
          <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-1">Mobile Number</label>
            <input
              type="text"
              value={mobile}
              onChange={(e) => {
                setMobile(e.target.value);
                setIsEditing(true);
              }}
              disabled={!isEditing}
              placeholder="Add mobile number"
              className={`w-full py-2 outline-none border-b-2 ${
                isEditing 
                  ? 'border-blue-500' 
                  : 'border-gray-300'
              }`}
            />
          </div>

          {/* Location */}
          <div className="mb-6">
            <label className="block text-sm text-gray-600 mb-1">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                setIsEditing(true);
              }}
              disabled={!isEditing}
              placeholder="Add location"
              className={`w-full py-2 outline-none border-b-2 ${
                isEditing 
                  ? 'border-blue-500' 
                  : 'border-gray-300'
              }`}
            />
          </div>

          {/* Save Button */}
          {isEditing && (
            <motion.button 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
              onClick={handleSaveChanges}
            >
              <FaSave className="mr-2" /> Save Changes
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};