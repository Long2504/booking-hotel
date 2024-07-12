import handleApiCall from "../api/apiCommon.service";
import privateApi from "../api/apiPrivate.service";

const typeRoomEndpoint = "room-type";

const roomTypeApi = {
	getList: async (params) => {
		return await handleApiCall(() =>
			privateApi.get(typeRoomEndpoint, { params })
		);
	},

	create: async (data) => {
		return await handleApiCall(() =>
			privateApi.post(typeRoomEndpoint, data)
		);
	},

	update: async (data) => {
		return await handleApiCall(() =>
			privateApi.put(`${typeRoomEndpoint}/${data.id}`, data)
		);
	},

	delete: async (id) => {
		return await handleApiCall(() =>
			privateApi.delete(`${typeRoomEndpoint}/${id}`)
		);
	},
};

export default roomTypeApi;
