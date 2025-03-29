// import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";

import Logo from "../../../../assets/logo.jpg";
import { Profile } from "../../dashboard/components/profile";

export const Header = () => {
    const carts = useSelector((store) => store.cart.items);
    

    const getTotalCartItems = () => {
        return carts.reduce((total, item) => total + item.quantity, 0);
    };
    return (
        <>
            <div className="bg-white shadow-sm sticky top-0 z-50">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex items-center justify-between">
                        <Link to="/user/dashboard" className="flex items-center">
                            <img
                                src={Logo}
                                alt="KhanaBox"
                                className="h-12 w-12"
                            />
                            <span className="text-3xl font-bold text-green-600">KhajaBox</span>
                        </Link>

                        <div className="flex items-center space-x-4">
                       

                            <Link to="/user/cart" className="relative">
                                <AiOutlineShoppingCart className="text-2xl" />
                                {getTotalCartItems() > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                        {getTotalCartItems()}
                                    </span>
                                )}
                            </Link>
                            <Profile/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
