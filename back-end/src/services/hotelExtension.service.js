import HotelExtensionModel from "../models/hotelExtension.model.js";
import BaseService from "./base.service.js";

class HotelExtensionService extends BaseService {
	async createBulkHotelExtension(extension, idHotel) {
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

	async deleteBulkHotelExtension(hotelId) {
		return await this.remove({
			where: {
				hotelId,
			},
			force: true,
		});
	}
}

export default new HotelExtensionService(HotelExtensionModel);
