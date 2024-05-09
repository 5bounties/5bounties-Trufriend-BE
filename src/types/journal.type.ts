import type { Mood } from "@prisma/client";
import type { User, UserResponse } from "user.type";

export interface CreateJournalForm {
	userId: string;
	content: string;
	mood: Mood;
}

export interface UpdateJournalForm {
	content: string;
	mood: Mood;
}

export interface Journal {
	id: string;
	userId: string;
	content: string;
	mood: Mood;
	createdAt: Date;
	updatedAt: Date;
}

export interface JournalResponse {
	id: string;
	user: UserResponse;
	content: string;
	mood: Mood;
	createdAt: Date;
	updatedAt: Date;
}
