//files
import { store } from "../../redux/store";

//libs
import axios from "axios";
import queryString from "query-string";
import Cookies from "js-cookie";
import userApi from "../../redux/action/authAction.redux";

const baseURL = "http://localhost:3055/api/private/";
const privateApi = axios.create({
	baseURL,
	paramsSerializer: {
		encode: (params) => queryString.stringify(params),
	},
});

privateApi.interceptors.request.use(
	async (config) => {
		const state = store.getState();
		const accessToken = state.auth.accessToken;
		const idUser = state.auth.user?.id;

		if (accessToken) {
			config.headers["Authorization"] = `Bearer ${accessToken}`;
			config.headers["x-client-id"] = idUser;
		}

		return config;
	},
	(error) => Promise.reject(error)
);

privateApi.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;
			const refreshToken = Cookies.get("refreshToken");
			await store.dispatch(userApi.refreshAccessToken({ refreshToken }));
			const state = store.getState();
			const newAccessToken = state.auth.accessToken;
			axios.defaults.headers.common[
				"Authorization"
			] = `Bearer ${newAccessToken}`;
			return privateApi(originalRequest);
		}
		return Promise.reject(error);
	}
);

export default privateApi;
