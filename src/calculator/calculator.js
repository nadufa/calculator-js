import {
  DivideOperation,
  EnterNumberOperation,
  FactorialOperation,
  FloatingPointOperation,
  MinusOperation,
  MultiplyOperation,
  NegateOperation,
  PercentOperation,
  PlusOperation,
  PowerOperation,
  RootOperation,
  TenPowerXOperation,
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
    this.undoStack = [];
    this.redoStack = [];
    this.state = Object.freeze({
      operation: null,
      leftOperand: "0",
      rightOperand: "",
      output: "",
      memory: "0",
    });
    this.undoStack.push(this.state);
  }

  clearAll() {
    this.mutateState({
      operation: null,
      leftOperand: "0",
      rightOperand: "",
    });
  }

  remove() {
    if (this.state.rightOperand) {
      this.mutateState({ rightOperand: this.state.rightOperand.slice(0, -1) });
    } else if (this.state.operation) {
      this.mutateState({ operation: null });
    } else if (this.state.leftOperand) {
      this.mutateState({ leftOperand: this.state.leftOperand.slice(0, -1) });
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
        operation = new NegateOperation();
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
        operation = new TenPowerXOperation();
        value = 10;
        break;
      case unaryOperations.INVERSE:
        operation = new PowerOperation();
        value = -1;
        break;
      case unaryOperations.SQRT:
        operation = new RootOperation();
        value = 2;
        break;
      case unaryOperations.CBRT:
        operation = new RootOperation();
        value = 1 / 3;
        break;
      case unaryOperations.FACTORIAL:
        operation = new FactorialOperation();
        value = "";
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
        return new MultiplyOperation(operationsChars.MULTIPLY);
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
    if (this.state.leftOperand !== "")
      this.mutateState({ operation: this.getBinaryOperation(operationValue) });

    this.remember();
  }

  compute() {
    const left = parseFloat(this.state.leftOperand);
    const right = parseFloat(this.state.rightOperand);

    if (isNaN(left) || isNaN(right)) {
      return;
    }

    this.executeOperation(this.state.operation);
    this.mutateState({ operation: null });
  }

  executeOperation(operation, value) {
    const newState = operation.execute({ state: this.state, value: value });
    this.mutateState(newState);
    this.remember();
    this.redoStack = [];
  }

  remember() {
    console.log(this.state);

    this.undoStack.push(this.state);
  }

  revisitHistory(operationValue) {
    switch (operationValue) {
      case historyOperations.FORWARD:
        if (this.redoStack.length) {
          const newState = this.redoStack.pop();
          this.undoStack.push(newState);
          this.mutateState(newState);
        }
        break;
      case historyOperations.BACKWARD:
        if (this.undoStack.length > 1) {
          const newState = this.undoStack.pop();
          this.redoStack.push(newState);
          this.mutateState(this.undoStack[this.undoStack.length - 1]);
        }
        break;
      default:
        break;
    }
  }

  mutateState(data) {
    this.state = Object.freeze({ ...this.state, ...data });
  }

  // getDisplayNumber(value) {
  //   const stringNumber = value.toString();
  //   const integerDigits = parseFloat(stringNumber.split(".")[0]);
  //   const decimalDigits = stringNumber.split(".")[1];

  //   let integerDisplay;
  //   if (isNaN(integerDigits)) {
  //     integerDisplay = "";
  //   } else {
  //     integerDisplay = integerDigits.toLocaleString("en", {
  //       maximumFractionDigits: 0,
  //     });
  //   }

  //   if (decimalDigits == null) {
  //     return integerDisplay;
  //   }

  //   return `${integerDisplay}.${decimalDigits}`;
  // }

  getDisplayNumber(value) {
    const stringNumber = value.toString();
    const [integerPart, decimalPart] = stringNumber.split(".");

    // Add thousand separators to integer part manually
    const integerDisplay = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return decimalPart ? `${integerDisplay}.${decimalPart}` : integerDisplay;
  }

  getOutput() {
    // reversed output because of css "direction: rtl" property
    return (
      this.getDisplayNumber(this.state.rightOperand || "") +
      (this.state.operation == null
        ? ""
        : " " + this.state.operation.character + " ") +
      this.getDisplayNumber(this.state.leftOperand || "")
    );
  }
}
