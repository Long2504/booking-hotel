"use strict";
import express from "express";

import {
    asyncHandler,
    authentication,
} from "../../middlewares/asyncHandler.middleware.js";
import RoomTypeController from "../../controllers/roomType.controller.js";
const router = express.Router();
router.use(authentication);
router.post("/", asyncHandler(RoomTypeController.create));
router.get("/", asyncHandler(RoomTypeController.getAll));
router.get("/:id", asyncHandler(RoomTypeController.get));
router.put("/:id", asyncHandler(RoomTypeController.update));
router.delete("/:id", asyncHandler(RoomTypeController.delete));

export default router;
