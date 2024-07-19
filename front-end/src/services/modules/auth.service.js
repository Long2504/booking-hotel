import handleApiCall from "../api/apiCommon.service";
import privateApi from "../api/apiPrivate.service";

const userEndpoints = {
	updateProfile: "auth/update-profile",
};

const userApi = {
	updateProfile: async (data) => {
		return await handleApiCall(() =>
			privateApi.put(`${userEndpoints.updateProfile}`, data)
		);
	},
};

export default userApi;
