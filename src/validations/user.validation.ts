import Joi from "joi";

export const createUserFormSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().email().required(),
	password: Joi.string().required(),
	username: Joi.string().required(),
});

export const updateUserFormSchema = Joi.object({
	name: Joi.string(),
	email: Joi.string().email(),
	password: Joi.string(),
	username: Joi.string(),
});

export const userIdParamSchema = Joi.object({
	id: Joi.string().required(),
});
