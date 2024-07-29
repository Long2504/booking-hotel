import { validationResult } from "express-validator";
import { BadRequestError } from "../utils/error.response.js";

const validationHandler = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		throw new BadRequestError(errors.array()[0].msg);
	}

	next();
};

export default validationHandler;