//files
import "./index.css";
import "./assets/styles/index.scss";
import App from "./App";
import { store } from "./redux/store";

//libs
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));
const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<Router>
				<GoogleOAuthProvider clientId={googleClientId}>
					<App />
				</GoogleOAuthProvider>
			</Router>
		</Provider>
	</React.StrictMode>
);
