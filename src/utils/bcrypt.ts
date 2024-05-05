import bcrypt from "bcrypt";

export const hashPassword = async (password: string) => {
	const saltRounds = 10;
	return bcrypt.hashSync(password, saltRounds);
};

export const checkPassword = async (data: string, encrypted: string) => {
	return bcrypt.compareSync(data, encrypted);
};
