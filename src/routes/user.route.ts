import { Router } from "express";
import {
	destroyUser,
	editUser,
	fetchAllUsers,
	fetchJournal,
	fetchUser,
	fetchUserJournals,
	storeUser,
} from "../controllers/user.controller";
import {
	deserializeToken,
	requireAuth,
	requireSuperadmin,
} from "../middlewares/auth";
import { uploadImage } from "../middlewares/uploadImage";
import { validateBody, validateParams } from "../middlewares/validation";
import { journalIdParamSchema } from "../validations/journal.validation";
import {
	createUserFormSchema,
	userIdParamSchema,
} from "../validations/user.validation";

export const usersRouter: Router = Router();

usersRouter.get("/journal", deserializeToken, requireAuth, fetchUserJournals);
usersRouter.get(
	"/journal/:id",
	deserializeToken,
	requireAuth,
	validateParams(journalIdParamSchema),
	fetchJournal,
);

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
