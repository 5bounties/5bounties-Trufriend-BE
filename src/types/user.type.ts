export interface CreateUserForm {
	name: string;
	username: string;
	email: string;
	password: string;
	avatarUrl: string;
}

export interface UpdateUserForm {
	name?: string;
	username?: string;
	email?: string;
	password?: string;
}

export interface User {
	id: string;
	name: string;
	username: string;
	email: string;
	avatarUrl: string;
	password: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface UserResponse {
	id: string;
	name: string;
	username: string;
	email: string;
	avatarUrl: string;
	createdAt: Date;
	updatedAt: Date;
}
