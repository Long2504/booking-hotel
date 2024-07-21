import SubExtensionModel from "../models/subExtension.model.js";
import BaseService from "./base.service.js";
import { Op } from "sequelize";

class SubExtensionService extends BaseService {
	async initSubExtension(listSubExtension) {
		try {
			const count = await this.count();
			if (count > 0) {
				return;
			}
			return await this.model.bulkCreate(listSubExtension);
		} catch (error) {
			console.log("🚀 ~ file: subExtension.service.js:15 ~ error:");
		}
	}
	async getListByListId(listId) {
		const options = {
			where: {
				id: {
					[Op.in]: listId,
				},
			},
			attributes: ["id", "name"],
		};
		return await this.getAll(options);
	}
}

export default new SubExtensionService(SubExtensionModel);
