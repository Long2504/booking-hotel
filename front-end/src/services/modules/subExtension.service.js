import handleApiCall from "../api/apiCommon.service";
import privateApi from "../api/apiPrivate.service";

const subExtensionEndpoint = "sub-extension";

const subExtensionApi = {
	create: async (data) => {
		return await handleApiCall(() =>
			privateApi.post(subExtensionEndpoint, data)
		);
	},

	update: async (data) => {
		return await handleApiCall(() =>
			privateApi.put(`${subExtensionEndpoint}/${data.id}`, data)
		);
	},

	delete: async (id) => {
		return await handleApiCall(() =>
			privateApi.delete(`${subExtensionEndpoint}/${id}`)
		);
	},
};

export default subExtensionApi;
