# Calculator App

## Task

[Task](https://drive.google.com/file/d/1hNSuKF4NVpq2Q95WO7wfvZZNNfn95DgH/view?usp=sharing) - link to the document with the task description.

## How to run the app

1. Install dependencies
   Open a terminal in the root folder of the project and run the following command:
   ```
   npm install
   ```
2. In the package.json file, there is a script called **start**. To start the program, run this script in the terminal using following command:
   ```
   npm run start
   ```
3. After running the command, a link to the running application will appear in the terminal.

## Project Structure

- **dist/** : contains compiled production files

  - index.html: the main HTML file of the application
  - bundle.js: compiled JavaScript bundle

- **src/** : contains all project files and directories with the source code

  - **calculator/** : contains files and directories with calculator functionality
    - **operations/**: contains files with calculator operations
      - base.js: contains base class for operations
      - math.js: contains all math operations
      - memory.js: contains all memory operations
    - calculator.js: the main module with the calculator logic
    - const.js: contains constants for operation mappings
    - controller.js: contains class for managing calculators ui and logic
    - errors.js: contains custom error classes
    - ui.js: contains class for calculator ui logic
    - utils.js: contains common utilities
  - index.html: source HTML file, the entrypoint of the application
  - index.js: main JavaScript file
  - styles.css: main styles file

- **tests/**: contains all test cases for math operations

  - add.test.js - contains test cases for add operation
  - divide.test.js - contains test cases for divide operation
  - factorial.test.js - contains test cases for factorial operation
  - multiply.test.js - contains test cases for multiply operation
  - negate.test.js - contains test cases for negate operation
  - percent.test.js - contains test cases for percent operation
  - power.test.js - contains test cases for power operations
  - root.test.js - contains test cases for root operations
  - subtract.test.js - contains test cases for subtract operation
  - tenPowerX.test.js - contains test cases for ten in a power of x operation

- .babelrc: configuration file for Babel
- .eslintrc.js: configuration file for ESLint
- .gitignore: configuration file for github that specifies files that need to be excluded
- package-lock.json: file that contains locked version of the project dependencies
- package.json: file with project metadata such as version, list of project dependencies, npm scripts, etc
- README.md: file used for documenting project's repo
- webpack.config.js: configuration file for Webpack
