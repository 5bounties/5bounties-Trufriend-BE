import type { Mood } from "@prisma/client";

export interface CreateJournalForm {
	userId: string;
	content: string;
	mood: Mood;
}

export interface UpdateJournalForm {
	content: string;
	mood: Mood;
}
