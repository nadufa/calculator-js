import {
  ChangeSignOperation,
  DivideOperation,
  EnterNumberOperation,
  FloatingPointOperation,
  MinusOperation,
  MultipleOperation,
  PercentOperation,
  PlusOperation,
  PowerOperation,
  RootOperation,
} from "./operations/math";

import {
  MemoryAddOperation,
  MemoryClearOperation,
  MemoryRecallOperation,
  MemorySubtractOperation,
} from "./operations/memory";

import {
  binaryOperations,
  historyOperations,
  memoryOperations,
  operationsChars,
  unaryOperations,
} from "./const";

export class Calculator {
  constructor() {
    this.history = [];
    this.state = {
      operation: null,
      leftOperand: "",
      rightOperand: "",
      output: "",
      memory: "0",
      historyIndex: 0,
    };
  }

  clearAll() {
    this.state = {
      ...this.state,
      operation: null,
      leftOperand: "",
      rightOperand: "",
    };
  }

  remove() {
    if (this.state.rightOperand) {
      this.state.rightOperand = this.state.rightOperand.slice(0, -1);
    } else if (this.state.operation) {
      this.state.operation = null;
    } else if (this.state.leftOperand) {
      this.state.leftOperand = this.state.leftOperand.slice(0, -1);
    }
  }

  getMemoryOperation(operationValue) {
    switch (operationValue) {
      case memoryOperations.RECALL:
        return new MemoryRecallOperation();
      case memoryOperations.CLEAR:
        return new MemoryClearOperation();
      case memoryOperations.ADD:
        return new MemoryAddOperation();
      case memoryOperations.SUBTRACT:
        return new MemorySubtractOperation();
      default:
        break;
    }
  }

  doMemoryOperation(operationValue) {
    let operation = this.getMemoryOperation(operationValue);
    this.executeOperation(operation);
  }

  enterNumber(number) {
    this.executeOperation(new EnterNumberOperation(), number);
  }

  floatingPoint() {
    this.executeOperation(new FloatingPointOperation());
  }

  getUnaryOperationData(operationValue) {
    let operation, value;
    switch (operationValue) {
      case unaryOperations.NEGATE:
        operation = new ChangeSignOperation();
        value = "";
        break;
      case unaryOperations.SQUARE:
        operation = new PowerOperation();
        value = 2;
        break;
      case unaryOperations.CUBE:
        operation = new PowerOperation();
        value = 3;
        break;
      case unaryOperations.TEN_POWER_X:
        operation = new PowerOperation();
        value = 10;
        break;
      case unaryOperations.INVERSE:
        operation = new PowerOperation();
        value = -1;
        break;
      case unaryOperations.SQRT:
        operation = new PowerOperation();
        value = 1 / 2;
        break;
      case unaryOperations.CBRT:
        operation = new PowerOperation();
        value = 1 / 3;
        break;
      default:
        return;
    }

    return {
      operation,
      value,
    };
  }

  doUnaryOperation(operation) {
    let operationData = this.getUnaryOperationData(operation);

    this.executeOperation(operationData.operation, operationData.value);
  }

  getBinaryOperation(operationValue) {
    switch (operationValue) {
      case binaryOperations.PLUS:
        return new PlusOperation(operationsChars.PLUS);
      case binaryOperations.MINUS:
        return new MinusOperation(operationsChars.MINUS);
      case binaryOperations.MULTIPLY:
        return new MultipleOperation(operationsChars.MULTIPLY);
      case binaryOperations.DIVIDE:
        return new DivideOperation(operationsChars.DIVIDE);
      case binaryOperations.PERCENT:
        return new PercentOperation(operationsChars.PERCENT);
      case binaryOperations.POWER:
        return new PowerOperation(operationsChars.POWER);
      case binaryOperations.NTH_ROOT:
        return new RootOperation(operationsChars.ROOT);
      default:
        return;
    }
  }

  setBinaryOperation(operationValue) {
    if (this.state.rightOperand !== "") {
      this.compute();
    }
    this.state.operation = this.getBinaryOperation(operationValue);
  }

  executeOperation(operation, value) {
    this.state = operation.execute({ state: this.state, value: value });
  }

  compute() {
    const left = parseFloat(this.state.leftOperand);
    const right = parseFloat(this.state.rightOperand);

    if (isNaN(left) || isNaN(right)) {
      return;
    }

    this.history.push(Object.freeze({ ...this.state }));
    this.state.historyIndex += 1;
    console.log(this.state.historyIndex);

    this.executeOperation(this.state.operation);

    this.state.operation = null;
  }

  revisitHistory(operationValue) {
    switch (operationValue) {
      case historyOperations.FORWARD:
        if (this.state.historyIndex < this.history.length - 1) {
          this.state.historyIndex = this.state.historyIndex + 1;
        }
        break;
      case historyOperations.BACKWARD:
        if (this.state.historyIndex > 0) {
          this.state.historyIndex = this.state.historyIndex - 1;
        }
        break;
      default:
        break;
    }
    this.state = { ...this.history[this.state.historyIndex] };
    console.log(this.state);
  }

  getDisplayNumber(value) {
    const stringNumber = value.toString();
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

  updateOutput() {
    this.state.output =
      this.getDisplayNumber(this.state.leftOperand || "") +
      (this.state.operation == null
        ? ""
        : " " + this.state.operation.character + " ") +
      this.getDisplayNumber(this.state.rightOperand || "");
  }
}
