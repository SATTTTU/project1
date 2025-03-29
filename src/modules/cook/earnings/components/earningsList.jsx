// src/components/EarningsList.jsx
import React from "react";
import { useAllEarnings } from "../api/getAllEarnings";

const EarningsList = () => {
  const { data, isLoading, error } = useAllEarnings();
  console.log("Earnings****", data);

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center">Error fetching earnings: {error.message}</div>;
  }

  
  if (!data) {
    return <div className="text-center">No earnings data available</div>;
  }

  return (
    <div className="mb-6 text-center">
      <h2 className="font-bold text-2xl text-[#426B1F]">Total Earnings</h2>
      <div>
        <strong>Total Balance: </strong>
        ${data.total_balance}
      </div>
    </div>
  );
};

export default EarningsList;
