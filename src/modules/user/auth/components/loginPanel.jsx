import { Link } from "react-router-dom";

export const WelcomePanel = ({ image }) => {
  return (
    <div className="hidden md:flex w-1/2 relative">
      <img src={image} alt="Welcome" className="object-cover w-full h-full" />
      <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white p-6">
        <h2 className="text-4xl font-bold mb-4">Hello, Friends</h2>
        <p className="text-center text-xl mb-2">Enter your Personal Details</p>
        <p className="text-center text-xl mb-4">Start journey with us</p>

        <Link
          to="/user/register"
          className="bg-white text-black px-6 py-3 text-xl rounded hover:text-white hover:bg-[#426B1F] transition"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};