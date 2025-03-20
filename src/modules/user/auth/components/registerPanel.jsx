import { Link } from "react-router-dom";

export const WelcomeRegisterPanel = ({ image }) => {
  return (
    <div className="hidden md:flex relative w-1/2">
      <img
        src={image}
        alt="User Login"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white bg-opacity-50 p-12">
        <h2 className="text-4xl font-bold mb-4">Welcome, Friends</h2>
        <p className="text-center text-xl mb-2">
          To keep connected with us please{" "}
        </p>
        <p className="text-center text-xl mb-8">
          {" "}
          login with your personal info
        </p>
        <Link
          to="/user/login"
          className="bg-white hover:bg-[#426B1F] text-black hover:text-white px-8 text-xl py-3 rounded transition"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
};