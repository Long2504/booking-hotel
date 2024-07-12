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
			privateApi.put(`${extensionEndpoint}/${data.id}`, data)
		);
	},
	delete: async (id) => {
		return await handleApiCall(() =>
			privateApi.delete(`${extensionEndpoint}/${id}`)
		);
	},
};

export default extensionApi;
