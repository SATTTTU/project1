import React, { useState } from 'react';
import { Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { usePasswordForm } from '../formik/usePasswordFormik';

const AccountSettings = () => {
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const { formik, isSubmitting } = usePasswordForm();

  const toggleShowPassword = (field) => {
    setShowPassword({
      ...showPassword,
      [field]: !showPassword[field]
    });
  };

  const handleCancelPassword = () => {
    setIsChangingPassword(false);
    formik.resetForm();
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Account Settings</h2>

      <div className="space-y-6">
        {/* Password Settings */}
        <div>
          <div className="flex items-center mb-4">
            <Lock className="h-5 w-5 text-blue-600 mr-2" />
            <h3 className="font-medium text-gray-800">Password</h3>
          </div>

          {isChangingPassword ? (
            <div>
              {/* Current Password */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword.current ? "text" : "password"}
                    name="currentPassword"
                    value={formik.values.currentPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full p-2 border rounded-md pr-10"
                    placeholder="Enter current password"
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={() => toggleShowPassword('current')}
                  >
                    {showPassword.current ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {formik.touched.currentPassword && formik.errors.currentPassword && (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.currentPassword}</p>
                )}
              </div>

              {/* New Password */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword.new ? "text" : "password"}
                    name="newPassword"
                    value={formik.values.newPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full p-2 border rounded-md pr-10"
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={() => toggleShowPassword('new')}
                  >
                    {showPassword.new ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {formik.touched.newPassword && formik.errors.newPassword && (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.newPassword}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword.confirm ? "text" : "password"}
                    name="confirmPassword"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full p-2 border rounded-md pr-10"
                    placeholder="Confirm new password"
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={() => toggleShowPassword('confirm')}
                  >
                    {showPassword.confirm ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.confirmPassword}</p>
                )}
              </div>

              <div className="flex space-x-2">
                <button
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                  onClick={handleCancelPassword}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                  onClick={() => {
                    formik.handleSubmit();
                    if (Object.keys(formik.errors).length === 0 && formik.dirty) {
                      // Only close if validation passes and form is dirty
                      setIsChangingPassword(false);
                    }
                  }}
                  disabled={isSubmitting}
                >
                  {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  Update Password
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <p className="text-gray-700">••••••••</p>
              <button
                className="text-blue-600 hover:text-blue-800"
                onClick={() => setIsChangingPassword(true)}
              >
                Change Password
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
