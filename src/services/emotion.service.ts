import { Mood } from "@prisma/client";
import { db } from "../database/db";
import type { CreateEmotionForm } from "../types/emotion.type";

export const getAllEmotions = async () => {
	return db.emotion.findMany();
};

export const getEmotionById = async (id: string) => {
	return db.emotion.findUnique({
		where: {
			id: id,
		},
	});
};

export const getUserEmotions = async (userId: string) => {
	return db.emotion.findMany({
		where: {
			userId: userId,
		},
	});
};

export const createEmotion = async (emotion: CreateEmotionForm) => {
	emotion.mood =
		Object.values(Mood).find((mood) => mood === emotion.mood) || Mood.FINE;

	return db.emotion.create({
		data: {
			mood: emotion.mood,
			userId: emotion.userId,
		},
	});
};

export const deleteEmotion = async (id: string) => {
	return db.emotion.delete({
		where: {
			id: id,
		},
	});
};
