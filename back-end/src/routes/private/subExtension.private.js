"use strict";
import express from "express";

import {
    asyncHandler,
    authentication,
} from "../../middlewares/asyncHandler.middleware.js";
import SubExtensionController from "../../controllers/subExtension.controller.js";
const router = express.Router();
router.use(authentication);
router.post("/", asyncHandler(SubExtensionController.create));
router.put("/:id", asyncHandler(SubExtensionController.update));
router.delete("/:id", asyncHandler(SubExtensionController.delete));

export default router;
