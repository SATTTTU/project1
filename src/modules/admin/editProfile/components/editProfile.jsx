import React, { useState } from "react";

export const MyProfile = () => {
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
    setIsEditing(false);
    // Here you would typically save the changes to a backend
  };

  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden">
      {/* Top Section with Background and Profile Photo */}
      <div 
        className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600"
      >
        {/* Overlay gradient for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        {/* Edit Profile Button */}
        {!isEditing && (
          <button 
            onClick={() => setIsEditing(true)} 
            className="absolute top-4 right-4 bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-full shadow-md transition-all duration-300 flex items-center space-x-2 z-10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            <span className="font-medium text-sm">Edit Profile</span>
          </button>
        )}
      </div>

      {/* Profile Picture - Positioned to overlap the background and content sections */}
      <div className="relative -mt-16 px-6 flex justify-center">
        <div className="relative">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white bg-white shadow-lg">
            <img src={image} alt="Profile" className="w-full h-full object-cover" />
          </div>
          <label 
            htmlFor="profile-pic" 
            className="absolute bottom-1 right-1 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow cursor-pointer transition-all duration-200 transform hover:scale-105"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>
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

      {/* User Name and Email */}
      <div className="text-center pt-2 pb-4">
        <h3 className="text-2xl font-bold text-gray-800">{name}</h3>
        <p className="text-sm text-gray-500">{email}</p>
      </div>

      {/* Profile Content */}
      <div className="p-6">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <div className={`relative rounded-lg border ${isEditing ? 'border-blue-300 shadow-sm' : 'border-gray-300'}`}>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={!isEditing}
                className={`w-full px-4 py-3 rounded-lg focus:outline-none ${
                  isEditing 
                    ? 'bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500' 
                    : 'bg-gray-50 text-gray-700'
                }`}
              />
              {isEditing && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <div className="relative rounded-lg border border-gray-300">
              <input
                type="email"
                value={email}
                disabled
                className="w-full px-4 py-3 rounded-lg bg-gray-50 text-gray-700"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <span className="px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded">Verified</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
            <div className={`relative rounded-lg border ${isEditing ? 'border-blue-300 shadow-sm' : 'border-gray-300'}`}>
              <input
                type="text"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                disabled={!isEditing}
                placeholder={isEditing ? "Enter your mobile number" : mobile ? mobile : "Not provided"}
                className={`w-full px-4 py-3 rounded-lg focus:outline-none ${
                  isEditing 
                    ? 'bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500' 
                    : 'bg-gray-50 text-gray-700'
                }`}
              />
              {isEditing && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <div className={`relative rounded-lg border ${isEditing ? 'border-blue-300 shadow-sm' : 'border-gray-300'}`}>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                disabled={!isEditing}
                placeholder={isEditing ? "Enter your location" : location ? location : "Not provided"}
                className={`w-full px-4 py-3 rounded-lg focus:outline-none ${
                  isEditing 
                    ? 'bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500' 
                    : 'bg-gray-50 text-gray-700'
                }`}
              />
              {isEditing && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
          </div>

          {isEditing && (
            <div className="pt-4 flex space-x-3">
              <button
                className="flex-1 bg-white border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
              <button
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-200 font-medium flex items-center justify-center"
                onClick={handleSaveChanges}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
