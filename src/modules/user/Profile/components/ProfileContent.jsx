// tabs/ProfileContent.jsx
const ProfileContent = () => {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-6">Your Profile</h2>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-medium mb-4">Personal Information</h3>
  
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  defaultValue="John Doe"
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
  
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  defaultValue="john.doe@example.com"
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
  
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  defaultValue="+44 123 456 7890"
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
  
            <button className="mt-6 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
              Save Changes
            </button>
          </div>
  
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-medium mb-4">Address Information</h3>
  
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 1</label>
                <input
                  type="text"
                  defaultValue="123 Main Street"
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
  
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 2</label>
                <input
                  type="text"
                  defaultValue="Apt 4B"
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
  
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    defaultValue="London"
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
  
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                  <input
                    type="text"
                    defaultValue="SW1A 1AA"
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
  
            <button className="mt-6 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
              Save Address
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default ProfileContent;