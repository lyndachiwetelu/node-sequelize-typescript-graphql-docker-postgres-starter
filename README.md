# A Nodejs sequelize-typescript Postgres Graphql JWT Docker Starter Project

### Prerequisites
- Docker: Install [Docker Desktop](https://docs.docker.com/get-docker/) on your computer

### What's included 
- Apollo Graphql server
- Authentication with JWT. Uses HTTP read only cookies.
- Example (User) GraphQL schema and resolvers
- Postgres for Data Store (Used in a docker container)
- [sequelize-typescript project](https://www.npmjs.com/package/sequelize-typescript) as ORM
- Dockerfile and docker-compose to set up *in dev environment*
- Migrations with [umzug](https://github.com/sequelize/umzug) from sequelize 

### How to run the first time:
Not the first time? Skip to _How to run subsequently_
- Pull this repository
- copy `.env.example` to `.env`. You can change `JWT_SECRET` to any valid string (if you wish, it's not important on dev)
- In `.env` modify `ORIGINS` to add your Frontend Client URL like this 
````
ORIGINS=https://studio.apollographql.com,[YOUR_URL]
````
- Still in `.env` change `SECURE=1` to `SECURE=` in order to make requests from a `http` non-secure URL, which your Frontend client may be. (To test with the Graphql Apollo client directly this needs to be equal to 1)
- cd into the root directory run `docker-compose up --build -d`

### How to use:
- After the docker-compose command, wait 1 min and navigate to [`http://localhost:4001/graphql`](http://localhost:4001/graphql) and you can run your graphql queries there to test them directly.
- If you see [the graphql server interface](`http://localhost:4001/graphql`) then it means the api should be working, you can now make requests from your client but before that,
- Enable cookies in Apollo Studio, so visit [`http://localhost:4001/graphql`](http://localhost:4001/graphql) , go to settings (Gear Icon) and click the cookie switch on:
![image showing apollo cookies option](https://github.com/lyndachiwetelu/node-sequelize-typescript-graphql-docker-postgres-starter/blob/main/apollo-cookies.png?raw=true)


### How to run subsequently:
- cd into the root directory run `docker-compose up --build -d`

### To stop running the app:
- cd into the root directory run `docker-compose down`

### Housekeeping
- `docker system prune -a` is useful to run regularly to clean up unused containers and orphan images so they don't hog your memory.

### Migrations
There are scripts that handle migration.
To generate a migration file, run 
`yarn generate-migration [model-name] [action]`
For example a real command could look like this:
`yarn generate-migration order create`
This file will be created in `src/migrations`
On development, migrations will automatically be run when you run the docker-compose up command in earlier steps.


### API Documentation
After running the app, visit the [the Graphql Server GUI](http://localhost:4001/graphql), Click on `Query your Server` and on the left, See `Documentation`


### Examples of Queries
- For example to get a User, for a particular Id, and also handle errors, you have to pass this to the graphql URL

```
 Query {
   getUser(id: 1) {
    ... on Error {
      message
    }

    ... on User {
      email, name
    }
  }
 }
```

### Gotchas 
- Is something else running on port 4001? We need this port. You can change it of course, just make sure you use the right URLs then when trying to access this app :)
- Getting Cors Errors? Open Issue or PR