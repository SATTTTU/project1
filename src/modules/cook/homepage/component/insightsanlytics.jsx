import React from "react";
import PopularItems from "./popularitem";
import WeeklyPerformance from "./weekelyperformance";
import CustomerFeedback from "./customerfeedback";
import TipsSection from "./tipssection";

const InsightsAnalytics = ({ foodItems }) => {
  return (
    <>
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Performance Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PopularItems foodItems={foodItems} />
          <WeeklyPerformance />
          <CustomerFeedback />
          <TipsSection />
        </div>
      </div>
    </>
  );
};

export default InsightsAnalytics;
