import type { CreateMutedWordForm } from "mutes.type";
import { db } from "../database/db";

export const getAllMutedWords = async () => {
	return await db.mutedWord.findMany();
};

export const getMutedWordById = async (id: string) => {
	return await db.mutedWord.findUnique({
		where: {
			id,
		},
	});
};

export const getMutedWordsByUserId = async (userId: string) => {
	return await db.mutedWord.findMany({
		where: {
			userId,
		},
	});
};

export const createMutedWord = async (mutedWord: CreateMutedWordForm) => {
	return await db.mutedWord.create({
		data: mutedWord,
	});
};

export const deleteMutedWord = async (id: string) => {
	return await db.mutedWord.delete({
		where: {
			id,
		},
	});
};
