import axios from "axios";

const baseURL = "http://localhost:3055/api/public/";

const publicApi = axios.create({
	baseURL,
});

publicApi.interceptors.request.use(async (config) => {
	return {
		...config,
		headers: {
			"Content-Type": "application/json",
		},
	};
});

publicApi.interceptors.response.use(
	(response) => {
		if (response && response.data) return response.data;
		return response;
	},
	(err) => {
		return Promise.reject(err);
	}
);

export default publicApi;
