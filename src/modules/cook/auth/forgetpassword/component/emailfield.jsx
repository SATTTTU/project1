import React from "react";

const EmailField = ({
  name,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
}) => {
  return (
    <>
      <input
        type="email"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-teal-500 transition-colors"
        required
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </>
  );
};

export default EmailField;