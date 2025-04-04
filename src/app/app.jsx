import { AppRouter } from "./router";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
