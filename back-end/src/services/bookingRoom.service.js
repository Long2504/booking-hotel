import { Op, Sequelize } from "sequelize";
import BookingRoomModel from "../models/bookingRoom.model.js";
import BaseService from "./base.service.js";
import { addHoursToDate } from "../utils/index.utils.js";
import HotelRoomModel from "../models/hotelRoom.model.js";
import HotelModel from "../models/hotel.model.js";
import RoomsTypeModel from "../models/roomType.model.js";
import DbMySql from "../dbs/init.mysqldb.js";
import { ORDER_BY } from "../models/enum.model.js";
import hotelRoomService from "./hotelRoom.service.js";
import HotelService from "./hotel.service.js";

class BookingRoomService extends BaseService {
	async getAllBookingRoomForHost(options) {
		const whereCondition = {};
		if (options.searchQuery) {
			whereCondition.name = {
				[Op.like]: `%${options.searchQuery}%`,
			};
		}
		options = {
			where: whereCondition,
			limit: options.pageSize,
			offset: (options.page - 1) * options.pageSize,
			attributes: ["id", "name", "address", "createdAt"],
			include: [
				{
					model: HotelRoomModel,
					as: "hotelRooms",
					attributes: ["id"],
					include: [
						{
							required: true,
							model: BookingRoomModel,
							as: "bookingRooms",
							attributes: [
								"id",
								"checkInDate",
								"checkOutDate",
								"numRooms",
								"bookingDate",
								"orderBy",
								"email",
							],
						},
						{
							model: RoomsTypeModel,
							as: "roomType",
							attributes: ["id", "name"],
						},
					],
				},
			],
		};
		const rows = await HotelModel.findAll(options);
		const listBookingRoom = rows.map((hotel) => {
			return {
				id: hotel.id,
				name: hotel.name,
				address: hotel.address,
				bookingRooms: this.handleListBookingRoom(hotel.hotelRooms),
				createdAt: hotel.createdAt,
			};
		});

		const temp = await DbMySql.sequelize.query(
			"select count(*) as count from (select hotels.id from hotels inner join ( select hotel_rooms.id, hotel_rooms.hotel_id, booking_rooms.check_in_date, booking_rooms.check_out_date from hotel_rooms inner join booking_rooms on hotel_rooms.id = booking_rooms.room_id where (hotel_rooms.deleted_at IS NULL) AND (booking_rooms.deleted_at IS NULL)) as test on hotels.id = test.hotel_id group by id) as t"
		);
		const count = temp[0][0].count;
		return {
			list: listBookingRoom,
			total: count,
		};
	}

	handleListBookingRoom(hotelRooms) {
		const listBookingRoom = [];
		hotelRooms.forEach((hotelRoom) => {
			hotelRoom.bookingRooms.forEach((bookingRoom) => {
				listBookingRoom.push({
					...bookingRoom.dataValues,
					roomType: hotelRoom.roomType,
				});
				return;
			});
		});
		return listBookingRoom;
	}

	async createBookingRoomForHost(data) {
		const {
			roomId,
			numRooms,
			checkInDate,
			checkOutDate,
			email,
			phone,
			customerName,
			address,
		} = data;
		return await this.create({
			roomId,
			numRooms,
			checkInDate,
			checkOutDate,
			bookingDate: new Date(),
			email,
			phone,
			customerName,
			address,
			orderBy: ORDER_BY.HOTEL,
		});
	}

	async getRoomsIsAvailableByHotelForHost(options) {
		let { hotelId, checkInDate, checkOutDate } = options;
		checkInDate = addHoursToDate(checkInDate, 12);
		checkOutDate = addHoursToDate(checkOutDate, 12);
		const roomsIsAvailable =
			await hotelRoomService.getRoomsIsAvailableOfHotel(
				hotelId,
				checkInDate,
				checkOutDate
			);
		return roomsIsAvailable;
	}

