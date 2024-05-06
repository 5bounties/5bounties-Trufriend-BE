import path from "node:path";
import httpStatus from "http-status";
import multer from "multer";
import { multerS3 } from "../database/s3";
import { ApiError } from "../utils/ApiError";

// function to sanitize files and send error for unsupported files
const sanitizeFile = (
	file: Express.Multer.File,
	cb: multer.FileFilterCallback,
) => {
	// Define the allowed extension
	const fileExts = [".png", ".jpg", ".jpeg", ".gif"];

	// Check allowed extensions
	const isAllowedExt = fileExts.includes(
		path.extname(file.originalname.toLowerCase()),
	);

	// Mime type must be an image
	const isAllowedMimeType = file.mimetype.startsWith("image/");

	if (isAllowedExt && isAllowedMimeType) {
		return cb(null, true); // no errors
	}

	// pass error msg to callback, which can be displayed in frontend
	cb(new ApiError(httpStatus.BAD_REQUEST, "File type not allowed!"));
};

// our middleware
export const uploadImage = multer({
	storage: multerS3,
	fileFilter: (req, file, cb) => {
		sanitizeFile(file, cb);
	},
	limits: {
		fileSize: 1024 * 1024 * 2, // 2mb file size
	},
});
