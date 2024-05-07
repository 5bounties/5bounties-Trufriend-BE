import { Mood } from "@prisma/client";
import type { CreateJournalForm, UpdateJournalForm } from "journal.type";
import { db } from "../database/db";

export const getAllJournals = async () => {
	return db.journal.findMany();
};

export const getJournalById = async (id: string) => {
	return db.journal.findUnique({
		where: {
			id: id,
		},
	});
};

export const getJournalsByUserId = async (userId: string) => {
	return db.journal.findMany({
		where: {
			userId: userId,
		},
	});
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
