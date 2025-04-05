import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./app.css";


import { App } from "./app/app";
import "../src/app.css";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<App />

	</StrictMode>
);
