import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { queryConfig } from "../lib/react-query";
import { Provider } from "react-redux";
import { store } from "@/store/cart/index";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "@/hooks/context/useAuth";
import "react-toastify/dist/ReactToastify.css";

// import NotificationProvider from "./notification-provider";

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
				{/* <NotificationProvider> */}
				<Provider store={store}>{children}</Provider>
				{/* </NotificationProvider> */}
				<ToastContainer
					position="top-center"
					autoClose={3000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
				/>
			</QueryClientProvider>
		</AuthProvider>
	);
};
