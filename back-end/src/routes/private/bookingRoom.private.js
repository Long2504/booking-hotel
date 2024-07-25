"use strict";
import express from "express";

import {
	asyncHandler,
} from "../../middlewares/asyncHandler.middleware.js";
import BookingRoomController from "../../controllers/bookingRoom.controller.js";

const router = express.Router();

router.get("/host", asyncHandler(BookingRoomController.getAllForHost));
router.post("/host", asyncHandler(BookingRoomController.createForHost));
router.get(
	"/host/room-available",
	asyncHandler(BookingRoomController.getRoomsIsAvailableByHotelIdForHost)
);
router.delete("/host/:id", asyncHandler(BookingRoomController.deleteForHost));

export default router;