	async getList(options) {
		let { startDate, endDate, roomNumber, peopleNumber } = options;
		startDate = addHoursToDate(startDate, 12);
		endDate = addHoursToDate(endDate, 12);
		const bookingRoom = await this.getAll({
			attributes: ["id", "roomId", "numRooms"],
			where: {
				[Op.not]: {
					[Op.or]: {
						checkOutDate: {
							[Op.lte]: startDate,
						},
						checkInDate: {
							[Op.gte]: endDate,
						},
					},
				},
			},
			include: [
				{
					model: HotelRoomModel,
					as: "hotelRoom",
					attributes: ["id", "numBedrooms", "occupancy"],
					where: {
						numBedrooms: {
							[Op.lt]: Sequelize.literal(
								`num_rooms + ${peopleNumber}`
							),
						},
					},
				},
			],
		});

		const listRoomId = bookingRoom.map((item) => item.roomId);

		return listRoomId;
	}

	async getListIdRoomNotAvailableByIdHotel(idHotel, options) {
		let { startDate, endDate, roomNumber, peopleNumber } = options;
		startDate = addHoursToDate(startDate, 12);
		endDate = addHoursToDate(endDate, 12);
		const bookingRoom = await this.getAll({
			attributes: ["id", "roomId", "numRooms"],
			where: {
				[Op.not]: {
					[Op.or]: {
						checkOutDate: {
							[Op.lt]: startDate,
						},
						checkInDate: {
							[Op.gt]: endDate,
						},
					},
				},
			},
			include: [
				{
					model: HotelRoomModel,
					as: "hotelRoom",
					attributes: ["id", "numBedrooms", "occupancy"],
					where: {
						numBedrooms: {
							[Op.lt]: Sequelize.literal(
								`num_rooms + ${peopleNumber}`
							),
						},
						hotelId: idHotel,
					},
				},
			],
		});

		const listRoomId = bookingRoom.map((item) => item.roomId);

		return listRoomId;
	}

	async deleteBookingRoomForHost(id) {
		return await this.delete({
			where: {
				id,
				orderBy: ORDER_BY.HOTEL,
			},
		});
	}

	async getRoomAvailableHotelsForHost(options) {
		let { checkInDate, checkOutDate } = options;
		const whereCondition = {};
		if (options.searchQuery) {
			whereCondition.name = {
				[Op.like]: `%${options.searchQuery}%`,
			};
		}
		checkInDate = addHoursToDate(checkInDate, 12);
		checkOutDate = addHoursToDate(checkOutDate, 12);
		const { rows, count } = await HotelService.getAndCountAll({
			where: whereCondition,
			attributes: ["id", "name", "address", "createdAt"],
			limit: options.pageSize,
			offset: (options.page - 1) * options.pageSize,
			include: [
				{
					model: HotelRoomModel,
					as: "hotelRooms",
					attributes: [
						"id",
						"numBedrooms",
						"occupancy",
						"area",
						"price",
						"numBathrooms",
					],
					include: [
						{
							required: false,
							model: BookingRoomModel,
							as: "bookingRooms",
							attributes: ["numRooms", "bookingDate"],
							where: {
								checkInDate: {
									[Op.lt]: checkOutDate,
								},
								checkOutDate: {
									[Op.gt]: checkInDate,
								},
							},
						},
						{
							model: RoomsTypeModel,
							as: "roomType",
							attributes: ["id", "name"],
						},
					],
				},
			],
			distinct: true,
		});
		const roomAvailableHotels = rows.map((hotel) => {
			const hotelRooms = hotel.hotelRooms.map((room) => {
				if (room.bookingRooms.length === 0) {
					return {
						id: room.id,
						numBedrooms: room.numBedrooms,
						occupancy: room.occupancy,
						name: room.roomType.name,
						area: room.area,
						price: room.price,
						numBathrooms: room.numBathrooms,
					};
				}
			});
			return {
				id: hotel.id,
				name: hotel.name,
				address: hotel.address,
				createdAt: hotel.createdAt,
				hotelRooms: hotelRooms,
			};
		});
		return { list: roomAvailableHotels, total: count };
	}
}

export default new BookingRoomService(BookingRoomModel);
