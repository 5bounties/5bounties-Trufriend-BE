# RESTful API Node Server Boilerplate

A boilerplate/starter project for quickly building RESTful APIs using Node.js, Express, Prisma, and PostgreSQL.

## Manual Installation

Clone the repo:

```bash
git clone https://github.com/ahargunyllib/hackathon-express-starter
cd hackathon-express-starter
```

Install the dependencies:

```bash
npm install
```

Set the environment variables:

```bash
cp .env.example .env

# open .env and modify the environment variables (if needed)
```

## Features

- **SQL database**: [PostgreSQL](https://postgresql.org/) object data modeling using [Prisma](https://www.prisma.io/)
- **Validation**: request data validation using [Joi](https://github.com/hapijs/joi)
- **Logging**: [morgan](https://github.com/expressjs/morgan)
- **Testing**: unit and integration tests using [Jest](https://jestjs.io)
- **Error handling**: centralized error handling mechanism
- **Environment variables**: using [dotenv](https://github.com/motdotla/dotenv) and [cross-env](https://github.com/kentcdodds/cross-env#readme)
- **Security**: set security HTTP headers using [helmet](https://helmetjs.github.io)
- **CORS**: Cross-Origin Resource-Sharing enabled using [cors](https://github.com/expressjs/cors)
- **Compression**: gzip compression with [compression](https://github.com/expressjs/compression)
- **Git hooks**: with [husky](https://github.com/typicode/husky) and [lint-staged](https://github.com/okonet/lint-staged)
- **Linting**: with [Biome](https://biomejs.dev)

## Commands

Running locally:

```bash
npm run dev
```

Running in production:

```bash
npm run start
```

Testing:

```bash
# run all tests
npm run test

# run all tests in watch mode
npm run test:watch

# run test coverage
npm run test:coverage
```

Linting:

```bash
# run formats, lints, and organizes imports.
npm run check:apply
```

## Environment Variables

The environment variables can be found and modified in the `.env` file. They come with these default values:

```bash
# Port number
PORT=8080

# PostgreSQL
# Database host
DB_HOST=localhost
# Database user
DB_USER=user
# Database password
DB_PASSWORD=password
# Database name
DB_NAME=hackathon-express-starter
# Database port
DB_PORT=5432
# Database url
DB_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=SCHEMA

# JWT
# JWT secret key
JWT_SECRET=thisisverysecret
# Number of minutes after which an access token expires
JWT_ACCESS_EXPIRATION=3600s

# API KEY
# Superadmin
SUPERADMIN_API_KEY=superadmin

# AWS S3
# S3 Region
S3_REGION=project_region
# S3 Endpoint
S3_ENDPOINT=https://project_ref.supabase.co/storage/v1/s3
# S3 Access key ID
S3_ACCESS_KEY_ID=your_access_key_id
# S3 Access Secret key
S3_ACCESS_SECRET_KEY=your_secret_access_key
```

## Useful Links

View API [Documentation](https://documenter.getpostman.com/view/29496349/2sA3JGfPMQ)
