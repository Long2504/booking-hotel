import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./assets/styles/index.scss";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { GoogleOAuthProvider } from "@react-oauth/google";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<Router>
				<GoogleOAuthProvider clientId='1059722329790-ggq09ntvloiqd194dgij5ahre7su77l0.apps.googleusercontent.com'>
					<App />
				</GoogleOAuthProvider>
			</Router>
		</Provider>
	</React.StrictMode>
);
