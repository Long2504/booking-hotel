import BedTypeService from "../services/bedType.service.js";
import { Created, SuccessResponse } from "../utils/access.response.js";

class BedTypeController {
    static create = async (req, res) => {
        const { name } = req.body;
        new Created({
            message: "Create bed type success",
            metaData: await BedTypeService.create({
                name,
            }),
        }).send(res);
    };

    static getAll = async (req, res) => {
        const options = {
            searchQuery: req.query?.searchQuery,
            page: req.query?.page ? parseInt(req.query?.page) : 1,
            pageSize: req.query?.pageSize ? parseInt(req.query?.pageSize) : 10,
        };
        new SuccessResponse({
            message: "Get all bed type success",
            metaData: await BedTypeService.getAll(options),
        }).send(res);
    };

    static get = async (req, res) => {
        const { id } = req.params;
        new SuccessResponse({
            message: "Get bed type success",
            metaData: await BedTypeService.getById(id),
        }).send(res);
    };

    static update = async (req, res) => {
        const { id } = req.params;
        const { name } = req.body;
        new SuccessResponse({
            message: "Update bed type success",
            metaData: await BedTypeService.updateById(id, {
                name,
            }),
        }).send(res);
    };

    static delete = async (req, res) => {
        const { id } = req.params;
        new SuccessResponse({
            message: "Delete bed type success",
            metaData: await BedTypeService.deleteById(id),
        }).send(res);
    };
}

export default BedTypeController;
