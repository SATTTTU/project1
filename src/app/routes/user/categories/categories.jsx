import React from 'react';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../../../store/cart/cart";
import {
	categoriesData,
	allFoodItems,
} from "@/modules/user/categories/components/data";
import { Navbar } from "@/modules/user/categories/components/navbar";
import BackButton from "@/modules/user/categories/components/button";
import { FilterBar } from "@/modules/user/categories/components/filterBar";
import { CategoryHeader } from "@/modules/user/categories/components/categoryHeader";
import FilterPanel from "@/modules/user/categories/components/filterPanel";
import ItemsGrid from "@/modules/user/categories/components/itemsGrid";
import EmptyState from "@/modules/user/categories/components/emptyState";

export const CategoryPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [category, setCategory] = useState(null);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 20]);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [sortOption, setSortOption] = useState("recommended");
  const [addedToCart, setAddedToCart] = useState(null);

  useEffect(() => {
    const categoryData = categoriesData.find((c) => c.id === Number.parseInt(id));
    if (categoryData) {
      setCategory(categoryData);

      const categoryItems = allFoodItems.filter(
        (item) => item.category.toLowerCase() === categoryData.name.toLowerCase()
      );
      setItems(categoryItems);
      setFilteredItems(categoryItems);
    }

    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (!items.length) return;

    let result = [...items];

    result = result.filter((item) => {
      const price = Number.parseFloat(item.price);
      return price >= priceRange[0] && price <= priceRange[1];
    });

    if (ratingFilter > 0) {
      result = result.filter((item) => item.rating >= ratingFilter);
    }

    switch (sortOption) {
      case "price-low-high":
        result.sort((a, b) => Number.parseFloat(a.price) - Number.parseFloat(b.price));
        break;
      case "price-high-low":
        result.sort((a, b) => Number.parseFloat(b.price) - Number.parseFloat(a.price));
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    setFilteredItems(result);
  }, [items, priceRange, ratingFilter, sortOption]);

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
        productId: item.id,
        quantity: 1,
        name: item.name,
        price: item.price,
        img: item.img,
      })
    );

    setAddedToCart(item.id);

    toast.success(`${item.name} added to cart!`, {
      position: "bottom-right",
      autoClose: 2000,
    });
  };

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="animate-pulse">
            <div className="h-32 bg-gray-200 rounded-lg mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar/>

      <main className="container mx-auto px-4 py-6">
        <BackButton/>
        
        <CategoryHeader category={category} />
        
        <FilterBar
          isFilterOpen={isFilterOpen}
          setIsFilterOpen={setIsFilterOpen}
          sortOption={sortOption}
          setSortOption={setSortOption}
        />

        {isFilterOpen && (
          <FilterPanel
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            ratingFilter={ratingFilter}
            setRatingFilter={setRatingFilter}
          />
        )}

        <div className="mb-6">
          <p className="text-gray-600">
            {filteredItems.length} {filteredItems.length === 1 ? "item" : "items"} found
          </p>
        </div>

        {filteredItems.length > 0 ? (
          <ItemsGrid
            items={filteredItems} 
            handleAddToCart={handleAddToCart} 
            addedToCart={addedToCart} 
          />
        ) : (
          <EmptyState />
        )}
      </main>
    </div>
  );
};