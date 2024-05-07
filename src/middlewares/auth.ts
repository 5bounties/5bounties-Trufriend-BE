import type { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { ApiError } from "../utils/ApiError";
import { config } from "../utils/config";
import { verifyJwt } from "../utils/jwt";

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

export const deserializeToken = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const token = req.get("Authorization")?.split(" ")[1];
		if (!token) {
			throw new ApiError(httpStatus.UNAUTHORIZED, "Token is required");
		}

		const decoded = verifyJwt(token);

		if (!decoded) {
			throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid token");
		}

		res.locals.user = decoded;

		next();
	} catch (error) {
		next(error);
	}
};

export const requireAuth = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		if (!res.locals.user) {
			throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized");
		}

		next();
	} catch (error) {
		next(error);
	}
};
