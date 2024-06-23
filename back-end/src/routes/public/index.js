"use strict";
import express from "express";
import routerAuth from "./auth.public.js";
const router = express.Router();

router.use("/auth", routerAuth);
export default router;
