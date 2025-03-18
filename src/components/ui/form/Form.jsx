export const FormLayout = ({ children }) => {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md border border-slate-300 p-6">
          {children}
        </div>
      </div>
    );
  };