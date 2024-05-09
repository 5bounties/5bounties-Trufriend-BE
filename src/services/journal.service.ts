import { Mood } from "@prisma/client";
import httpStatus from "http-status";
import type {
	CreateJournalForm,
	JournalResponse,
	UpdateJournalForm,
} from "journal.type";
import { db } from "../database/db";
import { ApiError } from "../utils/ApiError";

export const getAllJournals = async (): Promise<JournalResponse[]> => {
	const rawJournals = await db.journal.findMany();

	const journals: JournalResponse[] = [];

	for (const rawJournal of rawJournals) {
		const user = await db.user.findUnique({
			where: {
				id: rawJournal.userId,
			},
			select: {
				id: true,
				name: true,
				username: true,
				email: true,
				avatarUrl: true,
				createdAt: true,
				updatedAt: true,
			},
		});

		if (!user) {
			throw new ApiError(httpStatus.NOT_FOUND, "User not found");
		}

		const journal: JournalResponse = {
			id: rawJournal.id,
			user: user,
			content: rawJournal.content,
			mood: rawJournal.mood,
			createdAt: rawJournal.createdAt,
			updatedAt: rawJournal.updatedAt,
		};

		journals.push(journal);
	}

	return journals;
};

export const getJournalById = async (id: string): Promise<JournalResponse> => {
	const rawJournal = await db.journal.findUnique({
		where: {
			id: id,
		},
	});

	if (!rawJournal) {
		throw new ApiError(httpStatus.NOT_FOUND, "Journal not found");
	}

	const user = await db.user.findUnique({
		where: {
			id: rawJournal.userId,
		},
		select: {
			id: true,
			name: true,
			username: true,
			email: true,
			avatarUrl: true,
			createdAt: true,
			updatedAt: true,
		},
	});

	if (!user) {
		throw new ApiError(httpStatus.NOT_FOUND, "User not found");
	}

	const journal: JournalResponse = {
		id: rawJournal.id,
		user: user,
		content: rawJournal.content,
		mood: rawJournal.mood,
		createdAt: rawJournal.createdAt,
		updatedAt: rawJournal.updatedAt,
	};

	return journal;
};

export const getJournalsByUserId = async (
	userId: string,
): Promise<JournalResponse[]> => {
	const rawJournals = await db.journal.findMany({
		where: {
			userId: userId,
		},
	});

	const journals: JournalResponse[] = [];

	for (const rawJournal of rawJournals) {
		const user = await db.user.findUnique({
			where: {
				id: rawJournal.userId,
			},
			select: {
				id: true,
				name: true,
				username: true,
				email: true,
				avatarUrl: true,
				createdAt: true,
				updatedAt: true,
			},
		});

		if (!user) {
			throw new ApiError(httpStatus.NOT_FOUND, "User not found");
		}

		const journal: JournalResponse = {
			id: rawJournal.id,
			user: user,
			content: rawJournal.content,
			mood: rawJournal.mood,
			createdAt: rawJournal.createdAt,
			updatedAt: rawJournal.updatedAt,
		};

		journals.push(journal);
	}

	return journals;
};

export const createJournal = async (journal: CreateJournalForm) => {
	journal.mood =
		Object.values(Mood).find((mood) => mood === journal.mood) || Mood.FINE;

	return db.journal.create({
		data: {
			content: journal.content,
			mood: journal.mood,
			userId: journal.userId,
		},
	});
};

export const updateJournal = async (id: string, journal: UpdateJournalForm) => {
	journal.mood =
		Object.values(Mood).find((mood) => mood === journal.mood) || Mood.FINE;

	return db.journal.update({
		where: {
			id: id,
		},
		data: {
			content: journal.content,
			mood: journal.mood,
		},
	});
};

export const deleteJournal = async (id: string) => {
	return db.journal.delete({
		where: {
			id: id,
		},
	});
};
