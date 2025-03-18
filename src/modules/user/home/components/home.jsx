import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import MainImage from "../../../../assets/Main.jpg";
import Logo from "../../../../assets/logo.jpg";

export const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  const heroSlide = {
    image: MainImage,
  };

  return (
    <header className="relative w-full h-screen overflow-hidden">
      <nav className="absolute top-0 left-0 right-0 z-50  shadow-md py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <img src={Logo} alt="logo" className="lg:w-10 w-10 mr-2" />
            <span className=" text-2xl lg:text-[#426B1F] text-white md:text-3xl font-bold">KhajaBox</span>
          </Link>

          <ul className="hidden md:flex space-x-6 text-[#426B1F] text-lg font-medium">
            <li><Link to="/" className="text-white text-2xl">Home</Link></li>
          </ul>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white text-2xl">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-md py-4">
            <ul className="flex flex-col items-center space-y-4 text-lg font-medium">
              <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
              <li><Link to="/cook/login" onClick={() => setIsOpen(false)}>Cook</Link></li>
              <li><Link to="/user/login" onClick={() => setIsOpen(false)}>User</Link></li>
            </ul>
          </div>
        )}
      </nav>

      <div className="relative w-full h-full flex items-center justify-center bg-black/50">
        <img
          src={heroSlide.image}
          alt={heroSlide.title}
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        <div className="relative z-10 text-center text-white space-x-8">
          <Link to="/cook/login">
            <button className="bg-[#426B1F] text-white font-medium text-2xl py-6 px-8 rounded-md transition-colors">
              Cook
            </button>
          </Link>
          <Link to="/user/login">
            <button className="bg-[#426B1F] text-white font-medium text-2xl py-6 px-8 rounded-md transition-colors">
              User
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};
