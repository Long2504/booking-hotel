"use strict";
import express from "express";
import routerAuth from "./auth.private.js";
import routerExtension from "./extension.private.js";
import routerSubExtension from "./subExtension.private.js";
import routerBedType from "./bedType.private.js";
import routerRoomType from "./roomType.private.js";
import routerHotel from "./hotel.private.js";
import routerMedia from "./media.private.js";
const router = express.Router();

router.use("/auth", routerAuth);
router.use("/extension", routerExtension);
router.use("/sub-extension", routerSubExtension);
router.use("/bed-type", routerBedType);
router.use("/room-type", routerRoomType);
router.use("/hotel", routerHotel);
router.use("/media", routerMedia);
export default router;
