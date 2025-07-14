export class CalculatorControler {
  constructor(calculator, ui) {
    this.calculator = calculator;
    this.ui = ui;
    this.render();
  }

  render() {
    this.calculator.updateOutput();

    this.ui.update(this.calculator.state.output);
  }

  registerListeners() {
    this.ui.numbersButtons.forEach((button) => {
      button.addEventListener("click", () => {
        this.calculator.enterNumber(button.innerText);
        this.render();
      });
    });

    this.ui.floatingPointButton.addEventListener("click", () => {
      this.calculator.floatingPoint();
      this.render();
    });

    this.ui.unaryOperationsButtons.forEach((button) => {
      button.addEventListener("click", () => {
        this.calculator.doUnaryOperation(button.dataset.operationUnary);
        this.render();
      });
    });

    this.ui.binaryOperationsButtons.forEach((button) => {
      button.addEventListener("click", () => {
        this.calculator.setBinaryOperation(button.dataset.operationBinary);
        this.render();
      });
    });

    this.ui.memoryButtons.forEach((button) => {
      button.addEventListener("click", () => {
        this.calculator.doMemoryOperation(button.dataset.memory);
        this.render();
      });
    });

    this.ui.equalButton.addEventListener("click", () => {
      this.calculator.compute();
      this.render();
    });

    this.ui.allClearButton.addEventListener("click", () => {
      this.calculator.clearAll();
      this.render();
    });

    this.ui.removeButton.addEventListener("click", () => {
      this.calculator.remove();
      this.render();
    });

    this.ui.toggleButton.addEventListener("click", () => {
      document.body.classList.toggle("light-mode");
    });

    this.ui.historyButtons.forEach((button) => {
      button.addEventListener("click", () => {
        this.calculator.revisitHistory(button.dataset.history);
        this.render();
      });
    });
  }
}
