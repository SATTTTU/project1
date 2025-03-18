import {
	FiStar,
} from "react-icons/fi";
import { Link } from "react-router-dom";

export const PopularCooks = ({ cooks }) => {
    return (
      <section className="p-6 mb-12 rounded-lg bg-white">
        <h2 className="mb-6 text-2xl font-bold text-center text-green-600">Popular Cooks</h2>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4 lg:grid-cols-5">
          {cooks.map((cook, index) => (
            <Link
              to={`/cook/${cook.id}`}
              key={index}
              className="flex flex-col items-center p-4 transition-transform transform bg-blue rounded-sm w-40 md:w-50 shadow-md hover:scale-105 hover:shadow-lg"
            >
              <div className="relative mb-3 overflow-hidden w-40 h-40 md:w-50 md:h-50">
                <img 
                  src={cook.img || "/placeholder.svg"} 
                  alt={cook.name} 
                  className="w-full h-full object-cover rounded-full" 
                />
              </div>
              <span className="text-sm font-medium text-gray-800 sm:text-base">{cook.name}</span>
              
              <div className="flex items-center text-yellow-500 mr-2">
								<FiStar className="fill-current" />
								<span className="ml-1 font-medium">{cook.rating}</span>
							</div>
            </Link>
          ))}
        </div>
      </section>
    );
  };