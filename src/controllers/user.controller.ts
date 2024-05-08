import type { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import {
	getJournalById,
	getJournalsByUserId,
} from "../services/journal.service";
import { getMutedWordsByUserId } from "../services/mutes.service";
import { getPostById, getPostsByUserId } from "../services/post.service";
import {
	createUser,
	deleteUser,
	getAllUsers,
	getUserById,
	updateUser,
} from "../services/user.service";

export const fetchAllUsers = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const users = await getAllUsers();

		return res.status(httpStatus.OK).send({
			status: httpStatus.OK,
			message: "Users retrieved successfully",
			data: users,
		});
	} catch (error) {
		next(error);
	}
};

export const fetchUser = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const user = await getUserById(req.params.id);

		return res.status(httpStatus.OK).send({
			status: httpStatus.OK,
			message: "User retrieved successfully",
			data: user,
		});
	} catch (error) {
		next(error);
	}
};

export const storeUser = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		req.body.avatarUrl = (req.file as any).location;
		const newUser = await createUser(req.body);

		return res.status(httpStatus.CREATED).send({
			status: httpStatus.CREATED,
			message: "User created successfully",
			data: {
				id: newUser.id,
				name: newUser.name,
				email: newUser.email,
				username: newUser.username,
				avatarUrl: newUser.avatarUrl,
			},
		});
	} catch (error) {
		next(error);
	}
};

export const editUser = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = req.params.id;
		await getUserById(id); // if user not found then throw error
		const updatedUser = await updateUser(id, req.body);

		return res.status(httpStatus.OK).send({
			status: httpStatus.OK,
			message: "User updated successfully",
			data: {
				id: updatedUser.id,
				name: updatedUser.name,
				email: updatedUser.email,
				username: updatedUser.username,
			},
		});
	} catch (error) {
		next(error);
	}
};

export const destroyUser = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = req.params.id;

		await getUserById(id); // if user not found then throw error
		await deleteUser(id);

		return res.status(httpStatus.OK).send({
			status: httpStatus.OK,
			message: "User deleted successfully",
			data: [],
		});
	} catch (error) {
		next(error);
	}
};

export const fetchUserJournals = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = res.locals.user.id;
		const journals = await getJournalsByUserId(id);

		return res.status(httpStatus.OK).send({
			status: httpStatus.OK,
			message: "Journals retrieved successfully",
			data: journals,
		});
	} catch (error) {
		next(error);
	}
};

export const fetchJournal = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const journal = await getJournalById(req.params.id);

		return res.status(httpStatus.OK).send({
			status: httpStatus.OK,
			message: "Journal fetched successfully",
			data: journal,
		});
	} catch (error) {
		next(error);
	}
};

export const fetchUserPosts = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = res.locals.user.id;
		const mutedWords = await getMutedWordsByUserId(id);
		const posts = await getPostsByUserId(id, mutedWords);

		return res.status(httpStatus.OK).send({
			status: httpStatus.OK,
			message: "Posts retrieved successfully",
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
		const mutedWords = await getMutedWordsByUserId(res.locals.user.id);
		const post = await getPostById(req.params.id, mutedWords);

		return res.status(httpStatus.OK).send({
			status: httpStatus.OK,
			message: "Post fetched successfully",
			data: post,
		});
	} catch (error) {
		next(error);
	}
};

export const fetchUserMutedWords = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const mutedWords = await getMutedWordsByUserId(res.locals.user.id);

		return res.status(httpStatus.OK).send({
			status: httpStatus.OK,
			message: "Muted words fetched successfully",
			data: mutedWords,
		});
	} catch (error) {
		next(error);
	}
};
