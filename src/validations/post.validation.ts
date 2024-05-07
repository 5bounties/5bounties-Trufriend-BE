import Joi from "joi";

export const createPostFormSchema = Joi.object({
	content: Joi.string().required(),
});

export const updatePostFormSchema = Joi.object({
	content: Joi.string(),
});

export const postIdParamSchema = Joi.object({
	id: Joi.string().required(),
});

export const createCommentFormSchema = Joi.object({
	content: Joi.string().required(),
});

export const commentParamSchema = Joi.object({
	id: Joi.string().required(),
	commentId: Joi.string().required(),
});

export const likeParamSchema = Joi.object({
	id: Joi.string().required(),
	likeId: Joi.string().required(),
});
