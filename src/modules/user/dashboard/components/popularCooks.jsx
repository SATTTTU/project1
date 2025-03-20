import {
	FiStar,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { usePopularCooks } from "../api/getAllCooks";

export const PopularCooks = () => {
  const { data: popularCooks } = usePopularCooks();
    return (
      <section className="p-6 mb-12 rounded-lg bg-white">
        <h2 className="mb-6 text-2xl font-bold text-center text-green-600">Popular Cooks</h2>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4 lg:grid-cols-5">
          {popularCooks?.map((cook, index) => (
            <Link
              to={`/cook/${cook.id}`}
              key={index}
              className="flex flex-col items-center border border-slate-300 p-4 transition-transform transform bg-blue rounded-sm w-40 md:w-50 shadow-md hover:scale-105 hover:shadow-xl"
            >
              <div className="relative mb-3 overflow-hidden w-40 h-40 md:w-50 md:h-50">
                <img 
                  src={cook.img_url} 
                  alt={cook.name} 
                  className="w-full h-full object-cover rounded-full" 
                />
              </div>
              <span className="text-sm font-medium text-gray-800 sm:text-base">{cook.name}</span>
              <span className="text-sm font-medium text-gray-800 sm:text-base">{cook.phone}</span>
              
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