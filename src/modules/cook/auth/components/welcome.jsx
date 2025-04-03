import { Link } from "react-router-dom";
import authimage from "../../../../assets/login.jpg";
export const WelcomePanel = () => {
  return (
    <div className="hidden md:flex w-1/2 relative">
      <img src={authimage} alt="Welcome" className="object-cover w-full h-full" />
      <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white p-6">
        <h2 className="text-4xl font-bold mb-4">Hello, Friends</h2>
        <p className="text-center  mb-2">Enter your Personal Details</p>
        <p className="text-center  mb-4">Start journey with us</p>

        <Link
          to="/cook/login"
          className="bg-white text-black px-6 py-2 text-xl rounded hover:text-white hover:bg-[#426B1F] transition"
        >
          Login
        </Link>
      </div>
    </div>
  );
};