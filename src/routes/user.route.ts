import { Router } from "express";
import {
	destroyUser,
	editUser,
	fetchAllUsers,
	fetchUser,
	storeUser,
} from "../controllers/user.controller";
import { requireSuperadmin } from "../middlewares/auth";
import { uploadImage } from "../middlewares/uploadImage";
import { validateBody, validateParams } from "../middlewares/validation";
import {
	createUserFormSchema,
	userIdParamSchema,
} from "../validations/user.validation";

export const usersRouter: Router = Router();

usersRouter.get("/", requireSuperadmin, fetchAllUsers);
usersRouter.get("/:id", requireSuperadmin, fetchUser);
usersRouter.post(
	"/",
	requireSuperadmin,
	uploadImage.single("avatar"),
	validateBody(createUserFormSchema),
	storeUser,
);
usersRouter.put(
	"/:id",
	requireSuperadmin,
	validateParams(userIdParamSchema),
	validateBody(createUserFormSchema),
	editUser,
);
usersRouter.delete(
	"/:id",
	requireSuperadmin,
	validateParams(userIdParamSchema),
	destroyUser,
);
