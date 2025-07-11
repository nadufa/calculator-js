import {
  DivideOperation,
  EnterNumber,
  MinusOperation,
  MultipleOperation,
  PercentOperation,
  PlusOperation,
} from "./operations";

export default class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  appendNumber(number) {
    this.executeOperation(new EnterNumber(number), this.currentOperand);
  }

  appendSign() {
    if (this.currentOperand === "") {
      return;
    }
    this.currentOperand = parseFloat(this.currentOperand) * -1;
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") {
      return;
    }
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  executeOperation(operation, state) {
    this.currentOperand = operation.execute(state).toString();
  }

  compute() {
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);

    if (isNaN(prev) || isNaN(current)) {
      return;
    }

    switch (this.operation) {
      case "+":
        this.executeOperation(
          new PlusOperation(current),
          parseFloat(this.previousOperand)
        );
        break;
      case "-":
        this.executeOperation(
          new MinusOperation(current),
          parseFloat(this.previousOperand)
        );
        break;
      case "*":
        this.executeOperation(
          new MultipleOperation(current),
          parseFloat(this.previousOperand)
        );
        break;
      case "/":
        this.executeOperation(
          new DivideOperation(current),
          parseFloat(this.previousOperand)
        );
        break;
      case "%":
        this.executeOperation(
          new PercentOperation(current),
          parseFloat(this.previousOperand)
        );
        break;
      default:
        return;
    }

    this.operation = undefined;
    this.previousOperand = "";
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];

    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }

    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(
      this.currentOperand
    );
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = "";
    }
  }
}
