//files
import handleAsyncActions from "./common.redux";
import authApi, {
	handleRefreshAccessTokenFulfilled,
	handleSigninFulfilled,
} from "../action/authAction.redux";

//libs
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
	name: "auth",
	initialState: {
		accessToken: null,
		isAuthenticated: false,
		loading: false,
		user: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		handleAsyncActions(builder, authApi.signIn, handleSigninFulfilled);
		handleAsyncActions(
			builder,
			authApi.refreshAccessToken,
			handleRefreshAccessTokenFulfilled
		);
		handleAsyncActions(
			builder,
			authApi.signInByGoogle,
			handleSigninFulfilled
		);
	},
});

export default authSlice.reducer;
