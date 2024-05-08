import httpStatus from "http-status";
import type { MutedWord } from "mutes.type";
import type {
	Comment,
	CreateCommentForm,
	CreatePostForm,
	Post,
	UpdatePostForm,
} from "post.type";
import { db } from "../database/db";
import { ApiError } from "../utils/ApiError";
import { logger } from "../utils/logger";

export const getAllPosts = async (mutedWords: MutedWord[]) => {
	const rawPosts = await db.post.findMany();

	const posts: Post[] = [];

	for (const rawPost of rawPosts) {
		const likes = await db.like.findMany({
			where: {
				postId: rawPost.id,
			},
		});

		const rawComments = await db.comment.findMany({
			where: {
				postId: rawPost.id,
			},
		});

		const comments: Comment[] = [];

		for (const rawComment of rawComments) {
			const comment: Comment = {
				...rawComment,
				isVisible: true,
			};

			for (const mutedWord of mutedWords) {
				if (
					comment.content.toLowerCase().includes(mutedWord.word.toLowerCase())
				) {
					comment.isVisible = false;
					break;
				}
			}

			comments.push(comment);
		}

		const post: Post = {
			...rawPost,
			likes,
			comments,
			isVisible: true,
		};

		for (const mutedWord of mutedWords) {
			if (post.content.toLowerCase().includes(mutedWord.word.toLowerCase())) {
				post.isVisible = false;
				break;
			}
		}

		posts.push(post);
	}

	return posts;
};

export const getPostById = async (id: string, mutedWords: MutedWord[]) => {
	const rawPost = await db.post.findUnique({
		where: {
			id,
		},
	});

	if (!rawPost) {
		throw new ApiError(httpStatus.NOT_FOUND, "Post not found");
	}

	const likes = await db.like.findMany({
		where: {
			postId: rawPost.id,
		},
	});

	const rawComments = await db.comment.findMany({
		where: {
			postId: rawPost.id,
		},
	});

	const comments: Comment[] = [];

	for (const rawComment of rawComments) {
		const comment: Comment = {
			...rawComment,
			isVisible: true,
		};

		for (const mutedWord of mutedWords) {
			if (
				comment.content.toLowerCase().includes(mutedWord.word.toLowerCase())
			) {
				comment.isVisible = false;
				break;
			}
		}

		comments.push(comment);
	}

	const post: Post = {
		...rawPost,
		likes,
		comments,
		isVisible: true,
	};

	for (const mutedWord of mutedWords) {
		if (post.content.toLowerCase().includes(mutedWord.word.toLowerCase())) {
			post.isVisible = false;
			break;
		}
	}

	return post;
};

export const getPostsByUserId = async (
	userId: string,
	mutedWords: MutedWord[],
) => {
	const rawPosts = await db.post.findMany({
		where: {
			authorId: userId,
		},
	});

	const posts: Post[] = [];

	for (const rawPost of rawPosts) {
		const likes = await db.like.findMany({
			where: {
				postId: rawPost.id,
			},
		});

		const rawComments = await db.comment.findMany({
			where: {
				postId: rawPost.id,
			},
		});

		const comments: Comment[] = [];

		for (const rawComment of rawComments) {
			const comment: Comment = {
				...rawComment,
				isVisible: true,
			};

			for (const mutedWord of mutedWords) {
				if (
					comment.content.toLowerCase().includes(mutedWord.word.toLowerCase())
				) {
					comment.isVisible = false;
					break;
				}
			}

			comments.push(comment);
		}

		const post: Post = {
			...rawPost,
			likes,
			comments,
			isVisible: true,
		};

		for (const mutedWord of mutedWords) {
			if (post.content.toLowerCase().includes(mutedWord.word.toLowerCase())) {
				post.isVisible = false;
				break;
			}
		}

		posts.push(post);
	}

	return posts;
};

export const createPost = async (post: CreatePostForm) => {
	return db.post.create({
		data: {
			content: post.content,
			imageUrl: post.imageUrl,
			authorId: post.authorId,
		},
	});
};

export const updatePost = async (id: string, post: UpdatePostForm) => {
	return db.post.update({
		where: {
			id: id,
		},
		data: {
			content: post.content,
		},
	});
};

export const deletePost = async (id: string) => {
	return db.post.delete({
		where: {
			id: id,
		},
	});
};

export const getPostLikes = async (postId: string) => {
	return db.like.findMany({
		where: {
			postId,
		},
	});
};

export const createLike = async (userId: string, postId: string) => {
	return db.like.create({
		data: {
			userId,
			postId,
		},
	});
};

export const deleteLike = async (id: string) => {
	return db.like.delete({
		where: {
			id,
		},
	});
};

export const getPostComments = async (
	postId: string,
	mutedWords: MutedWord[],
) => {
	const rawComments = await db.comment.findMany({
		where: {
			postId,
		},
	});

	const comments: Comment[] = [];

	for (const rawComment of rawComments) {
		const comment: Comment = {
			...rawComment,
			isVisible: true,
		};

		for (const mutedWord of mutedWords) {
			if (
				comment.content.toLowerCase().includes(mutedWord.word.toLowerCase())
			) {
				comment.isVisible = false;
				break;
			}
		}

		comments.push(comment);
	}

	return comments;
};

export const createComment = async (comment: CreateCommentForm) => {
	return db.comment.create({
		data: comment,
	});
};

export const deleteComment = async (id: string) => {
	return db.comment.delete({
		where: {
			id,
		},
	});
};
