import {
  ChangeSignOperation,
  DivideOperation,
  EnterNumberOperation,
  MinusOperation,
  MultipleOperation,
  PercentOperation,
  PlusOperation,
} from "./operations";

export class Calculator {
  constructor() {
    this.initState();
  }

  initState() {
    this.state = {
      operation: null,
      leftOperand: "",
      rightOperand: "",
      upperText: "",
      bottomText: "",
    };
  }

  clear() {
    this.initState();
  }

  remove() {
    if (this.state.rightOperand) {
      this.state.rightOperand = this.state.rightOperand.slice(0, -1);
    } else if (this.state.operation) {
      this.state.operation = null;
      this.state.rightOperand = this.state.leftOperand;
      this.state.leftOperand = "";
    }
  }

  enterNumber(number) {
    this.executeOperation(new EnterNumberOperation(), {
      previousAmount: this.state.rightOperand,
      currentAmount: number,
    });
  }

  appendSign() {
    this.executeOperation(new ChangeSignOperation(), {
      currentAmount: this.state.rightOperand,
    });
  }

  setOperation(operation) {
    if (this.state.rightOperand === "") {
      if (this.state.operation) {
        this.state.operation = operation;
      }
      return;
    }

    if (this.state.leftOperand !== "") {
      this.compute();
    }

    this.state.leftOperand = this.state.rightOperand;
    this.state.rightOperand = "";
    this.state.operation = operation;
  }

  executeOperation(operation, state) {
    this.state.rightOperand = operation.execute(state).toString();
  }

  compute() {
    const left = parseFloat(this.state.leftOperand);
    const right = parseFloat(this.state.rightOperand);

    if (isNaN(left) || isNaN(right)) {
      return;
    }

    let operation = null;
    switch (this.state.operation) {
      case "+":
        operation = new PlusOperation();
        break;
      case "-":
        operation = new MinusOperation();
        break;
      case "*":
        operation = new MultipleOperation();
        break;
      case "/":
        operation = new DivideOperation();
        break;
      case "%":
        operation = new PercentOperation();
        break;
      default:
        return;
    }

    this.executeOperation(operation, {
      previousAmount: left,
      currentAmount: right,
    });

    this.state.operation = null;
    this.state.leftOperand = "";
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

    if (decimalDigits == null) {
      return integerDisplay;
    }

    return `${integerDisplay}.${decimalDigits}`;
  }

  updateState() {
    this.state.bottomText = this.getDisplayNumber(this.state.rightOperand);
    this.state.upperText =
      this.state.operation == null
        ? ""
        : `${this.getDisplayNumber(this.state.leftOperand)} ${
            this.state.operation
          }`;
  }
}
