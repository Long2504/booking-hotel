import MediaService from "../services/media.service.js";
import {
	SuccessResponse,
	SuccessResponseMedia,
} from "../utils/access.response.js";

class MediaController {
	static uploadImage = async (req, res) => {
		new SuccessResponse({
			message: "Upload image success",
			metaData: await MediaService.uploadImage(req.file),
		}).send(res);
	};

	static getImg = async (req, res) => {
		const { id } = req.params;
		const data = await MediaService.getById(id);
		new SuccessResponseMedia().send(res, data);
	};
}

export default MediaController;
