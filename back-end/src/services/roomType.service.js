import RoomsTypeModel from "../models/roomType.model.js";
import { NotFoundError } from "../utils/error.response.js";
import BaseService from "./base.service.js";
import { Op } from "sequelize";

class RoomTypeService extends BaseService {
	async initRoomType(listRoomType) {
		try {
			const count = await this.count();
			if (count > 0) {
				return;
			}
			return await this.model.bulkCreate(listRoomType);
		} catch (error) {
			console.log("🚀 ~ file: roomType.service.js:15 ~ error:");
		}
	}

	async getAll(options) {
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
			attributes: ["id", "name", "createdAt", "description"],
			order: [["description", "DESC"]],
		};
		const { count, rows } = await this.getAndCountAll(options);
		return {
			list: rows,
			total: count,
		};
	}

	async remove(id) {
		const data = this.deleteById(id);
		if (data) {
			return data;
		}
		throw new NotFoundError("Extension not found");
	}
}

export default new RoomTypeService(RoomsTypeModel);
