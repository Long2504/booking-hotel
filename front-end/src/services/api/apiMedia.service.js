//files
import privateApi from "./apiPrivate.service";

const baseURL = "http://localhost:3055/api/private/media";
const mediaApiBase = privateApi.create({ baseURL });

mediaApiBase.interceptors.request.use(
	async (config) => {
		config.headers = {
			"Content-Type": "multipart/form-data",
		};

		return {
			...config,
		};
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default mediaApiBase;
