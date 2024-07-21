
import HotelService from "../services/hotel.service.js";
import { Created, SuccessResponse } from "../utils/access.response.js";
class HotelController {
    static post = async (req, res) => {
        new Created({
            message: "Create extension success",
            metaData: await HotelService.createAndPost(req.body),
        }).send(res);
    };

    static getAll = async (req, res) => {
        const options = {
            searchQuery: req.query?.searchQuery,
            page: req.query?.page ? parseInt(req.query?.page) : 1,
            pageSize: req.query?.pageSize ? parseInt(req.query?.pageSize) : 10,
        };
        new SuccessResponse({
            message: "Get all hotel success",
            metaData: await HotelService.getAll(options),
        }).send(res);
    };

    static get = async (req, res) => {
        const { id } = req.params;
        new SuccessResponse({
			message: "Get hotel success",
			metaData: await HotelService.getDetail(id),
		}).send(res);
    };
}

export default HotelController;
