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
      reversedInput: false,
      leftOperand: "0",
      rightOperand: "",
      output: "",
      memory: "0",
      error: "",
    });
    this.undoStack.push(this.state);
  }

  clearAll() {
    this.mutateState({
      operation: null,
      reversedInput: false,
      leftOperand: "0",
      rightOperand: "",
      error: "",
    });
  }

  remove() {
    if (this.state.rightOperand) {
      this.mutateState({ rightOperand: this.state.rightOperand.slice(0, -1) });
    } else if (this.state.operation) {
      this.mutateState({ operation: null });
    } else if (this.state.leftOperand) {
      const mutatedValue = this.state.leftOperand.slice(0, -1) || "0";
      this.mutateState({ leftOperand: mutatedValue });
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
        value = 3;
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
        this.mutateState({ reversedInput: false });
        return new PlusOperation(operationsChars.PLUS);
      case binaryOperations.MINUS:
        this.mutateState({ reversedInput: false });
        return new MinusOperation(operationsChars.MINUS);
      case binaryOperations.MULTIPLY:
        this.mutateState({ reversedInput: false });
        return new MultiplyOperation(operationsChars.MULTIPLY);
      case binaryOperations.DIVIDE:
        this.mutateState({ reversedInput: false });
        return new DivideOperation(operationsChars.DIVIDE);
      case binaryOperations.PERCENT:
        this.mutateState({ reversedInput: false });
        return new PercentOperation(operationsChars.PERCENT);
      case binaryOperations.POWER:
        this.mutateState({ reversedInput: false });
        return new PowerOperation(operationsChars.POWER);
      case binaryOperations.NTH_ROOT:
        this.mutateState({ reversedInput: true });
        return new RootOperation(operationsChars.ROOT);
      default:
        return;
    }
  }

  setBinaryOperation(operationValue) {
    if (
      (this.state.reversedInput && this.state.leftOperand !== "") ||
      (!this.state.reversedInput && this.state.rightOperand !== "")
    ) {
      this.compute();
    }
    if (
      (this.state.reversedInput && this.state.rightOperand !== "") ||
      (!this.state.reversedInput && this.state.leftOperand !== "")
    )
      this.mutateState({ operation: this.getBinaryOperation(operationValue) });

    if (this.state.reversedInput) {
      this.mutateState({
        leftOperand: this.state.rightOperand,
        rightOperand: this.state.leftOperand,
      });
    }
    console.log(this.state);

    this.remember();
  }

  compute() {
    const left = parseFloat(this.state.leftOperand);
    const right = parseFloat(this.state.rightOperand);

    if (isNaN(left) || isNaN(right)) {
      return;
    }

    this.executeOperation(this.state.operation);
    this.mutateState({ operation: null, reversedInput: false });
  }

  executeOperation(operation, value) {
    try {
      const newState = operation.execute({ state: this.state, value: value });
      this.mutateState(newState);
      this.remember();
      this.redoStack = [];
    } catch (e) {
      this.mutateState({ error: e.message });
    }
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

  formatOutputValue(value) {
    const stringNumber = value.toString();
    const [integerPart, decimalPart] = stringNumber.split(".");

    // Add thousand separators to integer part manually
    const integerDisplay = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return decimalPart ? `${integerDisplay}.${decimalPart}` : integerDisplay;
  }

  getOutput() {
    if (this.state.error) {
      return this.state.error;
    }

    const leftOperand =
      parseFloat(this.state.leftOperand) < 0
        ? String(-this.state.leftOperand) + "-"
        : this.state.leftOperand;

    const rightOperand =
      parseFloat(this.state.rightOperand) < 0
        ? String(-this.state.rightOperand) + "-"
        : this.state.rightOperand;

    // reverse operand order because of css "direction: rtl" property
    return (
      this.formatOutputValue(rightOperand || "") +
      (this.state.operation == null
        ? ""
        : " " + this.state.operation.character + " ") +
      this.formatOutputValue(leftOperand || "")
    );
  }
}
