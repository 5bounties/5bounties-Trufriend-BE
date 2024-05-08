import express, { type Router } from "express";
import { authRouter } from "./auth.route";
import { dummyRouter } from "./dummy.route";
import { journalRouter } from "./journal.route";
import { mutesRouter } from "./mutes.route";
import { postRouter } from "./post.route";
import { usersRouter } from "./user.route";

export const router: Router = express.Router();

interface Route {
	path: string;
	route: Router;
}

const defaultRoutes: Route[] = [
	{
		path: "/",
		route: dummyRouter,
	},
	{
		path: "/users",
		route: usersRouter,
	},
	{
		path: "/auth",
		route: authRouter,
	},
	{
		path: "/journal",
		route: journalRouter,
	},
	{
		path: "/post",
		route: postRouter,
	},
	{
		path: "/mutes",
		route: mutesRouter,
	},
];

for (const route of defaultRoutes) {
	router.use(route.path, route.route);
}
