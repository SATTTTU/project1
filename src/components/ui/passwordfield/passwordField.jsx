
import { FaEye } from "react-icons/fa";
import { IoEyeOffSharp } from "react-icons/io5";

export const PasswordInput = ({ 
  label,
  value, 
  onChange, 
  name,
  showPassword, 
  toggleShowPassword,
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-900 mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          value={value}
          name={name}
          onChange={onChange}
          className="w-full px-3 py-2 border rounded-md focus:ring-green-500 focus:border-green-500"
        />
        <button
          type="button"
          onClick={toggleShowPassword}
          className="absolute right-5 top-1/2 -translate-y-1/2"
        >
          {showPassword ? <IoEyeOffSharp /> : <FaEye />}
        </button>
      </div>
    </div>
  );
};