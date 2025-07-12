export class CalculatorControler {
  constructor(calculator, ui) {
    this.calculator = calculator;
    this.ui = ui;
    this.render();
  }

  render() {
    this.calculator.updateState();
    this.ui.update(
      this.calculator.state.upperText,
      this.calculator.state.bottomText
    );
  }

  registerListeners() {
    this.ui.numbers.forEach((button) => {
      button.addEventListener("click", () => {
        this.calculator.enterNumber(button.innerText);
        this.render();
      });
    });

    this.ui.operations.forEach((button) => {
      button.addEventListener("click", () => {
        this.calculator.setOperation(button.innerText);
        this.render();
      });
    });

    this.ui.equal.addEventListener("click", () => {
      this.calculator.compute();
      this.render();
    });

    this.ui.sign.addEventListener("click", () => {
      this.calculator.appendSign();
      this.render();
    });

    this.ui.clear.addEventListener("click", () => {
      this.calculator.clear();
      this.render();
    });

    this.ui.remove.addEventListener("click", () => {
      this.calculator.remove();
      this.render();
    });

    this.ui.toggleButton.addEventListener("click", () => {
      document.body.classList.toggle("light-mode");
    });
  }
}
