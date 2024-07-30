"use strict";
import express from "express";

import {
	asyncHandler,
	authentication,
} from "../../middlewares/asyncHandler.middleware.js";
import HotelController from "../../controllers/hotel.controller.js";

const router = express.Router();
router.use(authentication);
router.get("/host", asyncHandler(HotelController.getAllForHost));
router.post(
	"/host/create-and-post",
	asyncHandler(HotelController.createAndPost)
);
router.post(
	"/host/create-and-draft",
	asyncHandler(HotelController.createAndSaveDraft)
);

router.get("/host/draft", asyncHandler(HotelController.getAllForHostDraft));

router.get("/admin", asyncHandler(HotelController.getAllForAdmin));

export default router;
