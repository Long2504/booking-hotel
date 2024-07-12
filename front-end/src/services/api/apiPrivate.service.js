//files
import { store } from "../../redux/store";
import userApi from "../../redux/action/authAction.redux";

//libs
import axios from "axios";
import Cookies from "js-cookie";


const baseURL = "http://localhost:3055/api/private/";
const privateApi = axios.create({
	baseURL,
});

privateApi.interceptors.request.use(
	async (config) => {
		const state = store.getState();
		const accessToken = state.auth.accessToken;
		const idUser = state.auth.user?.id;
		config.headers = {
			"Content-Type": "application/json",
		};
		if (accessToken) {
			config.headers = {
				"x-client-id": idUser,
				Authorization: `${accessToken}`,
			};
		}

		config.withCredentials = true;
		return config;
	},
	(error) => Promise.reject(error)
);

privateApi.interceptors.response.use(
	(response) => {
		if (response && response.data) return response.data;
		return response;
	},
	async (error) => {
		const originalRequest = error.config;
		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;
			const refreshToken = Cookies.get("refreshToken");
			await store.dispatch(userApi.refreshAccessToken({ refreshToken }));
			return privateApi(originalRequest);
		}
		return Promise.reject(error);
	}
);

export default privateApi;
