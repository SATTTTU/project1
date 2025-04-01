import { AppRouter } from "./router";
import { AppProvider } from "./provider";
import { CartProvider } from "@/hooks/context/cart-context";

export const App = () => {
	return (
		<AppProvider>
			<CartProvider>
				<AppRouter />
			</CartProvider>
		</AppProvider>
	);
};
