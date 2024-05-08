export interface MutedWord {
	id: string;
	word: string;
	userId: string;
	createdAt: Date;
}

export interface CreateMutedWordForm {
	word: string;
	userId: string;
}
