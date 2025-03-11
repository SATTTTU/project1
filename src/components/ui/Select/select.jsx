// Select.js
const Select = ({ options, value, onChange, className = "" }) => {
    return (
      <select
        value={value}
        onChange={onChange}
        className={`border p-2 rounded-md w-full ${className}`}
      >
        {options.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    );
  };
  
  export default Select;