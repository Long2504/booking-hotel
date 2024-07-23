import BookingRoomModel from "../models/bookingRoom.model.js";
import {
	ORDER_BY,
	PAYMENT_METHOD,
	PAYMENT_STATUS,
} from "../models/enum.model.js";
import HotelModel from "../models/hotel.model.js";
import HotelRoomModel from "../models/hotelRoom.model.js";
import OrderModel from "../models/order.model.js";
import RoomsTypeModel from "../models/roomType.model.js";
import { addHoursToDate } from "../utils/index.utils.js";
import BaseService from "./base.service.js";
import BookingRoomService from "./bookingRoom.service.js";
import EmailService from "./email.service.js";
import { captureOrder, createOrder } from "./paypalApi.service.js";

class OrderService extends BaseService {
	async orderPaypal(data) {
		const { room, checkInDate, checkOutDate, totalDays, customerInfo } =
			data;

		// create order paypal
		const totalVietNamDong =
			room?.price * totalDays * room?.numBedrooms * 1.1;
		const totalUsd = Math.round(totalVietNamDong / 23000, 2);

		const { jsonResponse, httpStatusCode } = await createOrder(totalUsd);

		// create booking room
		const checkInDateNew = addHoursToDate(checkInDate, 12);
		const checkOutDateNew = addHoursToDate(checkOutDate, 12);
		const dataBookingRoom = {
			...customerInfo,
			roomId: room.id,
			checkInDate: checkInDateNew,
			checkOutDate: checkOutDateNew,
			numRooms: room.numBedrooms,
			bookingDate: new Date(),
			orderBy: ORDER_BY.SYSTEM,
		};
		const bookingRoom = await BookingRoomService.create(dataBookingRoom);

		// create order
		const dataOrder = {
			paymentStatus: PAYMENT_STATUS.PENDING,
			paymentMethod: PAYMENT_METHOD.PAY_PAL,
			bookingRoomId: bookingRoom.id,
			totalPrice: totalVietNamDong,
		};
		const order = await this.create(dataOrder);

		return { jsonResponse, orderId: order.id, httpStatusCode };
	}

	async captureOrderPaypal(data, orderId) {
		const { orderIdSys } = data;

		const { jsonResponse, httpStatusCode } = await captureOrder(orderId);
		const errorDetail = jsonResponse?.details?.[0];
		if (errorDetail) {
			return { jsonResponse, httpStatusCode };
		}
		// update order
		await this.updateById(orderIdSys, {
			paymentStatus: PAYMENT_STATUS.PAID,
			paymentDate: new Date(),
		});

		const order = await this.getById(orderIdSys, {
			attributes: ["id", "totalPrice"],
			include: {
				model: BookingRoomModel,
				as: "bookingRoom",
				attributes: [
					"id",
					"customerName",
					"email",
					"checkInDate",
					"checkOutDate",
					"bookingDate",
					"numRooms",
				],
				include: {
					model: HotelRoomModel,
					as: "hotelRoom",
					attributes: ["id", "price"],
					include: [
						{
							model: HotelModel,
							as: "hotel",
							attributes: ["id", "name", "address"],
						},
						{
							model: RoomsTypeModel,
							as: "roomType",
							attributes: ["id", "name"],
						},
					],
				},
			},
		});

		const dataToSendMail = {
			customerName: order?.bookingRoom?.customerName,
			email: order?.bookingRoom?.email,
			checkInDate: order?.bookingRoom?.checkInDate,
			checkOutDate: order?.bookingRoom?.checkOutDate,
			bookingDate: order?.bookingRoom?.bookingDate,
			roomNum: order?.bookingRoom?.numRooms,
			roomName: order?.bookingRoom?.hotelRoom?.roomType?.name,
			roomPrice: order?.bookingRoom?.hotelRoom?.price,
			hotelName: order?.bookingRoom?.hotelRoom?.hotel?.name,
			hotelAddress: order?.bookingRoom?.hotelRoom?.hotel?.address,
			totalPrice: order?.totalPrice,
		};

		// send mail
		const subjectMail = "Hoàn tất đặt phòng";
		await EmailService.sendEmail({
			email: dataToSendMail.email,
			subject: subjectMail,
			mailContent: EmailService.contentMailBooking(dataToSendMail),
		});
		return { jsonResponse, httpStatusCode };
	}
}

export default new OrderService(OrderModel);
