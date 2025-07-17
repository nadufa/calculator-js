import {
  EnterNumberOperation,
  FloatingPointOperation,
} from "./operations/math";

import { historyOperations, numbersUnitRegex } from "./constants";
import { DivisionByZeroError, RootOfNegativeError } from "./errors";

import { getBinaryOperationData } from "./factories/binaryOperationFactory";
import { getMemoryOperationData } from "./factories/memoryOperationFactory";
import { getUnaryOperationData } from "./factories/unaryOperationFactory";

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
      error: null,
    });
    this.undoStack.push(this.state);
  }

  clearAll() {
    this.mutateState({
      operation: null,
      reversedInput: false,
      leftOperand: "0",
      rightOperand: "",
      error: null,
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
    this.remember();
  }

  doMemoryOperation(operationValue) {
    let operation = getMemoryOperationData(operationValue);
    this.executeOperation(operation);
  }

  enterNumber(number) {
    this.executeOperation(new EnterNumberOperation(), number);
  }

  floatingPoint() {
    this.executeOperation(new FloatingPointOperation());
  }

  doUnaryOperation(operationValue) {
    let operationData = getUnaryOperationData(operationValue);
    this.executeOperation(operationData.operation, operationData.value);
  }

  setBinaryOperation(operationValue) {
    const isBothOperandsExist =
      (this.state.reversedInput && this.state.leftOperand !== "") ||
      (!this.state.reversedInput && this.state.rightOperand !== "");

    const isFirstOperandExist =
      (this.state.reversedInput && this.state.rightOperand !== "") ||
      (!this.state.reversedInput && this.state.leftOperand !== "");

    if (isBothOperandsExist) {
      this.compute();
    }
    if (isFirstOperandExist)
      this.mutateState(getBinaryOperationData(operationValue));

    if (this.state.reversedInput) {
      this.mutateState({
        leftOperand: this.state.rightOperand,
        rightOperand: this.state.leftOperand,
      });
    }

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
    this.mutateState({ error: null });
    try {
      const newState = operation.execute({ state: this.state, value: value });
      this.mutateState(newState);
      this.remember();
      this.redoStack = [];
    } catch (e) {
      if (
        e instanceof DivisionByZeroError ||
        e instanceof RootOfNegativeError
      ) {
        this.mutateState({
          error: e.name,
          leftOperand: "",
          rightOperand: "",
          operation: null,
        });
      } else {
        console.error(e.message);
      }
    }
  }

  remember() {
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
    const [integerPart, decimalPart] = value.split(".");

    const integerDisplay = integerPart.replace(numbersUnitRegex, ",");

    return `${integerDisplay}${value.includes(".") ? "." : ""}${
      decimalPart || ""
    }`;
  }

  getOutput() {
    return {
      text:
        this.formatOutputValue(this.state.leftOperand || "0") +
        (this.state.operation == null
          ? ""
          : " " + this.state.operation.character + " ") +
        this.formatOutputValue(this.state.rightOperand || ""),
      error: this.state.error,
    };
  }
}
