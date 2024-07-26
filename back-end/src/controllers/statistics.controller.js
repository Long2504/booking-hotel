import StatisticsService from "../services/statistics.service.js";
import { SuccessResponse } from "../utils/access.response.js";

class StatisticsController {
	static getForDashboardAdmin = async (req, res) => {
		new SuccessResponse({
			message: "get statistics dashboard admin success",
			metaData: await StatisticsService.getForDashboardAdmin(),
		}).send(res);
	};
}

export default StatisticsController;
