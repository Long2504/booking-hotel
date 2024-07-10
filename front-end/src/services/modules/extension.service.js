import handleApiCall from "../api/apiCommon.service";
import privateApi from "../api/apiPrivate.service";

const extensionEndpoint = "extension";

const extensionApi = {
	getList: async (params) => {
		return await handleApiCall(() =>
			privateApi.get(extensionEndpoint, { params })
		);
	},
	create: async (data) => {
		return await handleApiCall(() =>
			privateApi.post(extensionEndpoint, data)
		);
	},
	update: async (data) => {
		return await handleApiCall(() =>
			privateApi.put(extensionEndpoint, data)
		);
	},
	delete: async (data) => {
		return await handleApiCall(() =>
			privateApi.delete(extensionEndpoint, {
				data,
			})
		);
	},
};

export default extensionApi;
