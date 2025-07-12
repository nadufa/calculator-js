import { Calculator } from "./calculator/calculator.js";
import { CalculatorControler } from "./calculator/controller.js";
import { CalculatorUI } from "./calculator/ui.js";

import "./styles.css";

const ui = new CalculatorUI();
const calculator = new Calculator();
const controller = new CalculatorControler(calculator, ui);
controller.registerListeners();
