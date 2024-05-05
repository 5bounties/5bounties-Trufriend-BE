import compression from "compression";
import cors from "cors";
import express, { type Application } from "express";
import helmet from "helmet";
import { errorHandlerEndpoint, unknownEndpoint } from "./middlewares/error";
import { router } from "./routes";
import { config } from "./utils/config";
import { errorHandler, successHandler } from "./utils/morgan";

export const app: Application = express();

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options("*", cors());

// remove powered by header
app.disable("x-powered-by");

// morgan
if (config.nodeEnv !== "test") {
	app.use(successHandler);
	app.use(errorHandler);
}

app.use("/", router);

// error middleware
app.use(unknownEndpoint);
app.use(errorHandlerEndpoint);
