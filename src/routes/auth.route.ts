import { Router } from "express";
import { login, register } from "../controllers/auth.controller";
import { uploadImage } from "../middlewares/uploadImage";
import { validateBody } from "../middlewares/validation";
import {
	loginFormSchema,
	registerFormSchema,
} from "../validations/auth.validation";

export const authRouter: Router = Router();

authRouter.post("/login", validateBody(loginFormSchema), login);
authRouter.post(
	"/register",
	uploadImage.single("avatar"),
	validateBody(registerFormSchema),
	register,
);
