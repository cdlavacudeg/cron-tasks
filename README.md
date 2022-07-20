# TECHNICAL CHALLENGE – BACKEND DEVELOPER - THE BIZ NATION

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

The cron command-line utility, also known as cron job is a job scheduler on Unixlike operating systems. Users who set up
a

### Allowed values of Cron Expression

| field        | value                             |
| ------------ | --------------------------------- |
| second       | 0-59                              |
| minute       | 0-59                              |
| hour         | 0-23                              |
| day of month | 1-31                              |
| month        | 1-12 (or names)                   |
| day of week  | 0-7 (or names, 0 or 7 are sunday) |
