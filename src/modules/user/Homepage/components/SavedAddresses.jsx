import { MapPin, Plus } from "lucide-react"

export const SavedAddresses=()=> {
  const addresses = [
    { id: 1, type: "Home", address: "123 Main Street, Apartment 4B, Kathmandu", isDefault: true },
    { id: 2, type: "Work", address: "456 Office Park, Building 7, Floor 3, Kathmandu", isDefault: false },
  ]

  return (
    <div className="max-w-3xl">
      <h2 className="text-2xl font-semibold mb-6">Saved Addresses</h2>

      <div className="space-y-4">
        {addresses.map((address) => (
          <div key={address.id} className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
            <div className="flex justify-between">
              <div className="flex items-start gap-3">
                <MapPin className="text-gray-500 mt-1" size={20} />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{address.type}</h3>
                    {address.isDefault && (
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded">Default</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{address.address}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="text-sm text-blue-600 hover:underline">Edit</button>
                <button className="text-sm text-red-600 hover:underline">Delete</button>
              </div>
            </div>
          </div>
        ))}

        <button className="flex items-center gap-2 border border-dashed rounded-lg p-4 w-full justify-center text-gray-500 hover:text-gray-700 hover:border-gray-400 transition-colors">
          <Plus size={18} />
          <span>Add New Address</span>
        </button>
      </div>
    </div>
  )
}

