"use strict";
import express from "express";
import routerAuth from "./auth.public.js";
import routerHotel from "./hotel.public.js";
const router = express.Router();

router.use("/auth", routerAuth);
router.use("/hotel", routerHotel);
export default router;
