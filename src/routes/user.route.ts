import { Router } from "express";
import {
	destroyUser,
	editUser,
	fetchAllUsers,
	fetchJournal,
	fetchPost,
	fetchUser,
	fetchUserJournals,
	fetchUserPosts,
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
import { postIdParamSchema } from "../validations/post.validation";
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

usersRouter.get("/post", deserializeToken, requireAuth, fetchUserPosts);
usersRouter.get(
	"/post/:id",
	deserializeToken,
	requireAuth,
	validateParams(postIdParamSchema),
	fetchPost,
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
