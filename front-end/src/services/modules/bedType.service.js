import handleApiCall from "../api/apiCommon.service";
import privateApi from "../api/apiPrivate.service";

const typeBedEndpoint = "bed-type";

const bedTypeApi = {
	getList: async (params) => {
		return await handleApiCall(() =>
			privateApi.get(typeBedEndpoint, { params })
		);
    },
    
	create: async (data) => {
		return await handleApiCall(() =>
			privateApi.post(typeBedEndpoint, data)
		);
	},

	update: async (data) => {
		return await handleApiCall(() =>
			privateApi.put(`${typeBedEndpoint}/${data.id}`, data)
		);
    },
    
	delete: async (id) => {
		return await handleApiCall(() =>
			privateApi.delete(`${typeBedEndpoint}/${id}`)
		);
	},
};

export default bedTypeApi;
