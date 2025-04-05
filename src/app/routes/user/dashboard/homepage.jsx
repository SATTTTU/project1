import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../../store/cart/cart";
import { Header } from "@/modules/user/dashboard/components/header";
import { Footer } from "@/modules/user/dashboard/components/footer";
import { PopularCooks } from "@/modules/user/dashboard/components/popularCooks";
import { UserLocation } from "@/modules/user/dashboard/components/setLocation";
import { PopularItemsPage } from "@/modules/user/dashboard/components/popularItemsSection";
import { DashSlider } from "@/modules/user/dashboard/components/dashboardSlider";
import LocationMap from "@/components/ui/locationMap/locationmap";
import { usegetLocation } from "@/modules/user/dashboard/api/get-location";
import { AllDishes } from "@/modules/user/dashboard/components/allDishes";

export const Homepage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [addedToCart, setAddedToCart] = useState(null);
  const { mutateAsync: fetchLocation } = usegetLocation();

  useEffect(() => {
    if (addedToCart) {
      const timer = setTimeout(() => {
        setAddedToCart(null);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [addedToCart]);

  const handleAddToCart = (item) => {
    dispatch(
      addToCart({
        productId: item.productId,
        quantity: 1,
        name: item.name,
        price: item.price,
        img: item.img,
      })
    );
    setAddedToCart(item.productId);
  };

  return (
    <>
    <div className="min-h-screen bg-gray-50 w-full ">
      <Header navigate={navigate} handleAddToCart={handleAddToCart} />
      
      <div className="mt-10 lg:mt-16 md:mt-16">
        <DashSlider />
      </div>

      <main className="container mx-auto px-4 md:px-6 lg:px-8 py-6">
        <section className="mb-8">
          <AllDishes />

          <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
            <PopularItemsPage handleAddToCart={handleAddToCart} addedToCart={addedToCart} />
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
            <PopularCooks />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg mb-8 flex flex-col gap-6">
            <h3 className="text-2xl font-semibold text-gray-800 text-center md:text-left">
              Set Your Location
            </h3>
            <UserLocation />
            <div className="h-72 w-full rounded-lg overflow-hidden shadow-md">
              <LocationMap fetchLocationFn={fetchLocation} title="Your Location" />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  </>
  );
};
