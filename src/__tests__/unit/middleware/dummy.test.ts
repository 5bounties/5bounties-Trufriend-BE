import httpStatus from "http-status";
import supertest from "supertest";
import { app } from "../../../app";

describe("Dummy test", () => {
	it("should pass", async () => {
		const response = await supertest(app).get("/");

		expect(response.status).toBe(httpStatus.OK);
		expect(response.body).toEqual({
			status: httpStatus.OK,
			message: "Hello World!",
			data: [],
		});
	});
});
