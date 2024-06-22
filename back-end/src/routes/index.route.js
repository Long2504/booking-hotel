"use strict";
import express from "express";
import routerPublic from "./public/index.js";
import routerPrivate from "./private/index.js";

const router = express.Router();

router.use("/public", routerPublic);

router.use("/private", routerPrivate);

export default router;
