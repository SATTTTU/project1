import React from "react";

const ConfirmModal = ({ 
  title = "Are you sure?", 
  message = "This action cannot be undone.", 
  confirmLabel = "Confirm", 
  cancelLabel = "Cancel", 
  onCancel, 
  onConfirm, 
  confirmColor = "bg-red-600 hover:bg-red-700" // Default to red for deletions
}) => (
  <div className="fixed inset-0 bg-white  bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 max-w-md w-full">
      <h3 className="text-lg font-bold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600 mb-6">{message}</p>
      <div className="flex justify-end space-x-3">
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-100 text-gray-700 cursor-pointer rounded-md hover:bg-gray-200"
        >
          {cancelLabel}
        </button>
        <button
          onClick={onConfirm}
          className={`px-4 py-2 text-white cursor-pointer rounded-md ${confirmColor}`}
        >
          {confirmLabel}
        </button>
      </div>
    </div>
  </div>
);

export default ConfirmModal;
