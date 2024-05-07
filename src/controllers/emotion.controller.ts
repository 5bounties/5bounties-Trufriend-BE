import type { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import {
	createEmotion,
	deleteEmotion,
	getAllEmotions,
	getEmotionById,
	getUserEmotions,
} from "../services/emotion.service";

export const fetchAllEmotions = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const emotions = await getAllEmotions();

		return res.status(httpStatus.OK).send({
			status: httpStatus.OK,
			message: "Emotions fetched successfully",
			data: emotions,
		});
	} catch (error) {
		next(error);
	}
};

export const fetchAllUserEmotions = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const userId = req.params.userId;
		const emotions = await getUserEmotions(userId);

		return res.status(httpStatus.OK).send({
			status: httpStatus.OK,
			message: "User emotions fetched successfully",
			data: emotions,
		});
	} catch (error) {
		next(error);
	}
};

export const storeEmotion = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		req.body.userId = res.locals.user.id;
		const emotion = await createEmotion(req.body);

		return res.status(httpStatus.CREATED).send({
			status: httpStatus.CREATED,
			message: "Emotion created successfully",
			data: emotion,
		});
	} catch (error) {
		next(error);
	}
};

export const destroyEmotion = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const emotionId = req.params.id;

		await getEmotionById(emotionId);
		await deleteEmotion(emotionId);

		return res.status(httpStatus.OK).send({
			status: httpStatus.OK,
			message: "Emotion deleted successfully",
			data: [],
		});
	} catch (error) {
		next(error);
	}
};
