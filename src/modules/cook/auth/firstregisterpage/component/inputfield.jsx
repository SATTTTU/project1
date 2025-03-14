// components/inputfield.jsx
import React from "react";

const InputField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  onFocus,
  onBlur,
  placeholder,
  error
}) => {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm text-gray-600">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`w-full rounded border ${
          error ? "border-red-500" : "border-gray-300"
        } px-4 py-3 focus:border-[#4b6c1e] focus:outline-none`}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default InputField;