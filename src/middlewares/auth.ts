import type { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { ApiError } from "../utils/ApiError";
import { config } from "../utils/config";

export const requireSuperadmin = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const token = req.get("superadmin");
		if (!token) {
			throw new ApiError(
				httpStatus.UNAUTHORIZED,
				"Superadmin token is required",
			);
		}

		// Check if the token is valid
		if (token !== config.superadminApiKey) {
			throw new ApiError(httpStatus.FORBIDDEN, "Invalid superadmin token");
		}

		next();
	} catch (error) {
		next(error);
	}
};
