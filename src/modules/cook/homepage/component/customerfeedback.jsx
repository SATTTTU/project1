import React from "react";

const CustomerFeedback = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="font-medium mb-3">Recent Customer Feedback</h3>
      <div className="space-y-3">
        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="flex justify-between">
            <p className="font-medium">Priya Patel</p>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className="text-yellow-400">
                  ★
                </span>
              ))}
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            "The paneer tikka was delicious! Will order again."
          </p>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="flex justify-between">
            <p className="font-medium">Rahul Sharma</p>
            <div className="flex">
              {[1, 2, 3, 4].map((star) => (
                <span key={star} className="text-yellow-400">
                  ★
                </span>
              ))}
              <span className="text-gray-300">★</span>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            "Butter chicken was good but could be a bit more spicy."
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomerFeedback;
