import handleApiCall from "../api/apiCommon.service";
import privateApi from "../api/apiPrivate.service";

const statisticEndpoint = {
	dashboardForAdmin: "statistics/dashboard/admin",
};

const statisticApi = {
	getDashboardForAdmin: async () => {
		return await handleApiCall(() =>
			privateApi.get(statisticEndpoint.dashboardForAdmin, {})
		);
	},
};

export default statisticApi;
