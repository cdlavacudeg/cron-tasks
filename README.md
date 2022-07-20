# Technical challenge - Backend Developer - THE BIZ NATION

Build a simple web application that will act as a task scheduler for simple tasks. Specifically, the first task is to
ping a website and scrape the headers (or first 1000 characters). The application should take a Cron syntax expression
and a URL as input, and then execute the job according to the schedule.

- [x] Use any language (C#, Java, Javascript, Go, **NodeJs**, ...)
- [x] Save the scraped date in any database (SQL server, My SQL, mongo, **postgreSQL**, ...)
- [x] Provide a web API (**REST**, GraphQL, etc.)
- [x] You can build the application to run **locally**, or in a public cloud (Azure, AWS, GCP) using whatever technology stacks are available for you in that environment.
- [x] You do not need to include authentication.
- [x] UI is optional
- [x] You must keep your code in a source control repository (GitHub, Bitbucket, etc.)
- [x] Do not build a Cron expression parser, there are many to choose from(use of cron-node).
- [ ] Url Preview for CronCron

## Technologies used:

- Node.js
- Docker Compose
- Express
- Express-validator
- dotenv
- node-cron
- postgreSQL
- Sequelize
- puppeter
- Swagger

- Prettier
- Eslint
- Pre-commit
- Editor config

## Allowed values of Cron Expression

| field        | value                             |
| ------------ | --------------------------------- |
| second       | 0-59                              |
| minute       | 0-59                              |
| hour         | 0-23                              |
| day of month | 1-31                              |
| month        | 1-12 (or names)                   |
| day of week  | 0-7 (or names, 0 or 7 are sunday) |

## Run the App locally

1. Run the postgreSQL and pgadmin services with docker-compose:

```bash
docker compose up -d
```

> Don't forget to configure the environment variables in a `.env` file first, you can see the required variables on
> `.example.env`

3. Install the dependencies

```bash
npm install
```

2. Run the app:

```bash
npm start
```

3. The app will be served on your environment variable PORT or in the port 3000

4. Go to `http://localhost:3000/api/v1/docs` there you will have a documentation of the REST API in swagger, where you
   can test the app

> To access the values of the database used the `/scraped` endpoint, and to schedule the scrap of a url with a cron
> expression use the `/schedule-task` endpoint.
