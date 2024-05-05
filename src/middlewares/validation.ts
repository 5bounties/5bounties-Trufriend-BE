import type { NextFunction, Request, Response } from "express";
import type Joi from "joi";

export const validateBody =
	(schema: Joi.ObjectSchema) =>
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			await schema.validateAsync(req.body);
			next();
		} catch (error) {
			next(error);
		}
	};

export const validateParams =
	(schema: Joi.ObjectSchema) =>
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			await schema.validateAsync(req.params);
			next();
		} catch (error) {
			next(error);
		}
	};
