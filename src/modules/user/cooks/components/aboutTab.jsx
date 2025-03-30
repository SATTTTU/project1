import { FiArrowLeft, FiStar, FiPhone, FiMail, FiMapPin, FiClock } from "react-icons/fi"

export const AboutTab = ({ cook }) => {
  console.log("About", cook)
    return (
      <div>
        <h2 className="text-xl font-bold mb-4">About {cook.name}</h2>
  
        <div className="bg-white rounded-lg shadow-md p-6">
        <span className="font-bold text-lg mb-3">Status</span>

          <span className="text-gray-700  mb-10"> {cook.available_status
}</span>
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-lg mb-3">Contact Information</h3>
              <ul className="space-y-3">
                {/* <li className="flex items-center">
                  <FiMapPin className="text-green-600 mr-3" />
                  <span>{cook.location}</span>
                </li> */}
            
                <li className="flex items-center">
                  <FiMail className="text-green-600 mr-3" />
                  <span>{cook.email}</span>
                </li>
              </ul>
            </div>
  
            <div>
              <h3 className="font-bold text-lg mb-3">Working Hours</h3>
              <p className="flex items-center">
                <FiClock className="text-green-600 mr-3" />
                <span>{cook.workingHours}</span>
              </p>
  
              {/* <h3 className="font-bold text-lg mt-6 mb-3">Specialties</h3>
              <div className="flex flex-wrap gap-2">
                {cook.specialties?.map((specialty, index) => (
                  <span key={index} className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                    {specialty}
                  </span>
                ))}
              </div> */}
            </div>
          </div>
        </div>
      </div>
    )
  }