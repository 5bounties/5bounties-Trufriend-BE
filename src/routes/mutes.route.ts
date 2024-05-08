import { Router } from "express";
import {
	destroyMutedWord,
	fetchAllMutedWords,
	storeMutedWord,
} from "../controllers/mutes.controller";
import {
	deserializeToken,
	requireAuth,
	requireSuperadmin,
} from "../middlewares/auth";
import { validateBody, validateParams } from "../middlewares/validation";
import {
	createMutedWordFormSchema,
	mutedWordIdParams,
} from "../validations/mutes.validation";

export const mutesRouter: Router = Router();

const wordRouter: Router = Router();

wordRouter.get("/", requireSuperadmin, fetchAllMutedWords);
wordRouter.post(
	"/",
	deserializeToken,
	requireAuth,
	validateBody(createMutedWordFormSchema),
	storeMutedWord,
);
wordRouter.delete(
	"/:id",
	deserializeToken,
	requireAuth,
	validateParams(mutedWordIdParams),
	destroyMutedWord,
);

mutesRouter.use("/word", wordRouter);
