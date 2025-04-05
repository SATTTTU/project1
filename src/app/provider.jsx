import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { queryConfig } from "../lib/react-query";
import { Provider } from "react-redux";
import { store } from "@/store/cart/index";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "@/hooks/context/useAuth";
import 'react-toastify/dist/ReactToastify.css';

// import NotificationProvider from "./notification-provider";
// import { CartProvider } from "@/hooks/context/cart-context";

export const AppProvider = ({ children }) => {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: queryConfig,
			})
	);

	return (
		<AuthProvider>
			<QueryClientProvider client={queryClient}>
				{/* <CartProvider> */}
				{/* <NotificationProvider> */}
					<Provider store={store}>{children}</Provider>
				{/* </NotificationProvider> */}
				<ToastContainer autoClose={1500} />
				{/* </CartProvider> */}
			</QueryClientProvider>
		</AuthProvider>
	);
};
