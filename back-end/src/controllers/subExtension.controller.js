import SubExtensionService from "../services/subExtension.service.js";
import { Created, SuccessResponse } from "../utils/access.response.js";

class SubExtensionController {
    static create = async (req, res) => {
        const { name, extensionId } = req.body;
        new Created({
            message: "Create extension success",
            metaData: await SubExtensionService.create({
                name,

                extensionId,
            }),
        }).send(res);
    };

    static update = async (req, res) => {
        const { id } = req.params;
        const { name, extensionId } = req.body;
        new SuccessResponse({
            message: "Update extension success",
            metaData: await SubExtensionService.updateById(id, {
                name,
                extensionId,
            }),
        }).send(res);
    };

    static delete = async (req, res) => {
        const { id } = req.params;
        new SuccessResponse({
            message: "Delete extension success",
            metaData: await SubExtensionService.deleteById(id),
        }).send(res);
    };
}

export default SubExtensionController;
