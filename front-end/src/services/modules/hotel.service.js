import handleApiCall from "../api/apiCommon.service";
import privateApi from "../api/apiPrivate.service";
import publicApi from "../api/apiPublic.service";

const hotelPrivateEndpoint = {
	post: "hotel/post",
	getListForHost: "hotel/host",
	getListForAdmin: "hotel/admin",
};

const hotelPublicEndpoint = "hotel";

const hotelApi = {
	post: async (data) => {
		return await handleApiCall(() =>
			privateApi.post(hotelPrivateEndpoint.post, data)
		);
	},

	getList: async (params) => {
		return await handleApiCall(() =>
			publicApi.get(hotelPublicEndpoint, { params })
		);
	},

	getById: async (id, params) => {
		return await handleApiCall(() =>
			publicApi.get(`${hotelPublicEndpoint}/${id}`, { params })
		);
	},

	getListForHost: async (params) => {
		return await handleApiCall(() =>
			privateApi.get(hotelPrivateEndpoint.getListForHost, {
				params,
			})
		);
	},

	getListForAdmin: async (params) => {
		return await handleApiCall(() =>
			privateApi.get(hotelPrivateEndpoint.getListForAdmin, {
				params,
			})
		);
	},
};

export default hotelApi;
