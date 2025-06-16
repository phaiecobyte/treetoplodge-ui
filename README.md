# TreetoplodgeUi

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.0.2.

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





/* Color palette variables */
:root {
  /* Primary color - Light Gold */
  --primary: #D4AF37;
  --primary-light: #E6C870;
  --primary-dark: #B3931F;
  
  /* Complementary colors */
  --secondary: #4A6FA5; /* Deep Blue - complementary to gold */
  --accent: #7D5642;    /* Warm Brown - earthy tone to pair with gold */
  
  /* Neutral colors */
  --neutral-dark: #333333;
  --neutral-medium: #777777;
  --neutral-light: #F5F5F5;
  
  /* Status colors */
  --success: #28A745;
  --warning: #FFC107;
  --danger: #DC3545;
  --info: #17A2B8;
}
@import "../node_modules/bootstrap/scss/bootstrap";

// * {
//   margin: 0;
//   padding: 0;
//   box-sizing: border-box;
// }

// body {
//   font-family: 'Roboto', sans-serif;
//   color: var(--neutral-dark);
//   background-color: var(--neutral-light);
//   line-height: 1.6;
// }

// h1, h2, h3, h4, h5, h6 {
//   font-family: 'Roboto', serif;
//   font-weight: normal;
//   color: var(--primary-dark);
// }

// /* Utility classes for colors */
// .bg-primary { background-color: var(--primary); }
// .bg-secondary { background-color: var(--secondary); }
// .bg-accent { background-color: var(--accent); }

// .text-primary { color: var(--primary); }
// .text-secondary { color: var(--secondary); }
// .text-accent { color: var(--accent); }