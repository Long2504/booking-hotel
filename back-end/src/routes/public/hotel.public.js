"use strict";
import express from "express";
import { asyncHandler } from "../../middlewares/asyncHandler.middleware.js";
import HotelController from "../../controllers/hotel.controller.js";
const router = express.Router();

router.get("/", asyncHandler(HotelController.getAll));
router.get("/:id", asyncHandler(HotelController.get));
export default router;
