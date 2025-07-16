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
    this.outputMemoryField = document.querySelector("[data-output-memory]");
    this.outputField = document.querySelector("[data-output-display]");
    this.toggleButton = document.querySelector("[data-theme-toggle]");
    this.factorialButton = document.querySelector("[data-factorial]");
    this.historyButtons = document.querySelectorAll("[data-history]");
  }

  render(data) {
    this.outputMemoryField.innerText = "Memory: " + data.memoryOutput;
    this.outputField.innerText = data.output;
  }
}
