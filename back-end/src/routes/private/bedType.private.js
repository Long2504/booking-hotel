"use strict";
import express from "express";

import {
    asyncHandler,
    authentication,
} from "../../middlewares/asyncHandler.middleware.js";
import BedTypeController from "../../controllers/bedType.controller.js";
const router = express.Router();
router.use(authentication);
router.post("/", asyncHandler(BedTypeController.create));
router.get("/", asyncHandler(BedTypeController.getAll));
router.get("/:id", asyncHandler(BedTypeController.get));
router.put("/:id", asyncHandler(BedTypeController.update));
router.delete("/:id", asyncHandler(BedTypeController.delete));

export default router;
