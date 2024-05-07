import Joi from "joi";

export const createJournalFormSchema = Joi.object({
	mood: Joi.string()
		.valid("fine", "sad", "awesome", "angry", "worried")
		.required(),
	content: Joi.string().required(),
});

export const updateJournalFormSchema = Joi.object({
	mood: Joi.string()
		.valid("fine", "sad", "awesome", "angry", "worried")
		.required(),
	content: Joi.string().required(),
});

export const journalIdParamSchema = Joi.object({
	id: Joi.string().required(),
});
