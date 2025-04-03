import { useState, useEffect } from "react";
import { useSetNotification } from "../api/set-notification"; // Import API function

export const NotificationPrompt = ({ userId, token }) => {
  const [showPrompt, setShowPrompt] = useState(false);
  const { mutateAsync, isLoading, isSuccess, isError, error } = useSetNotification();

  useEffect(() => {
    // Check if user has already made a choice
    const notificationPref = localStorage.getItem("notificationPreference");
    if (!notificationPref) {
      setShowPrompt(true); // Show pop-up only if not set
    }
  }, []);

  const handleAllow = async () => {
    try {
      await mutateAsync({ userId, token }); // Send data to API
      localStorage.setItem("notificationPreference", "allowed"); // Store preference
      setShowPrompt(false);
    } catch (err) {
      console.error("Failed to store notification token:", err);
    }
  };

  const handleDeny = () => {
    localStorage.setItem("notificationPreference", "denied"); // Store preference
    setShowPrompt(false);
  };

  if (!showPrompt) return null; // Hide pop-up if preference is set

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold">Enable Notifications</h2>
        <p>Would you like to receive notifications?</p>
        {isLoading && <p>Processing...</p>}
        {isSuccess && <p className="text-green-500">Notification enabled!</p>}
        {isError && <p className="text-red-500">{error?.message || "Error occurred"}</p>}
        <div className="flex justify-end space-x-4 mt-4">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={handleDeny}
          >
            Deny
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleAllow}
          >
            Allow
          </button>
        </div>
      </div>
    </div>
  );
};
