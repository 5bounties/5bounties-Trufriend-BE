import { sign, verify } from "jsonwebtoken";
import { config } from "./config";

export const signJwt = (payload: object) => {
	return sign(payload, config.jwtSecret, {
		expiresIn: config.jwtAccessExpiration,
	});
};

export const verifyJwt = (token: string) => {
	return verify(token, config.jwtSecret);
};
