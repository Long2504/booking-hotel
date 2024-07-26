import BookingRoomService from "../services/bookingRoom.service.js";
import { SuccessResponse } from "../utils/access.response.js";

class BookingRoomController {
	static getAllForHost = async (req, res) => {
		const options = {
			searchQuery: req.query?.searchQuery,
			page: req.query?.page ? parseInt(req.query?.page) : 1,
			pageSize: req.query?.pageSize ? parseInt(req.query?.pageSize) : 10,
		};
		new SuccessResponse({
			message: "Get all booking room success",
			metaData: await BookingRoomService.getAllBookingRoomForHost(
				options
			),
		}).send(res);
	};

	static createForHost = async (req, res) => {
		new SuccessResponse({
			message: "Create booking room success",
			metaData: await BookingRoomService.createBookingRoomForHost(
				req.body
			),
		}).send(res);
	};

	static getRoomsIsAvailableByHotelIdForHost = async (req, res) => {
		const options = {
			hotelId: req.query?.hotelId,
			checkInDate: req.query?.checkInDate,
			checkOutDate: req.query?.checkOutDate,
		};
		new SuccessResponse({
			message: "Get rooms is available success",
			metaData:
				await BookingRoomService.getRoomsIsAvailableByHotelForHost(
					options
				),
		}).send(res);
	};

	static deleteForHost = async (req, res) => {
		const { id } = req.params;
		new SuccessResponse({
			message: "Delete booking room success",
			metaData: await BookingRoomService.deleteBookingRoomForHost(id),
		}).send(res);
	};

	static getRoomAvailableHotelsForHost = async (req, res) => {
		const options = {
			checkInDate: req.query?.checkInDate,
			checkOutDate: req.query?.checkOutDate,
			searchQuery: req.query?.searchQuery,
			page: req.query?.page ? parseInt(req.query?.page) : 1,
			pageSize: req.query?.pageSize ? parseInt(req.query?.pageSize) : 10,
		};
		new SuccessResponse({
			message: "Get room available hotels success",
			metaData:
				await BookingRoomService.getRoomAvailableHotelsForHost(
					options
				),
		}).send(res);
	};
}

export default BookingRoomController;
