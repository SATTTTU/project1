import { FaChevronDown } from "react-icons/fa";

const Select = ({ options, value, onChange, className = "" }) => {
  return (
    <div className={`relative w-full ${className}`}>
      <select
        value={value}
        onChange={onChange}
        className=" p-3 border rounded-md w-full pr-8 pl-3 appearance-none"
      >
        {options.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      <FaChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
    </div>
  );
};

export default Select;
