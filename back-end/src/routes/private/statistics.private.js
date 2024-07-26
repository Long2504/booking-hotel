"use strict";
import express from "express";

import {
	asyncHandler,
	authentication,
} from "../../middlewares/asyncHandler.middleware.js";
import StatisticsController from "../../controllers/statistics.controller.js";

const router = express.Router();

router.get(
	"/dashboard/admin",
	asyncHandler(StatisticsController.getForDashboardAdmin)
);
export default router;
