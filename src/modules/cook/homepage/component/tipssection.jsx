import React from "react";

const TipsSection = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="font-medium mb-3">Tips to Increase Orders</h3>
      <ul className="space-y-2 text-sm">
        <li className="flex items-start">
          <span className="text-green-500 mr-2">•</span>
          <p>Consider offering weekend special dishes</p>
        </li>
        <li className="flex items-start">
          <span className="text-green-500 mr-2">•</span>
          <p>Your Butter Chicken is popular - add complementary sides</p>
        </li>
        <li className="flex items-start">
          <span className="text-green-500 mr-2">•</span>
          <p>Peak order times are 6-8 PM - ensure availability</p>
        </li>
        <li className="flex items-start">
          <span className="text-green-500 mr-2">•</span>
          <p>Consider adding a combo meal option</p>
        </li>
      </ul>
    </div>
  );
};

export default TipsSection;
