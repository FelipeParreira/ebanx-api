# Ebanx Engineering Challenge

## Description

This is a RESTful API built with ExpressJS and TypeScript.

It contains basically four routes:
  * **GET**  */health_check*
  * **GET**  */balance?account_id=1234*
  * **POST** */reset*
  * **POST** */event*

It was developed without a persistence layer, which means there is no database attached to the application. All state is stored in local memory (*i.e.* once you re-start the app all state is re-set).

It was developed using an MVC architecture, in which the model defines the entities (see [model](./src/model) and [storage](./src/storage)); the controller (or [routes](./src/routes)) exposes an interface to deal with the entities, and the view (or [service](./src/service), as it is called here) provides the business rules for the manipulation and presentation/visualization of the entities.


## Folders & Files (`./src`)
Folder/File | Description
--- | --- 
[`index.ts`](./src/index.ts) | Entry point for the API.
  [`app.ts`](./src/app.ts) | Initializes the ExpressJS app, adding middlewares and applying a router.
  [`/routes`](./src/routes) | Defines the routes and a error handler for them. 
  [`/service`](./src/service) | Contains the business logic, is called by the routes, dependes upon the model, and exports other utilities that are directly called by the routes. 
  [`/DTOs`](./src/DTOs) | Defines data tranfer objects, which constitute the contract between the client and the API in both directions. It is depended upon by `/service`.
  [`/model`](./src/model) | Defines the operations that can be performed upon the data stored in memory. It is called by `/service` and dependes upon `/storage`.
  [`/storage`](./src/storage) | Defines how data is stored (in the current case, it is stored in memory as a JavaScript Object). It also exposes some utilities that allow direct interaction with the in-memory storage layer itself.

## Commands

Command | Description | 
--- | --- 
`$ yarn` | Install dependencies
`$ yarn start:dev` | Run app (development mode)
`$ yarn start` | Run app (production mode)
`$ yarn build` | Compile source code
`$ yarn test` | Run unit tests 
`$ yarn test:e2e` | Run E2E tests 
`$ yarn lint` | Run linter
`$ yarn lint:fix` | Fix linting
`$ yarn audit` | Audit dependencies
`$ make runserver` | Run server in **Docker** container
`$ make shutdown` | Shutdown **Docker** container

## License

The code is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).

## API Docs
After having initilalized the API locally, one can access the **Swagger Docs** by visiting [this page](http://localhost:3000/api-docs/).

There is also a [Postman folder](./postman) with a collection and an environment to test the endpoints locally.

## 3rd Party Docs
 - [NodeJS](https://nodejs.org/en/docs/)
 - [TypeScript](https://www.typescriptlang.org/docs/home.html)
 - [ExpressJS](https://expressjs.com/en/guide/routing.html)
 - [Jest](https://jestjs.io/docs/en/getting-started)
 - [Supertest](https://www.npmjs.com/package/supertest)
 - [ESLint](https://eslint.org)
