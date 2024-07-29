//files
import privateApi from "../../services/api/apiPrivate.service";
import publicApi from "../../services/api/apiPublic.service";
import { removeUserInfo, setUserInfo } from "../../utils/localStorage.utils";

//libs
import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const authEndpoints = {
	signin: "auth/sign-in",
	signinByGoogle: "auth/sign-in-by-google",
	refreshAccessToken: "auth/access-token",
	signOut: "auth/sign-out",
};

const authApi = {
	signIn: createAsyncThunk("auth/signin", async ({ email, password }) => {
		const response = await publicApi.post(authEndpoints.signin, {
			email,
			password,
		});
		return response;
	}),
	signInByGoogle: createAsyncThunk(
		"auth/signin-by-google",
		async ({ tokenId }) => {
			const response = await publicApi.post(
				authEndpoints.signinByGoogle,
				{
					tokenId,
				}
			);
			return response;
		}
	),
	refreshAccessToken: createAsyncThunk(
		"auth/refresh-access-token",
		async ({ refreshToken }) => {
			const response = await publicApi.post(
				authEndpoints.refreshAccessToken,
				{
					refreshToken,
				}
			);
			return response;
		}
	),
	signOut: createAsyncThunk("auth/signout", async () => {
		const response = await privateApi.post(authEndpoints.signOut);
		return response;
	}),
};

const handleSigninFulfilled = (state, action) => {
	const {
		data: { user, tokens },
	} = action?.payload?.metaData;

	state.accessToken = tokens.accessToken;
	state.isAuthenticated = true;
	state.user = user;
	Cookies.set("refreshToken", tokens.refreshToken);
	setUserInfo(user);
};

const handleRefreshAccessTokenFulfilled = (state, action) => {
	const { tokens, user } = action?.payload?.metaData;
	state.accessToken = tokens.accessToken;
	state.isAuthenticated = true;
	state.user = user;
};

const handleSignOutFulfilled = (state) => {
	state.accessToken = null;
	state.isAuthenticated = false;
	state.user = null;
	Cookies.remove("refreshToken");
	removeUserInfo();
};

export {
	handleSigninFulfilled,
	handleRefreshAccessTokenFulfilled,
	handleSignOutFulfilled,
};
export default authApi;
