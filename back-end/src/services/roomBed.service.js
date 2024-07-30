import BaseService from "./base.service.js";
import RoomsBedModel from "../models/roomBed.model.js";

class RoomBedService extends BaseService {
	async deleteBulkRoomBed(hotelRoomId) {
		await this.remove({ where: { hotelRoomId: hotelRoomId }, force: true });
	}
}

export default new RoomBedService(RoomsBedModel);
