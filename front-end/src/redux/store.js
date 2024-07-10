import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authslice.redux";
import globalLoadingReducer from "./slice/globalLoading.redux";
export const store = configureStore({
	reducer: {
		auth: authReducer,
		globalLoading: globalLoadingReducer,
	},
});
