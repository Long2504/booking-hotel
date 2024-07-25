"use strict";
import express from "express";
import { asyncHandler } from "../../middlewares/asyncHandler.middleware.js";
import OrderController from "../../controllers/order.controller.js";

const router = express.Router();

router.post("/paypal", asyncHandler(OrderController.orderPaypal));
router.post(
	"/paypal/:orderId",
	asyncHandler(OrderController.captureOrderPaypal)
);

export default router;
