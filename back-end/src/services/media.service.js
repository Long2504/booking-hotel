import MediaFileModel from "../models/mediaFile.model.js";
import BaseService from "./base.service.js";
import { readFileSync, unlinkSync } from "fs";
import config from "../configs/config.js";
import { BadRequestError } from "../utils/error.response.js";
const { app } = config;
class MediaService extends BaseService {
	async uploadImage(file) {
		if (!file) {
            throw new BadRequestError("File not found");
		}
		const data = readFileSync(file.path);
		const newImage = {
			name: file.filename,
			contentType: file.mimetype,
			data: data,
		};
		const body = await this.create(newImage);
		unlinkSync(file.path);
		const url = `${app.urlBaseMedia}/${body.id}`;
		return { url: url };
	}
}

export default new MediaService(MediaFileModel);
