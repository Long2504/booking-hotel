import { createAsyncThunk } from "@reduxjs/toolkit";
import publicApi from "../../services/api/apiPublic.service";
import Cookies from "js-cookie";
const userEndpoints = {
	signin: "auth/sign-in",
};

const userApi = {
	signIn: createAsyncThunk("auth/signin", async ({ email, password }) => {
		const response = await publicApi.post(userEndpoints.signin, {
			email,
			password,
		});
		return response;
	}),
};

const handleSigninFulfilled = (state, action) => {
	const {
		data: { user, tokens }
    } = action?.payload?.metaData;

    state.accessToken = tokens.accessToken;
    state.isAuthenticated = true;
    state.user = user;
    Cookies.set("refreshToken", tokens.refreshToken);
};

export { handleSigninFulfilled }; 
export default userApi;
