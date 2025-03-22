import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../../store/cart/cart";
import { Header } from "@/modules/user/dashboard/components/header";
import { Footer } from "@/modules/user/dashboard/components/footer";
import { SearchBar } from "@/modules/user/dashboard/components/searchBar";
import { categories, cooks, popularItems } from "@/modules/user/dashboard/components/data";
import { PopularCooks } from "@/modules/user/dashboard/components/popularCooks";
import { CategorySection } from "@/modules/user/dashboard/components/categoriesSection";
import { PromotedRestaurants } from "@/modules/user/dashboard/components/filterBadges";
import { PopularItems } from "@/modules/user/dashboard/components/popularItemsSection";
import UserLocation from "@/modules/user/dashboard/components/setLocation";

export const Homepage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [addedToCart, setAddedToCart] = useState(null);

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
      }),
    );
    
    setAddedToCart(item.productId);
    
   
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="container px-4 py-6 mx-auto">
        <section className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Up to -40% dealss</h2>
            <SearchBar 
              navigate={navigate}
              popularItems={popularItems}
              categories={categories}
              cooks={cooks}
              handleAddToCart={handleAddToCart}
            />
          </div>
          <PromotedRestaurants/>
        </section>
        <CategorySection categories={categories}/>
        <PopularCooks cooks={cooks} />
        <PopularItems
          popularItems={popularItems}
          handleAddToCart={handleAddToCart}
          addedToCart={addedToCart}
        />
        <UserLocation />
                
        <Footer />
      </main>
    </div>
  );
};