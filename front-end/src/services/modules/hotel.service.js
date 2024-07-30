import handleApiCall from "../api/apiCommon.service";
import privateApi from "../api/apiPrivate.service";
import publicApi from "../api/apiPublic.service";

const hotelPrivateEndpoint = {
	createAndPost: "hotel/host/create-and-post",
	createAndDraft: "hotel/host/create-and-draft",
	getListForHost: "hotel/host",
	getListDraftForHost: "hotel/host/draft",
	getDetailForHostDraft: "hotel/host/draft",
	deleteHotelDraft: "hotel/host/draft",
	getListForAdmin: "hotel/admin",
};

const hotelPublicEndpoint = "hotel";

const hotelApi = {
	createAndPost: async (data) => {
		return await handleApiCall(() =>
			privateApi.post(hotelPrivateEndpoint.createAndPost, data)
		);
	},

	createAndSaveDraft: async (data) => {
		return await handleApiCall(() =>
			privateApi.post(hotelPrivateEndpoint.createAndDraft, data)
		);
	},

	getDetailForHostDraft: async (id) => {
		return await handleApiCall(() =>
			privateApi.get(`${hotelPrivateEndpoint.getDetailForHostDraft}/${id}`)
		);
	},

	deleteHotelDraft: async (id) => {
		return await handleApiCall(() =>
			privateApi.delete(`${hotelPrivateEndpoint.deleteHotelDraft}/${id}`)
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

	getListDraftForHost: async (params) => {
		return await handleApiCall(() =>
			privateApi.get(hotelPrivateEndpoint.getListDraftForHost, {
				params,
			})
		);
	},
};

export default hotelApi;
