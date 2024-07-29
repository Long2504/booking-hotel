"use strict";
import express from "express";

import {
	asyncHandler,
	authentication,
} from "../../middlewares/asyncHandler.middleware.js";
import BedTypeController from "../../controllers/bedType.controller.js";
import { validateBedType } from "../../validate/setting.validate.js";
import validationHandler from "../../middlewares/validationHandler.middleware.js";
const router = express.Router();
router.use(authentication);
router.post(
	"/",
	validateBedType,
	validationHandler,
	asyncHandler(BedTypeController.create)
);
router.get("/", asyncHandler(BedTypeController.getAll));
router.get("/:id", asyncHandler(BedTypeController.get));
router.put(
	"/:id",
	validateBedType,
	validationHandler,
	asyncHandler(BedTypeController.update)
);
router.delete("/:id", asyncHandler(BedTypeController.delete));

export default router;
