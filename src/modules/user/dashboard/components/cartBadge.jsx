import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useUserCart } from "../../cart/api/getItems";

export const CartBadge = () => {
	const { data: cart } = useUserCart();
  

  const itemCount = cart?.[0]?.items?.length||0 ;
	return (
		<Link
			to="/cart"
			className="relative p-1 hover:bg-gray-100 rounded-full transition-colors"
		>
			<AiOutlineShoppingCart className="text-3xl text-[#426B1F]" />
			{itemCount > 0 && (
				<span
					className={`absolute -top-2 -right-2 bg-red-500 text-white text-xs min-w-[20px] h-[20px] flex items-center justify-center rounded-full transition-transform duration-300
       
          `}
				>
					{itemCount}
				</span>
			)}
		</Link>
	);
};
