import type { Mood } from "@prisma/client";

export interface CreateEmotionForm {
	userId: string;
	mood: Mood;
}

export interface Emotion {
	id: string;
	mood: string;
	userId: string;
	createdAt: Date;
}
