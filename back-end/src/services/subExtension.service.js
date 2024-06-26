import SubExtensionModel from "../models/subExtension.model.js";
import BaseService from "./base.service.js";
import { Op } from "sequelize";

class SubExtensionService extends BaseService {
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
