import type { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import {
	createUser,
	getUserByEmail,
	getUserByUsername,
} from "../services/user.service";
import type { User } from "../types/user.type";
import { ApiError } from "../utils/ApiError";
import { checkPassword } from "../utils/bcrypt";
import { signJwt } from "../utils/jwt";

export const login = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		let user: User | null = null;

		if (req.body.username) {
			user = await getUserByUsername(req.body.username);
		}

		if (req.body.email) {
			user = await getUserByEmail(req.body.email);
		}

		if (!user) {
			throw new ApiError(httpStatus.NOT_FOUND, "User not found");
		}

		const isValid = checkPassword(req.body.password, user.password);
		if (!isValid) {
			throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid password");
		}

		const token = signJwt(user);

		return res.status(httpStatus.OK).send({
			status: httpStatus.OK,
			message: "User logged in successfully",
			data: {
				id: user.id,
				name: user.name,
				email: user.email,
				username: user.username,
				avatarUrl: user.avatarUrl,
				token,
			},
		});
	} catch (error) {
		next(error);
	}
};

export const register = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		req.body.avatarUrl = (req.file as any).location;
		const newUser = await createUser(req.body);

		return res.status(httpStatus.CREATED).send({
			status: httpStatus.CREATED,
			message: "User created successfully",
			data: {
				id: newUser.id,
				name: newUser.name,
				email: newUser.email,
				username: newUser.username,
				avatarUrl: newUser.avatarUrl,
			},
		});
	} catch (error) {
		next(error);
	}
};
