import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../../store/cart/cart";
import { Header } from "@/modules/user/Homepage/component/header";
import { Footer } from "@/modules/user/Homepage/component/footer";
import { SearchBar } from "@/modules/user/Homepage/component/searchBar";
import { PromotedRestaurants } from "@/modules/user/Homepage/component/filterBadges";
import { CategorySection } from "@/modules/user/Homepage/component/categoriesSection";
import { PopularItems } from "@/modules/user/Homepage/component/popularItemsSection";
import {
	categories,
	cooks,
	popularItems,
} from "../../../../modules/user/Homepage/component/data";
import { FilterBadges } from "@/modules/user/Homepage/component/filterBadges";
import { PopularCooks } from "@/modules/user/Homepage/component/popularCooks";
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

    // Set animation state
    setAddedToCart(item.productId);

    // Show success notification
    toast.success(`${item.name} added to cart!`, {
      position: "bottom-right",
      autoClose: 2000,
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="container px-4 py-6 mx-auto">
        <section className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Up to -40% deals</h2>
            <SearchBar 
              navigate={navigate}
              popularItems={popularItems}
              categories={categories}
              cooks={cooks}
              handleAddToCart={handleAddToCart}
            />
          </div>

          <FilterBadges />
          <PromotedRestaurants />
        </section>

        <CategorySection categories={categories} />
        <PopularCooks cooks={cooks} />
        <PopularItems 
          popularItems={popularItems} 
          handleAddToCart={handleAddToCart} 
          addedToCart={addedToCart}
        />
        
        <Footer />
      </main>
    </div>
  );
};