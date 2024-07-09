import { createSlice } from "@reduxjs/toolkit";
import handleAsyncActions from "./common.redux";
import userApi, {
	handleRefreshAccessTokenFulfilled,
	handleSigninFulfilled,
} from "../action/authAction.redux";

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
		handleAsyncActions(builder, userApi.signIn, handleSigninFulfilled);
		handleAsyncActions(
			builder,
			userApi.refreshAccessToken,
			handleRefreshAccessTokenFulfilled
		);
	},
});

export default authSlice.reducer;
