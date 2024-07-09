import privateApi from "../api/apiPrivate.service";

const extensionEndpoint = "extension";

const extensionApi = {
	getList: async () => {
		try {
			const response = await privateApi.get(extensionEndpoint);
			return response;
		} catch (error) {
			return error;
		}
	},
	create: async (data) => {
		try {
			const response = await privateApi.post(extensionEndpoint, data);
			return response;
		} catch (error) {
			return error;
		}
	},
	update: async (data) => {
		try {
			const response = await privateApi.put(extensionEndpoint, data);
			return response;
		} catch (error) {
			return error;
		}
	},
	delete: async (data) => {
		try {
			const response = await privateApi.delete(extensionEndpoint, {
				data,
			});
			return response;
		} catch (error) {
			return error;
		}
	},
};

export default extensionApi;
