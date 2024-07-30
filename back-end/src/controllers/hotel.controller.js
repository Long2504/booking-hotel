import HotelService from "../services/hotel.service.js";
import { Created, SuccessResponse } from "../utils/access.response.js";
class HotelController {
	static createAndPost = async (req, res) => {
		const hostId = req.keyStore.userId;
		new Created({
			message: "Create extension success",
			metaData: await HotelService.createAndPost({ ...req.body, hostId }),
		}).send(res);
	};

	static createAndSaveDraft = async (req, res) => {
		const hostId = req.keyStore.userId;
		new Created({
			message: "Create and save draft success",
			metaData: await HotelService.createAndSaveDraft({
				...req.body,
				hostId,
			}),
		}).send(res);
	};

	static deleteDraft = async (req, res) => {
		const { id } = req.params;
		const hostId = req.keyStore.userId;
		new SuccessResponse({
			message: "Delete draft success",
			metaData: await HotelService.deleteDraft(id, hostId),
		}).send(res);
	};

	static getDetailForHostDraft = async (req, res) => {
		const { id } = req.params;
		const hostId = req.keyStore.userId;
		new SuccessResponse({
			message: "Get detail for host draft success",
			metaData: await HotelService.getDetailForHostDraft(id, hostId),
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

	static getAllForHostDraft = async (req, res) => {
		const options = {
			searchQuery: req.query?.searchQuery,
			page: req.query?.page ? parseInt(req.query?.page) : 1,
			pageSize: req.query?.pageSize ? parseInt(req.query?.pageSize) : 10,
		};
		const { userId } = req.keyStore;
		new SuccessResponse({
			message: "Get all hotel for host draft success",
			metaData: await HotelService.getAllForHostDraft(userId, options),
		}).send(res);
	};
}

export default HotelController;
