export class CalculatorControler {
  constructor(calculator, ui) {
    this.calculator = calculator;
    this.ui = ui;
    this.update();
  }

  update() {
    const output = this.calculator.getOutput();

    this.ui.render({
      output,
      memoryOutput: this.calculator.state.memory,
    });
  }

  registerListeners() {
    this.ui.numbersButtons.forEach((button) => {
      button.addEventListener("click", () => {
        this.calculator.enterNumber(button.innerText);
        this.update();
      });
    });

    this.ui.floatingPointButton.addEventListener("click", () => {
      this.calculator.floatingPoint();
      this.update();
    });

    this.ui.unaryOperationsButtons.forEach((button) => {
      button.addEventListener("click", () => {
        this.calculator.doUnaryOperation(button.dataset.operationUnary);
        this.update();
      });
    });

    this.ui.binaryOperationsButtons.forEach((button) => {
      button.addEventListener("click", () => {
        this.calculator.setBinaryOperation(button.dataset.operationBinary);
        this.update();
      });
    });

    this.ui.memoryButtons.forEach((button) => {
      button.addEventListener("click", () => {
        this.calculator.doMemoryOperation(button.dataset.memory);
        this.update();
      });
    });

    this.ui.equalButton.addEventListener("click", () => {
      this.calculator.compute();
      this.update();
    });

    this.ui.allClearButton.addEventListener("click", () => {
      this.calculator.clearAll();
      this.update();
    });

    this.ui.removeButton.addEventListener("click", () => {
      this.calculator.remove();
      this.update();
    });

    this.ui.toggleButton.addEventListener("click", () => {
      document.body.classList.toggle("light-mode");
    });

    this.ui.historyButtons.forEach((button) => {
      button.addEventListener("click", () => {
        this.calculator.revisitHistory(button.dataset.history);
        this.update();
      });
    });
  }
}
