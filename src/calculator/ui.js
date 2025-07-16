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
    this.themePanel = document.querySelector(".theme-panel");
  }

  render(data) {
    this.outputMemoryField.innerText = "Memory: " + data.memoryOutput;
    if (data.output.error) {
      this.outputField.innerText = data.output.error;
      this.outputField.classList.add("error-color");
    } else {
      this.outputField.classList.remove("error-color");
      // use LTR embedding character to keep "direction: rtl" css property and display all neutral characters correctly
      this.outputField.innerText = "\u202A" + data.output.text;
    }
  }
}
