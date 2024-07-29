"use strict";
import express from "express";

import {
	asyncHandler,
	authentication,
} from "../../middlewares/asyncHandler.middleware.js";
import ExtensionController from "../../controllers/extension.controller.js";
import { validateExtension } from "../../validate/setting.validate.js";
import validationHandler from "../../middlewares/validationHandler.middleware.js";

const router = express.Router();
router.use(authentication);
router.post(
	"/",
	validateExtension,
	validationHandler,
	asyncHandler(ExtensionController.create)
);
router.get("/", asyncHandler(ExtensionController.getAll));
router.get("/:id", asyncHandler(ExtensionController.get));
router.put(
	"/:id",
	validateExtension,
	validationHandler,
	asyncHandler(ExtensionController.update)
);
router.delete("/:id", asyncHandler(ExtensionController.delete));

export default router;
