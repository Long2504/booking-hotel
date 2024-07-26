import HotelService from "../services/hotel.service.js";
import { Created, SuccessResponse } from "../utils/access.response.js";
class HotelController {
	static post = async (req, res) => {
		new Created({
			message: "Create extension success",
			metaData: await HotelService.createAndPost(req.body),
		}).send(res);
	};

	static getAll = async (req, res) => {
		const options = {
			searchQuery: req.query?.searchQuery,
			page: req.query?.page ? parseInt(req.query?.page) : 1,
			pageSize: req.query?.pageSize ? parseInt(req.query?.pageSize) : 10,
			startDate: req.query?.startDate,
			endDate: req.query?.endDate,
			roomNumber: req.query?.roomNumber,
			peopleNumber: req.query?.peopleNumber,
			multiStar: req.query?.multiStar || [],
			multiCity: req.query?.multiCity || [],
			minimumPrice: req.query?.maximumPrice
				? parseInt(req.query?.maximumPrice)
				: 0,
			maximumPrice: req.query?.minimumPrice
				? parseInt(req.query?.minimumPrice)
				: 0,
		};

		new SuccessResponse({
			message: "Get all hotel success",
			metaData: await HotelService.getAll(options),
		}).send(res);
	};

	static get = async (req, res) => {
		const { id } = req.params;
		const options = {
			startDate: req.query?.startDate || "2024-07-23",
			endDate: req.query?.endDate || "2024-07-24",
			roomNumber: req.query?.roomNumber || 2,
			peopleNumber: req.query?.peopleNumber || 2,
		};
		new SuccessResponse({
			message: "Get hotel success",
			metaData: await HotelService.getDetail(id, options),
		}).send(res);
	};

	static getAllForHost = async (req, res) => {
		const options = {
			searchQuery: req.query?.searchQuery,
			page: req.query?.page ? parseInt(req.query?.page) : 1,
			pageSize: req.query?.pageSize ? parseInt(req.query?.pageSize) : 10,
		};
		const { userId } = req.keyStore;
		new SuccessResponse({
			message: "Get all hotel for host success",
			metaData: await HotelService.getAllForHost(userId, options),
		}).send(res);
	};

	static getAllForAdmin = async (req, res) => {
		const options = {
			searchQuery: req.query?.searchQuery,
			page: req.query?.page ? parseInt(req.query?.page) : 1,
			pageSize: req.query?.pageSize ? parseInt(req.query?.pageSize) : 10,
		};
		new SuccessResponse({
			message: "Get all hotel for admin success",
			metaData: await HotelService.getAllForAdmin(options),
		}).send(res);
	};
}

export default HotelController;
