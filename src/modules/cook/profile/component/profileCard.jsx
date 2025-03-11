import React from "react";
import { FaCamera } from "react-icons/fa";

const ProfileCard = ({ userData }) => {
  return (
    <div className="mb-8 rounded-lg bg-white p-6 shadow-sm">
      <div className="flex flex-col md:flex-row gap-6">
        <ProfileImage userData={userData} />
        <ProfileInfo userData={userData} />
      </div>
    </div>
  );
};

const ProfileImage = ({ userData }) => {
  return (
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
            <span className="ml-1 font-medium">{userData.rating}</span>
          </div>
          <span className="mx-2 text-gray-300">•</span>
          <span className="text-sm text-gray-500">
            {userData.totalOrders} orders
          </span>
        </div>
      </div>
    </div>
  );
};

const ProfileInfo = ({ userData }) => {
  return (
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
        <label className="block text-sm font-medium text-gray-500">Bio</label>
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
  );
};

export default ProfileCard;
