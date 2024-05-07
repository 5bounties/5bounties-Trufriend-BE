import Joi from "joi";

export const userIdParamSchema = Joi.object({
	id: Joi.string().required(),
});

export const createEmotionFormSchema = Joi.object({
	mood: Joi.string()
		.valid("fine", "sad", "awesome", "angry", "worried")
		.required(),
});

export const emotionIdParamSchema = Joi.object({
	id: Joi.string().required(),
});
