import RoomTypeService from "../services/roomType.service.js";
import { Created, SuccessResponse } from "../utils/access.response.js";

class RoomTypeController {
    static create = async (req, res) => {
        const { name, description } = req.body;
        new Created({
            message: "Create room type success",
            metaData: await RoomTypeService.create({ name, description }),
        }).send(res);
    };

    static getAll = async (req, res) => {
        const options = {
            searchQuery: req.query?.searchQuery,
            page: req.query?.page ? parseInt(req.query?.page) : 1,
            pageSize: req.query?.pageSize ? parseInt(req.query?.pageSize) : 10,
        };
        new SuccessResponse({
            message: "Get all room type success",
            metaData: await RoomTypeService.getAll(options),
        }).send(res);
    };

    static get = async (req, res) => {
        const { id } = req.params;
        new SuccessResponse({
            message: "Get room type success",
            metaData: await RoomTypeService.getById(id),
        }).send(res);
    };

    static update = async (req, res) => {
        const { id } = req.params;
        const { name, description } = req.body;
        new SuccessResponse({
            message: "Update room type success",
            metaData: await RoomTypeService.updateById(id, {
                name,
                description,
            }),
        }).send(res);
    };

    static delete = async (req, res) => {
        const { id } = req.params;
        new SuccessResponse({
            message: "Delete room type success",
            metaData: await RoomTypeService.remove(id),
        }).send(res);
    };
}

export default RoomTypeController;
