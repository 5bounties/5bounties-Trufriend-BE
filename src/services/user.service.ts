import { db } from "../database/db";
import type { CreateUserForm, UpdateUserForm } from "../types/user.type";
import { hashPassword } from "../utils/bcrypt";

export const getAllUsers = async () => {
	const users = db.user.findMany({
		select: {
			id: true,
			name: true,
			username: true,
			email: true,
			avatarUrl: true,
			createdAt: true,
			updatedAt: true,
		},
	});

	return users;
};

export const getUserById = async (id: string) => {
	const user = db.user.findUniqueOrThrow({
		where: {
			id,
		},
		select: {
			id: true,
			name: true,
			username: true,
			email: true,
			avatarUrl: true,
			createdAt: true,
			updatedAt: true,
		},
	});

	return user;
};

export const getUserByEmail = async (email: string) => {
	const user = db.user.findUniqueOrThrow({
		where: {
			email,
		},
	});

	return user;
};

export const getUserByUsername = async (username: string) => {
	const user = db.user.findUniqueOrThrow({
		where: {
			username,
		},
	});

	return user;
};

export const createUser = async (user: CreateUserForm) => {
	user.password = await hashPassword(user.password);

	const newUser = db.user.create({
		data: user,
	});

	return newUser;
};

export const updateUser = async (id: string, user: UpdateUserForm) => {
	if (user.password) {
		user.password = await hashPassword(user.password);
	}

	const updatedUser = db.user.update({
		where: {
			id,
		},
		data: user,
	});

	return updatedUser;
};

export const deleteUser = async (id: string) => {
	const deletedUser = db.user.delete({
		where: {
			id,
		},
	});

	return deletedUser;
};
