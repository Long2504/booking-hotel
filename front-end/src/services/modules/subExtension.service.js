import privateApi from "../api/apiPrivate.service";

const subExtensionEndpoint = "sub-extension";

const subExtensionApi = {
	create: async (data) => {
		try {
			const response = await privateApi.post(subExtensionEndpoint, data);
			return response;
		} catch (error) {
			return error;
		}
	},

	update: async (data) => {
		try {
			const response = await privateApi.put(subExtensionEndpoint, data);
			return response;
		} catch (error) {
			return error;
		}
	},

	delete: async (data) => {
		try {
			const response = await privateApi.delete(subExtensionEndpoint, {
				data,
			});
			return response;
		} catch (error) {
			return error;
		}
	},
};

export default subExtensionApi;
