import type { User, UserResponse } from "user.type";

export interface CreatePostForm {
	content: string;
	imageUrl: string;
	authorId: string;
}

export interface UpdatePostForm {
	content: string;
	imageUrl: string;
}

export interface CreateCommentForm {
	content: string;
	userId: string;
	postId: string;
}

export interface Like {
	id: string;
	userId: string;
	postId: string;
	createdAt: Date;
}

export interface Comment {
	id: string;
	content: string;
	userId: string;
	postId: string;
	isVisible: boolean;
	createdAt: Date;
}

export interface Post {
	id: string;
	content: string;
	imageUrl: string;
	authorId: string;
	likes: Like[];
	comments: Comment[];
	isVisible: boolean;
	createdAt: Date;
}

export interface PostResponse {
	id: string;
	content: string;
	imageUrl: string;
	author: UserResponse;
	likes: Like[];
	comments: CommentResponse[];
	isVisible: boolean;
	createdAt: Date;
}

export interface CommentResponse {
	id: string;
	content: string;
	user: UserResponse;
	postId: string;
	isVisible: boolean;
	createdAt: Date;
}

export interface LikeResponse {
	id: string;
	user: UserResponse;
	postId: string;
	createdAt: Date;
}
