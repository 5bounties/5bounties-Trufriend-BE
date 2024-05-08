import Joi from "joi";

export const createMutedWordFormSchema = Joi.object({
	word: Joi.string().required(),
});

export const mutedWordIdParams = Joi.object({
	id: Joi.string().required(),
});
