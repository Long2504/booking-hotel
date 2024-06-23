"use strict";
import express from "express";
import AuthController from "../../controllers/auth.controller.js";
import { asyncHandler } from "../../middlewares/asyncHandler.middleware.js";

const router = express.Router();

router.post("/sign-up", asyncHandler(AuthController.signUp));
router.post("/sign-in", asyncHandler(AuthController.signIn));
router.post("/refresh-token", asyncHandler(AuthController.handlerRefreshToken));
router.post("/access-token", asyncHandler(AuthController.handlerAccessToken));
export default router;
