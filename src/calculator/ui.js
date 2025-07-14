export class CalculatorUI {
  constructor() {
    this.numbersButtons = document.querySelectorAll("[data-number]");
    this.floatingPointButton = document.querySelector("[data-floating-point]");
    this.unaryOperationsButtons = document.querySelectorAll(
      "[data-operation-unary]"
    );
    this.binaryOperationsButtons = document.querySelectorAll(
      "[data-operation-binary]"
    );
    this.memoryButtons = document.querySelectorAll("[data-memory]");
    this.equalButton = document.querySelector("[data-equals]");
    this.allClearButton = document.querySelector("[data-clear]");
    this.removeButton = document.querySelector("[data-remove]");
    this.inputField = document.querySelector("[data-input]");
    this.toggleButton = document.querySelector("[data-theme-toggle]");
    this.historyButtons = document.querySelectorAll("[data-history]");
  }

  update(value) {
    this.inputField.innerText = value;
  }
}
