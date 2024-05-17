# TMDB

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.14.

## Note

On the main branch, the code was committed up until May 16, the day I sent the link of my repository. The dev branch contains code that was updated after that date.

## Prerequisites

Node.js, npm (or yarn) and Angular(v16.2.14) installed on your machine.
A TMDB API key. You can get one for free by signing up at [The Movie DB](https://developer.themoviedb.org/docs/getting-started).

## Installation

To set up this project locally, follow these steps:

1. Clone the repository to your local machine:

   ```
   git clone https://github.com/ned-18/TMDB.git
   ```

2. Navigate to the project directory:

   ```
   cd TMDB
   ```

3. Install the required dependencies:

   ```
   npm install
   ```

4. Add Your TMDB API Key:
    Open the `src/environments/environment.ts` file.
    Replace "YOUR_TMDB_API_KEY" with your actual TMDB API key:
     ```
    export const environment = {
        production: false,
        apiURL: 'https://api.themoviedb.org/3/',
        tmdbApiKey: 'YOUR_TMDB_API_KEY', // Add your API key here
    };
    ```
    Also do the same for `src/environments/environment.prod.ts`

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
