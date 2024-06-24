"use strict";
import express from "express";
import routerAuth from "./auth.private.js";
import routerExtension from "./extension.private.js";
import routerSubExtension from "./subExtension.private.js";

const router = express.Router();

router.use("/auth", routerAuth);
router.use("/extension", routerExtension);
router.use("/sub-extension", routerSubExtension);

export default router;
