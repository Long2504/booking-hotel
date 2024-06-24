import ExtensionService from "../services/extension.service.js";
import { Created, SuccessResponse } from "../utils/access.response.js";

class ExtensionController {
    static create = async (req, res) => {
        const { name, description } = req.body;
        new Created({
            message: "Create extension success",
            metaData: await ExtensionService.create({ name, description }),
        }).send(res);
    };

    static getAll = async (req, res) => {
        const options = {
            searchQuery: req.query?.searchQuery,
            page: req.query?.page ? parseInt(req.query?.page) : 1,
            pageSize: req.query?.pageSize ? parseInt(req.query?.pageSize) : 10,
        };
        new SuccessResponse({
            message: "Get all extension success",
            metaData: await ExtensionService.getAll(options),
        }).send(res);
    };

    static get = async (req, res) => {
        const { id } = req.params;
        new SuccessResponse({
            message: "Get extension success",
            metaData: await ExtensionService.getById(id),
        }).send(res);
    };

    static update = async (req, res) => {
        const { id } = req.params;
        const { name, description } = req.body;
        new SuccessResponse({
            message: "Update extension success",
            metaData: await ExtensionService.updateById(id, { name, description }),
        }).send(res);
    };

    static delete = async (req, res) => {
        const { id } = req.params;
        new SuccessResponse({
            message: "Delete extension success",
            metaData: await ExtensionService.remove(id),
        }).send(res);
    };
}

export default ExtensionController;
