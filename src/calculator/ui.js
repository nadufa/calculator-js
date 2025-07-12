export class CalculatorUI {
  constructor() {
    this.numbers = document.querySelectorAll("[data-number]");
    this.operations = document.querySelectorAll("[data-operation]");
    this.equal = document.querySelector("[data-equals]");
    this.clear = document.querySelector("[data-clear]");
    this.remove = document.querySelector("[data-remove]");
    this.sign = document.querySelector("[data-plusminus-sign]");
    this.previousOperand = document.querySelector("[data-previous-operand]");
    this.currentOperand = document.querySelector("[data-current-operand]");
    this.toggleButton = document.querySelector("[data-theme-toggle]");
  }

  update(previousOperandValue, currentOperandValue) {
    this.previousOperand.innerText = previousOperandValue;
    this.currentOperand.innerText = currentOperandValue;
  }
}
