import type { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import {
	createMutedWord,
	deleteMutedWord,
	getAllMutedWords,
	getMutedWordById,
} from "../services/mutes.service";

export const fetchAllMutedWords = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const mutedWords = await getAllMutedWords();

		return res.status(httpStatus.OK).send({
			status: httpStatus.OK,
			message: "Muted words fetched successfully",
			data: mutedWords,
		});
	} catch (error) {
		next(error);
	}
};

export const storeMutedWord = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		req.body.userId = res.locals.user.id;
		const mutedWord = await createMutedWord(req.body);

		return res.status(httpStatus.CREATED).send({
			status: httpStatus.CREATED,
			message: "Muted word created successfully",
			data: mutedWord,
		});
	} catch (error) {
		next(error);
	}
};

export const destroyMutedWord = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		await getMutedWordById(req.params.id);
		await deleteMutedWord(req.params.id);

		return res.status(httpStatus.OK).send({
			status: httpStatus.OK,
			message: "Muted word deleted successfully",
			data: [],
		});
	} catch (error) {
		next(error);
	}
};
