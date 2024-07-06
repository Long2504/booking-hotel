import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authslice.redux";
export const store = configureStore({
	reducer: {
		auth: authReducer,
	},
});
