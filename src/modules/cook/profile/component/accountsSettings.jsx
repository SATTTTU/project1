import React from "react";

const AccountSettings = () => {
  return (
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
            <input type="checkbox" defaultChecked className="peer sr-only" />
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
  );
};

export default AccountSettings;
