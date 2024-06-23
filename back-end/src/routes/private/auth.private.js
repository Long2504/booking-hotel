"use strict";
import express from "express";
import AuthController from "../../controllers/auth.controller.js";
import { asyncHandler, authentication } from "../../middlewares/asyncHandler.middleware.js";

const router = express.Router();
router.use(authentication);
router.post("/signout", asyncHandler(AuthController.signOut));

export default router;
