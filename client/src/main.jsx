import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import Page1 from "./components/Page1.jsx";
import Page2 from "./components/Page2.jsx";
import AuthContainer from "./components/AuthContainer.jsx";
import ProtectedRoute from "./components/utils/ProtectedRoute.jsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "/",
				element: <AuthContainer />,
			},
			{
				path: "/page1",
				element: (<ProtectedRoute><Page1 /></ProtectedRoute>),
			},
			{
				path: "/page2",
				element: (<ProtectedRoute><Page2 /></ProtectedRoute>),
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
);
