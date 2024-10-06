# Trustcrow Test

A category management system.


## Requirements

This application was development with node `v22.7.0` but should conveniently work with version 16.19.0 or greater, NPM 8.0.0 or greater and Postgres.
Check your Node version by running `node -v`

## Project Installation

Clone the App `git clone https://github.com/elvis-onobo/trustcrow.git`

run `npm install` to install dependencies.

---

## Configure app

Create a `.env` file in the project's root directory, copy and fill in the values for the variables listed in the `.env.example` file.
    
If you so choose, you can use [this docker compose config](/DOCKER_COMPOSE.md) to easily spin up your database and other services which may be required. Note that this is is a `.yaml` file and proper spacing must be adhered to for things to work fine.

---

## Running migrations

NB: You must at least run `npm run migration:up` to be able to properly interact with the application.

Migration commands can be found in the scripts section of the package.json file. Run as follows:

`npm run migration:create` to create a migration.

`npm run migration:up` to commit your migrations.

`npm run migration:down` to drop migrations.

`npm run migration:refresh` to drop migrations and commit them again.


---


## Running the project locally

Run `npm run dev` to serve the app with hot reload at `localhost:3000` or `http://127.0.0.1:3000`

---

## Technologies

- Node JS
- Express
- Jest
- Postgres

---

## Documentation

For convenience, a Postman docs configuration has been provided. You can download it and install to Postman to have details of the docs. URL below:

$ https://github.com/elvis-onobo/trustcrow/blob/main/thunder-collection_Trustcrow_postman.json

