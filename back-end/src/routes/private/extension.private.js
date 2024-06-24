"use strict";
import express from "express";

import {
    asyncHandler,
    authentication,
} from "../../middlewares/asyncHandler.middleware.js";
import ExtensionController from "../../controllers/extension.controller.js";

const router = express.Router();
router.use(authentication);
router.post("/", asyncHandler(ExtensionController.create));
router.get("/", asyncHandler(ExtensionController.getAll));
router.get("/:id", asyncHandler(ExtensionController.get));
router.put("/:id", asyncHandler(ExtensionController.update));
router.delete("/:id", asyncHandler(ExtensionController.delete));

export default router;
