import { binaryOperations, operationsChars } from "../constants";
import {
  DivideOperation,
  MinusOperation,
  MultiplyOperation,
  PlusOperation,
  PowerOperation,
  RootOperation,
} from "../operations/math";

export function getBinaryOperationData(operationValue) {
  const reversed = [binaryOperations.NTH_ROOT];
  const map = {
    [binaryOperations.PLUS]: () => new PlusOperation(operationsChars.PLUS),
    [binaryOperations.MINUS]: () => new MinusOperation(operationsChars.MINUS),
    [binaryOperations.MULTIPLY]: () =>
      new MultiplyOperation(operationsChars.MULTIPLY),
    [binaryOperations.DIVIDE]: () =>
      new DivideOperation(operationsChars.DIVIDE),
    [binaryOperations.POWER]: () => new PowerOperation(operationsChars.POWER),
    [binaryOperations.NTH_ROOT]: () => new RootOperation(operationsChars.ROOT),
  };

  return {
    operation: map[operationValue](),
    reversedInput: reversed.includes(operationValue),
  };
}
