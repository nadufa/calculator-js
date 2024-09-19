# Calculator App

## Task
[Task](https://docs.google.com/document/d/1zpXXeSae-BlcxPKgw3DhxZA92cspVailrPYoaXSYrW8/edit?usp=drive_link) - link to the document with the task description.

## How to run the app
1. Install dependencies  
   Open a terminal in the root folder of the project and run the following command: npm install
2. Start the application  
   In the package.json file, there is a script called start. To start the program, run the following command in the terminal: webpack serve
3. After running the command, a link to the running application will appear in the console.

## Project Structure
- dist/: contains compiled production files, such as:
- index.html: the main HTML file of the application
- bundle.js: compiled JavaScript bundle

- src/: contains the source files of the project:
- Calculator.js: the main module for the calculator functionality
- index.html: source HTML template
- index.js: main JavaScript file
- styles.css: styles for the application

- .babelrc: configuration for Babel
- .eslintrc.js: configuration for ESLint
- package.json: list of project dependencies and npm scripts
- webpack.config.js: configuration for Webpack