"use strict";
import express from "express";

import {
    asyncHandler,
    authentication,
} from "../../middlewares/asyncHandler.middleware.js";
import HotelController from "../../controllers/hotel.controller.js";

const router = express.Router();
router.use(authentication);
router.post("/post", asyncHandler(HotelController.post));
router.get("/host", asyncHandler(HotelController.getAllForHost));

export default router;
