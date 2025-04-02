import { AppRouter } from "./router";
// import { useEffect } from "react";
import { AppProvider } from "./provider";
// import { generateToken } from "@/config/firebase";

export const App = () => {
	// useEffect(() => {
	// 	generateToken();
	// }, []);

	return (
		<AppProvider>
			<AppRouter />
		</AppProvider>
	);
};
