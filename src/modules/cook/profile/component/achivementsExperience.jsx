import React from "react";
import { FaAward, FaTrash } from "react-icons/fa";

const AchievementsExperience = ({ userData }) => {
  return (
    <div className="mb-8 rounded-lg bg-white p-6 shadow-sm">
      <h3 className="text-lg font-medium flex items-center">
        <FaAward className="mr-2 text-[#426B1F]" /> Achievements & Experience
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
  );
};

export default AchievementsExperience;
