"use strict";
import express from "express";
import multer, { diskStorage } from "multer";
import MediaController from "../../controllers/media.controller.js";
import { extname } from "path";
import { asyncHandler, authentication } from "../../middlewares/asyncHandler.middleware.js";
const router = express.Router();

const storage = diskStorage({
	destination: "./uploads/",
	filename: function (req, file, cb) {
		cb(null, file.filename + "-" + Date.now() + extname(file.originalname));
	},
});

const upload = multer({ storage: storage });
// router.use(authentication);
router.post(
	"/upload-img",
	upload.single("image"),
	asyncHandler(MediaController.uploadImage)
);
router.get("/img/:id", asyncHandler(MediaController.getImg));

export default router;
