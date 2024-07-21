import HotelRoomModel from "../models/hotelRoom.model.js";
import BaseService from "./base.service.js";
import RoomBedService from "./roomBed.service.js";

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
}

export default new HotelRoomService(HotelRoomModel);
