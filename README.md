# Snapfood

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.5.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## JSON Server (API Mock)

This project uses a JSON Server to simulate a backend API. A `db.json` file is included at the repository root with seeded `products` and `categories`.

To start JSON Server:

```bash
# install json-server globally if you don't have it
npm install -g json-server

# from the project root
json-server --watch db.json --port 3000
```

Endpoints used by the app:

- GET/POST/PUT/DELETE http://localhost:3000/products
- GET/POST/PUT/DELETE http://localhost:3000/categories

Admin credentials (demo):

- Email: `madie.snapfood@gmail.com`
- Password: `snapfood123`

Start the app after JSON Server is running:

```bash
npm install
ng serve
```

The admin dashboard is available after login at `/admin/dashboard`.
