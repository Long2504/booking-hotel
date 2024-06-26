"use strict";
import express from "express";

import {
    asyncHandler,
    authentication,
} from "../../middlewares/asyncHandler.middleware.js";
import HotelController from "../../controllers/hotel.controller.js";

const router = express.Router();
router.use(authentication);
router.post("/", asyncHandler(HotelController.create));

export default router;
