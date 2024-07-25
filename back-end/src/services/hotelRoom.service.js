import { Op } from "sequelize";
import BookingRoomModel from "../models/bookingRoom.model.js";
import HotelRoomModel from "../models/hotelRoom.model.js";
import BaseService from "./base.service.js";
import RoomBedService from "./roomBed.service.js";
import RoomsTypeModel from "../models/roomType.model.js";

class HotelRoomService extends BaseService {
	async createBulkRoomForHotel(hotelId, data) {
		const arrPromise = data.map(async (room) => {
			const {
				area,
				occupancy,
				numBathrooms,
				numBedrooms,
				price,
				images,
				roomTypeId,
				beds,
			} = room;
			const roomCreate = await this.create({
				area,
				occupancy,
				numBathrooms,
				numBedrooms,
				price,
				images,
				roomTypeId,
				hotelId,
			});
			const arrBedPromise = beds.map(async (bed) => {
				const { numBeds, bedTypeId } = bed;
				await RoomBedService.create({
					numBeds,
					bedId: bedTypeId,
					hotelRoomId: roomCreate.id,
				});
			});
			await Promise.all(arrBedPromise);
		});
		await Promise.all(arrPromise);
		return true;
	}

	async getRoomsIsAvailableOfHotel(hotelId, startDate, endDate) {
		const roomIsAvailable = await this.getAll({
			where: {
				hotelId,
			},
			attributes: ["id", "numBedrooms", "occupancy"],
			include: [
				{
					required: false,
					model: BookingRoomModel,
					as: "bookingRooms",
					where: {
						checkInDate: {
							[Op.lt]: endDate,
						},
						checkOutDate: {
							[Op.gt]: startDate,
						},
					},
				},
				{
					model: RoomsTypeModel,
					as: "roomType",
					attributes: ["id", "name"],
				},
			],
		});
		const result = [];
		roomIsAvailable.forEach((room) => {
			const { bookingRooms } = room;
			if (bookingRooms.length === 0) {
				result.push({
					id: room.id,
					numBedrooms: room.numBedrooms,
					occupancy: room.occupancy,
					name: room.roomType.name,
				});
				return;
			}
			let sumRooms = 0;
			bookingRooms.forEach((bookingRoom) => {
				const { numRooms } = bookingRoom;
				sumRooms += numRooms;
			});
			if (sumRooms < room.numBedrooms) {
				result.push({
					id: room.id,
					numBedrooms: room.numBedrooms - sumRooms,
					occupancy: room.occupancy,
					name: room.roomType.name,
				});
			}
		});
		return result;
	}
}

export default new HotelRoomService(HotelRoomModel);
