export const InputField = ({ label, name, type, value, onChange, onBlur, error }) => (
    <div>
      <label className="block text-sm  text-gray-600 mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
        placeholder={label}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );