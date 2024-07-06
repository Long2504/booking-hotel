import { createSlice } from "@reduxjs/toolkit";
import handleAsyncActions from "./common.redux";
import userApi, { handleSigninFulfilled } from "../action/authAction.redux";


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
	},
});

export default authSlice.reducer;
