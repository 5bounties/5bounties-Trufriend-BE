import dotenv from "dotenv";
dotenv.config();

const PORT = Number(process.env.PORT) ?? 8080;
const JWT_SECRET = process.env.JWT_SECRET ?? "supersecretkey";
const JWT_ACCESS_EXPIRATION = process.env.JWT_ACCESS_EXPIRATION ?? "3600s";
const NODE_ENV = process.env.NODE_ENV ?? "";
const SUPERADMIN_API_KEY = process.env.SUPERADMIN_API_KEY ?? "superadmin";

const DB_HOST = process.env.DB_HOST ?? "localhost";
const DB_PORT = Number(process.env.DB_PORT) ?? 5432;
const DB_USER = process.env.DB_USER ?? "postgres";
const DB_PASSWORD = process.env.DB_PASSWORD ?? "password";
const DB_NAME = process.env.DB_NAME ?? "hackathon-express-starter";

const S3_REGION = process.env.S3_REGION ?? "us-east-1";
const S3_ENDPOINT = process.env.S3_ENDPOINT ?? "http://localhost:9000";
const S3_ACCESS_KEY_ID = process.env.S3_ACCESS_KEY_ID ?? "minioadmin";
const S3_ACCESS_SECRET_KEY = process.env.S3_ACCESS_SECRET_KEY;

export const config = {
	port: PORT,
	jwtSecret: JWT_SECRET,
	jwtAccessExpiration: JWT_ACCESS_EXPIRATION,
	nodeEnv: NODE_ENV,
	superadminApiKey: SUPERADMIN_API_KEY,
	db: {
		host: DB_HOST,
		port: DB_PORT,
		user: DB_USER,
		password: DB_PASSWORD,
		name: DB_NAME,
	},
	s3: {
		region: S3_REGION,
		endpoint: S3_ENDPOINT,
		accessKeyId: S3_ACCESS_KEY_ID,
		secretAccessKey: S3_ACCESS_SECRET_KEY,
	},
};
