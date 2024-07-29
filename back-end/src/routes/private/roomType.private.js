"use strict";
import express from "express";

import {
	asyncHandler,
	authentication,
} from "../../middlewares/asyncHandler.middleware.js";
import RoomTypeController from "../../controllers/roomType.controller.js";
import { validateRoomType } from "../../validate/setting.validate.js";
import validationHandler from "../../middlewares/validationHandler.middleware.js";
const router = express.Router();
router.use(authentication);
router.post(
	"/",
	validateRoomType,
	validationHandler,
	asyncHandler(RoomTypeController.create)
);
router.get("/", asyncHandler(RoomTypeController.getAll));
router.get("/:id", asyncHandler(RoomTypeController.get));
router.put(
	"/:id",
	validateRoomType,
	validationHandler,
	asyncHandler(RoomTypeController.update)
);
router.delete("/:id", asyncHandler(RoomTypeController.delete));

export default router;
