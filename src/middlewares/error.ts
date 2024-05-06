import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import type { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { ValidationError } from "joi";
import { ApiError } from "../utils/ApiError";

export const unknownEndpoint = (req: Request, res: Response) => {
	res.status(httpStatus.NOT_FOUND).send({
		status: httpStatus.NOT_FOUND,
		message: httpStatus[httpStatus.NOT_FOUND],
		data: [],
	});
};

export const errorHandlerEndpoint = (
	error: Error,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	res.locals.errorMessage = error.message;

	if (error instanceof ValidationError) {
		res.locals.errorMessage = error.details;

		res.status(httpStatus.BAD_REQUEST).send({
			status: httpStatus.BAD_REQUEST,
			message: res.locals.errorMessage,
			data: [],
		});
	} else if (error instanceof PrismaClientKnownRequestError) {
		// // Prisma error codes: https://www.prisma.io/docs/reference/api-reference/error-reference#error-codes
		switch (error.code) {
			case "P2025": {
				// P2025: Record not found
				res.locals.errorMessage = `Record not found on the ${error.meta?.target}`;

				res.status(httpStatus.NOT_FOUND).send({
					status: httpStatus.NOT_FOUND,
					message: res.locals.errorMessage,
					data: [],
				});
				break;
			}
			case "P2023": {
				// P2023: The provided value for the column is too long for the column's type
				res.locals.errorMessage = `The provided value for the column is too long for the column's type on the ${error.meta?.target}`;

				res.status(httpStatus.BAD_REQUEST).send({
					status: httpStatus.BAD_REQUEST,
					message: res.locals.errorMessage,
					data: [],
				});
				break;
			}
			case "P2016": {
				// P2016: The provided value for the column is too short for the column's type
				res.locals.errorMessage = `The provided value for the column is too short for the column's type on the ${error.meta?.target}`;

				res.status(httpStatus.BAD_REQUEST).send({
					status: httpStatus.BAD_REQUEST,
					message: res.locals.errorMessage,
					data: [],
				});
				break;
			}
			case "P2002": {
				// P2022: Unique constraint failed
				res.locals.errorMessage = `Unique constraint failed on the ${error.meta?.target}`;

				res.status(httpStatus.BAD_REQUEST).send({
					status: httpStatus.BAD_REQUEST,
					message: res.locals.errorMessage,
					data: [],
				});
				break;
			}
			default: {
				res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
					status: httpStatus.INTERNAL_SERVER_ERROR,
					message: httpStatus[httpStatus.INTERNAL_SERVER_ERROR],
					data: error.message,
				});
				break;
			}
		}
	} else if (error instanceof ApiError) {
		res.locals.errorMessage = error.message;

		res.status(error.statusCode).send({
			status: error.statusCode,
			message: res.locals.errorMessage,
			data: [],
		});
	} else {
		res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
			status: httpStatus.INTERNAL_SERVER_ERROR,
			message: httpStatus[httpStatus.INTERNAL_SERVER_ERROR],
			data: error.message,
		});
	}
};
