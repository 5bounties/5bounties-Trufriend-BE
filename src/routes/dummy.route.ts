import { Router } from "express";
import httpStatus from "http-status";

export const dummyRouter: Router = Router();

dummyRouter.get("/", (req, res) => {
	res.json({
		status: httpStatus.OK,
		message: "Hello World!",
		data: [],
	});
});
