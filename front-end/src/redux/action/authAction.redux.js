//files
import publicApi from "../../services/api/apiPublic.service";
import { setUserInfo } from "../../utils/localStorage.utils";

//libs
import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const authEndpoints = {
	signin: "auth/sign-in",
	signinByGoogle: "auth/sign-in-by-google",
	refreshAccessToken: "auth/access-token",
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

export { handleSigninFulfilled, handleRefreshAccessTokenFulfilled };
export default authApi;
