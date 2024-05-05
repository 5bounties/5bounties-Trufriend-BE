import Joi from "joi";

export const loginFormSchema = Joi.object({
	email: Joi.string().email(),
	username: Joi.string(),
	password: Joi.string().required(),
});

export const registerFormSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().email().required(),
	password: Joi.string().required().min(6),
	username: Joi.string().required(),
});
