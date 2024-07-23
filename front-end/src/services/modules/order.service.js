import handleApiCall from "../api/apiCommon.service";
import publicApi from "../api/apiPublic.service";

const orderEndpoint = "order";

const orderApi = {
	createOrderPaypal: async (data) => {
		return await handleApiCall(() =>
			publicApi.post(`${orderEndpoint}/paypal`, data)
		);
	},
	captureOrderPaypal: async (data, orderId) => {
		return await handleApiCall(() =>
			publicApi.post(`${orderEndpoint}/paypal/${orderId}`, data)
		);
	},
};

export default orderApi;
