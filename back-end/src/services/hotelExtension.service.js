import HotelExtensionModel from "../models/hotelExtension.model.js";
import BaseService from "./base.service.js";

class HotelExtensionService extends BaseService {
    async createBulkHotelExtension(data, idHotel) {
        const listData = [];
        for (const obj of data) {
            listData.push({
                extensionId: obj.id,
                hotelId: idHotel,
                subExtensions: obj.subExtension,
            });
        }
        return await this.bulkCreate(listData);
    }
}

export default new HotelExtensionService(HotelExtensionModel);
