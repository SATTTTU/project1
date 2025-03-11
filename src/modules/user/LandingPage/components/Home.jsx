import { Header } from "../components/Header";
import MainImage from "../../../../assets/Main.jpg";

export const Home = () => {
  const heroSlide = {
    title: "Premium Cloud Kitchen Services",
    subtitle: "Delicious, chef-crafted meals delivered straight to your door.",
    image: MainImage,
    buttonText: "Explore Our Menu",
  };

  return (
    <header className="relative w-full h-screen overflow-hidden">
      <div className="absolute top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4">
          <Header />
        </div>
      </div>

      <div className="relative w-full h-full flex items-center justify-center bg-black/50">
        <img
          src={heroSlide.image || "/placeholder.svg"}
          alt={heroSlide.title}
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        <div className="relative z-10 text-center text-white space-x-8">
         
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition-colors">
              Cook
            </button>
            <button className="bg-gray-500 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-md transition-colors">
              User
            </button>
          </div>
        </div>
    </header>
  );
};
