import handleApiCall from "../api/apiCommon.service";
import privateApi from "../api/apiPrivate.service";
import publicApi from "../api/apiPublic.service";

const hotelPrivateEndpoint = {
	post: "hotel/post",
};

const hotelPublicEndpoint = {
	getList: "hotel",
};

const hotelApi = {
	post: async (data) => {
		return await handleApiCall(() =>
			privateApi.post(hotelPrivateEndpoint.post, data)
		);
	},

	getList: async (params) => {
		return await handleApiCall(() =>
			publicApi.get(hotelPublicEndpoint.getList, { params })
		);
	},
};

export default hotelApi;
