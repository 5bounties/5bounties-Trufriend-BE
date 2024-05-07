import { Router } from "express";
import {
	addCommentToPost,
	addLikeToPost,
	destroyPost,
	editPost,
	fetchAllPosts,
	fetchPostComments,
	fetchPostLikes,
	removeCommentFromPost,
	removeLikeFromPost,
	storePost,
} from "../controllers/post.controller";
import { requireAuth } from "../middlewares/auth";
import { deserializeToken } from "../middlewares/auth";
import { uploadImage } from "../middlewares/uploadImage";
import { validateBody, validateParams } from "../middlewares/validation";
import {
	commentParamSchema,
	createCommentFormSchema,
	createPostFormSchema,
	likeParamSchema,
	postIdParamSchema,
	updatePostFormSchema,
} from "../validations/post.validation";

export const postRouter: Router = Router();

postRouter.get("/", deserializeToken, requireAuth, fetchAllPosts);
postRouter.post(
	"/",
	deserializeToken,
	requireAuth,
	uploadImage.single("image"),
	validateBody(createPostFormSchema),
	storePost,
);
postRouter.put(
	"/:id",
	deserializeToken,
	requireAuth,
	validateParams(postIdParamSchema),
	validateBody(updatePostFormSchema),
	editPost,
);
postRouter.delete(
	"/:id",
	deserializeToken,
	requireAuth,
	validateParams(postIdParamSchema),
	destroyPost,
);

postRouter.get(
	"/:id/likes",
	deserializeToken,
	requireAuth,
	validateParams(postIdParamSchema),
	fetchPostLikes,
);
postRouter.post(
	"/:id/likes",
	deserializeToken,
	requireAuth,
	validateParams(postIdParamSchema),
	addLikeToPost,
);
postRouter.delete(
	"/:id/likes/:likeId",
	deserializeToken,
	requireAuth,
	validateParams(likeParamSchema),
	removeLikeFromPost,
);

postRouter.get(
	"/:id/comments",
	deserializeToken,
	requireAuth,
	validateParams(postIdParamSchema),
	fetchPostComments,
);
postRouter.post(
	"/:id/comments",
	deserializeToken,
	requireAuth,
	validateParams(postIdParamSchema),
	validateBody(createCommentFormSchema),
	addCommentToPost,
);
postRouter.delete(
	"/:id/comments/:commentId",
	deserializeToken,
	requireAuth,
	validateParams(commentParamSchema),
	removeCommentFromPost,
);
