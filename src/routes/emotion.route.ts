import { Router } from "express";
import {
	destroyEmotion,
	fetchAllEmotions,
	fetchAllUserEmotions,
	storeEmotion,
} from "../controllers/emotion.controller";
import { deserializeToken, requireSuperadmin } from "../middlewares/auth";
import { requireAuth } from "../middlewares/auth";
import { validateParams } from "../middlewares/validation";
import { validateBody } from "../middlewares/validation";
import { createEmotionFormSchema } from "../validations/emotion.validation";
import { emotionIdParamSchema } from "../validations/emotion.validation";
import { userIdParamSchema } from "../validations/user.validation";

export const emotionRouter: Router = Router();

emotionRouter.get("/", requireSuperadmin, fetchAllEmotions);
emotionRouter.get(
	"/:id",
	deserializeToken,
	requireAuth,
	validateParams(userIdParamSchema),
	fetchAllUserEmotions,
);
emotionRouter.post(
	"/",
	deserializeToken,
	requireAuth,
	validateBody(createEmotionFormSchema),
	storeEmotion,
);
emotionRouter.delete(
	"/:id",
	deserializeToken,
	requireAuth,
	validateParams(emotionIdParamSchema),
	destroyEmotion,
);
