import httpStatus from "http-status";
import request from "supertest";
import { app } from "../../../app";

describe("Error Middlewares", () => {
	describe("unknownEndpoint", () => {
		it("should respond with 404 status code and 'Not Found' message", async () => {
			const response = await request(app).get("/unknown-endpoint");

			expect(response.status).toBe(httpStatus.NOT_FOUND);
			expect(response.body).toEqual({
				status: httpStatus.NOT_FOUND,
				message: httpStatus[httpStatus.NOT_FOUND],
				data: [],
			});
		});
	});
});
