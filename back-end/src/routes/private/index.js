"use strict";
import express from "express";
import routerAuth from "./auth.private.js";
import routerExtension from "./extension.private.js";

const router = express.Router();

router.use("/auth", routerAuth);
router.use("/extension", routerExtension);

export default router;
