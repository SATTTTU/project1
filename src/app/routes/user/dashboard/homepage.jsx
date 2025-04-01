import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../../store/cart/cart";
import { Header } from "@/modules/user/dashboard/components/header";
import { Footer } from "@/modules/user/dashboard/components/footer";
import { SearchBar } from "@/modules/user/dashboard/components/searchBar";
import {
  categories,
  cooks,
  popularItems,
} from "@/modules/user/dashboard/components/data";
import { PopularCooks } from "@/modules/user/dashboard/components/popularCooks";
import { PromotedRestaurants } from "@/modules/user/dashboard/components/filterBadges";
import UserLocation from "@/modules/user/dashboard/components/setLocation";
import { PopularItemsPage } from "@/modules/user/dashboard/components/popularItemsSection";
import { DashSlider } from "@/modules/user/dashboard/components/dashboardSlider";
import LocationMap from "@/components/ui/locationMap/locationmap";
import { usegetLocation } from "@/modules/user/dashboard/api/get-location";

export const Homepage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [addedToCart, setAddedToCart] = useState(null);
  const { mutateAsync: fetchLocation} = usegetLocation();

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
    <div className="min-h-screen w-screen bg-gray-50">
      <Header
        navigate={navigate}
        popularItems={popularItems}
        categories={categories}
        cooks={cooks}
        handleAddToCart={handleAddToCart}
      />

      <main className="container mx-auto ">
        <section className="mb-8 ">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <DashSlider />
          </div>

          <PopularCooks cooks={cooks} />

          <div className="bg-white shadow-md overflow-hidden p-6 mb-8">
            <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
              Popular Items
            </h2>
            <PopularItemsPage
              popularItems={popularItems}
              handleAddToCart={handleAddToCart}
              addedToCart={addedToCart}
            />
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md mb-8">
            <h3 className="text-2xl font-medium mb-4 text-gray-800">
              Set Your Location
            </h3>
            <UserLocation />
            <LocationMap fetchLocationFn={fetchLocation} title="your location" />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
