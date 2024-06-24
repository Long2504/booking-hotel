import ExtensionModel from "../models/extension.model.js";
import SubExtensionModel from "../models/subExtension.model.js";
import { NotFoundError } from "../utils/error.response.js";
import BaseService from "./base.service.js";
import { Op } from "sequelize";

class ExtensionService extends BaseService {
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
            include: [
                {
                    model: SubExtensionModel,
                    as: "subExtensions",
                    attributes: ["id", "name"],
                },
            ],
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

export default new ExtensionService(ExtensionModel);
