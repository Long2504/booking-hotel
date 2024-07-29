"use strict";
import express from "express";

import {
	asyncHandler,
	authentication,
} from "../../middlewares/asyncHandler.middleware.js";
import SubExtensionController from "../../controllers/subExtension.controller.js";
import { validateSubExtension } from "../../validate/setting.validate.js";
import validationHandler from "../../middlewares/validationHandler.middleware.js";
const router = express.Router();
router.use(authentication);
router.post(
	"/",
	validateSubExtension,
	validationHandler,
	asyncHandler(SubExtensionController.create)
);
router.put(
	"/:id",
	asyncHandler(SubExtensionController.update),
	validateSubExtension,
	validationHandler
);
router.delete("/:id", asyncHandler(SubExtensionController.delete));

export default router;
