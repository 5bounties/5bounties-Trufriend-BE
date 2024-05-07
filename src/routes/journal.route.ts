import { Router } from "express";
import {
	destroyJournal,
	editJournal,
	fetchAllJournals,
	storeJournal,
} from "../controllers/journal.controller";
import { requireAuth } from "../middlewares/auth";
import { deserializeToken } from "../middlewares/auth";
import { requireSuperadmin } from "../middlewares/auth";
import { validateBody } from "../middlewares/validation";
import { validateParams } from "../middlewares/validation";
import {
	createJournalFormSchema,
	journalIdParamSchema,
	updateJournalFormSchema,
} from "../validations/journal.validation";

export const journalRouter: Router = Router();

journalRouter.get("/", requireSuperadmin, fetchAllJournals);
journalRouter.post(
	"/",
	deserializeToken,
	validateBody(createJournalFormSchema),
	requireAuth,
	storeJournal,
);
journalRouter.put(
	"/:id",
	deserializeToken,
	requireAuth,
	validateParams(journalIdParamSchema),
	validateBody(updateJournalFormSchema),
	editJournal,
);
journalRouter.delete(
	"/:id",
	deserializeToken,
	requireAuth,
	validateParams(journalIdParamSchema),
	destroyJournal,
);
