"use strict";
import express from "express";
import AuthController from "../../controllers/auth.controller.js";
import { asyncHandler } from "../../middlewares/asyncHandler.middleware.js";

const router = express.Router();

router.post("/signup", asyncHandler(AuthController.signUp));
router.post("/signin", asyncHandler(AuthController.signIn));

export default router;
