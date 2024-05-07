import type { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import {
	createComment,
	createLike,
	createPost,
	deleteComment,
	deleteLike,
	deletePost,
	getAllPosts,
	getPostById,
	getPostComments,
	getPostLikes,
	updatePost,
} from "../services/post.service";

export const fetchAllPosts = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const posts = await getAllPosts();

		return res.status(httpStatus.OK).send({
			status: httpStatus.OK,
			message: "Posts fetched successfully",
			data: posts,
		});
	} catch (error) {
		next(error);
	}
};

export const fetchPost = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const post = await getPostById(req.params.id);

		return res.status(httpStatus.OK).send({
			status: httpStatus.OK,
			message: "Post fetched successfully",
			data: post,
		});
	} catch (error) {
		next(error);
	}
};

export const storePost = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		req.body.authorId = res.locals.user.id;
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		req.body.imageUrl = (req.file as any).location;
		const post = await createPost(req.body);

		return res.status(httpStatus.CREATED).send({
			status: httpStatus.CREATED,
			message: "Post created successfully",
			data: post,
		});
	} catch (error) {
		next(error);
	}
};

export const editPost = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const post = await updatePost(req.params.id, req.body);

		return res.status(httpStatus.OK).send({
			status: httpStatus.OK,
			message: "Post updated successfully",
			data: post,
		});
	} catch (error) {
		next(error);
	}
};

export const destroyPost = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		await deletePost(req.params.id);

		return res.status(httpStatus.OK).send({
			status: httpStatus.OK,
			message: "Post deleted successfully",
			data: [],
		});
	} catch (error) {
		next(error);
	}
};

export const fetchPostLikes = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const likes = await getPostLikes(req.params.id);

		return res.status(httpStatus.OK).send({
			status: httpStatus.OK,
			message: "Post likes fetched successfully",
			data: likes,
		});
	} catch (error) {
		next(error);
	}
};

export const addLikeToPost = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const like = await createLike(res.locals.user.id, req.params.id);

		return res.status(httpStatus.CREATED).send({
			status: httpStatus.CREATED,
			message: "Like added successfully",
			data: like,
		});
	} catch (error) {
		next(error);
	}
};

export const removeLikeFromPost = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		await deleteLike(req.params.likeId);

		return res.status(httpStatus.OK).send({
			status: httpStatus.OK,
			message: "Like removed successfully",
			data: [],
		});
	} catch (error) {
		next(error);
	}
};

export const fetchPostComments = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const comments = await getPostComments(req.params.id);

		return res.status(httpStatus.OK).send({
			status: httpStatus.OK,
			message: "Post comments fetched successfully",
			data: comments,
		});
	} catch (error) {
		next(error);
	}
};

export const addCommentToPost = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		req.body.userId = res.locals.user.id;
		req.body.postId = req.params.id;
		const comment = await createComment(req.body);

		return res.status(httpStatus.CREATED).send({
			status: httpStatus.CREATED,
			message: "Comment added successfully",
			data: comment,
		});
	} catch (error) {
		next(error);
	}
};

export const removeCommentFromPost = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		await deleteComment(req.params.commentId);

		return res.status(httpStatus.OK).send({
			status: httpStatus.OK,
			message: "Comment removed successfully",
			data: [],
		});
	} catch (error) {
		next(error);
	}
};
