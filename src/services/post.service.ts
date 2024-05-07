import type {
	CreateCommentForm,
	CreatePostForm,
	Post,
	UpdatePostForm,
} from "post.type";
import { db } from "../database/db";

export const getAllPosts = async () => {
	const rawPosts = await db.post.findMany();

	const posts: Post[] = [];

	for (const rawPost of rawPosts) {
		const likes = await db.like.findMany({
			where: {
				postId: rawPost.id,
			},
		});

		const comments = await db.comment.findMany({
			where: {
				postId: rawPost.id,
			},
		});

		const post: Post = {
			...rawPost,
			likes,
			comments,
		};

		posts.push(post);
	}

	return posts;
};

export const getPostById = async (id: string) => {
	return {
		...(await db.post.findUnique({
			where: {
				id: id,
			},
		})),
		likes: await db.like.findMany({
			where: {
				postId: id,
			},
		}),
		comments: await db.comment.findMany({
			where: {
				postId: id,
			},
		}),
	};
};

export const getPostsByUserId = async (userId: string) => {
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

		const comments = await db.comment.findMany({
			where: {
				postId: rawPost.id,
			},
		});

		const post: Post = {
			...rawPost,
			likes,
			comments,
		};

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

export const getPostComments = async (postId: string) => {
	return db.comment.findMany({
		where: {
			postId,
		},
	});
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
