import HotelExtensionModel from "../models/hotelExtension.model.js";
import BaseService from "./base.service.js";

class HotelExtensionService extends BaseService {
	async createBulkHotelExtension(data, idHotel) {
		const listData = [];
		for (const key in extension) {
			if (Object.hasOwnProperty.call(extension, key)) {
				const sub = extension[key];
				listData.push({
					extensionId: key,
					hotelId: idHotel,
					subExtensions: sub,
				});
			}
		}
		return await this.bulkCreate(listData);
	}
}

export default new HotelExtensionService(HotelExtensionModel);
