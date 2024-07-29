"use strict";
import express from "express";
import AuthController from "../../controllers/auth.controller.js";
import { asyncHandler } from "../../middlewares/asyncHandler.middleware.js";
import validationHandler from "../../middlewares/validationHandler.middleware.js";
import { validateSignIn, validateSignInByGoogle } from "../../validate/auth.validate.js";

const router = express.Router();

router.post(
	"/sign-up",
	asyncHandler(AuthController.signUp)
);
router.post(
	"/sign-in",
	validateSignIn,
	validationHandler,
	asyncHandler(AuthController.signIn)
);
router.post("/sign-in-by-google",
    validateSignInByGoogle,
    validationHandler,
    asyncHandler(AuthController.signInByGoogle));
router.post("/refresh-token", asyncHandler(AuthController.handlerRefreshToken));
router.post("/access-token", asyncHandler(AuthController.handlerAccessToken));

export default router;
