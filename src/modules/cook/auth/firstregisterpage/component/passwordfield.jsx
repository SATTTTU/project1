// components/passwordfield.jsx
import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const PasswordField = ({
  label,
  name,
  value,
  onChange,
  onFocus,
  onBlur,
  placeholder,
  error
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm text-gray-600">
        {label}
      </label>
      <div className="relative">
        <input
          id={name}
          name={name}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          className={`w-full rounded border ${
            error ? "border-red-500" : "border-gray-300"
          } px-4 py-3 focus:border-[#4b6c1e] focus:outline-none`}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 transition ease-in-out"
        >
          {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
        </button>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default PasswordField;