import SubExtensionModel from "../models/subExtension.model.js";
import BaseService from "./base.service.js";
import { Op } from "sequelize";

class SubExtensionService extends BaseService {
}

export default new SubExtensionService(SubExtensionModel);
