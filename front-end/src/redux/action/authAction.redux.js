import { createAsyncThunk } from "@reduxjs/toolkit";
import publicApi from "../../services/api/apiPublic.service";
import Cookies from "js-cookie";
const userEndpoints = {
	signin: "auth/sign-in",
	refreshAccessToken: "auth/access-token",
};

const userApi = {
	signIn: createAsyncThunk("auth/signin", async ({ email, password }) => {
		const response = await publicApi.post(userEndpoints.signin, {
			email,
			password,
		});
		return response;
	}),
	refreshAccessToken: createAsyncThunk(
		"auth/refresh-access-token",
		async ({ refreshToken }) => {
			const response = await publicApi.post(
				userEndpoints.refreshAccessToken,
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
};

const handleRefreshAccessTokenFulfilled = (state, action) => {
	const { data: accessToken } = action?.payload?.metaData;
	state.accessToken = accessToken;
	state.isAuthenticated = true;
};

export { handleSigninFulfilled, handleRefreshAccessTokenFulfilled };
export default userApi;
