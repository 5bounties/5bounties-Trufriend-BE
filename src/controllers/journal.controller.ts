import type { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import {
	createJournal,
	deleteJournal,
	getAllJournals,
	getJournalById,
	updateJournal,
} from "../services/journal.service";

export const fetchAllJournals = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const journals = await getAllJournals();

		return res.status(httpStatus.OK).send({
			status: httpStatus.OK,
			message: "Journals fetched successfully",
			data: journals,
		});
	} catch (error) {
		next(error);
	}
};

export const storeJournal = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		req.body.userId = res.locals.user.id;
		const journal = await createJournal(req.body);

		return res.status(httpStatus.CREATED).send({
			status: httpStatus.CREATED,
			message: "Journal created successfully",
			data: journal,
		});
	} catch (error) {
		next(error);
	}
};

export const editJournal = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const journal = await updateJournal(req.params.id, req.body);

		return res.status(httpStatus.OK).send({
			status: httpStatus.OK,
			message: "Journal updated successfully",
			data: journal,
		});
	} catch (error) {
		next(error);
	}
};

export const destroyJournal = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		await getJournalById(req.params.id);
		await deleteJournal(req.params.id);

		return res.status(httpStatus.OK).send({
			status: httpStatus.OK,
			message: "Journal deleted successfully",
			data: [],
		});
	} catch (error) {
		next(error);
	}
};
