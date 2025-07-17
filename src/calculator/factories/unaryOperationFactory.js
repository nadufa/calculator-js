import { unaryOperations } from "../constants";
import {
  FactorialOperation,
  InverseOperation,
  NegateOperation,
  PercentOperation,
  PowerOperation,
  RootOperation,
  TenPowerXOperation,
} from "../operations/math";

export function getUnaryOperationData(operationValue) {
  const map = {
    [unaryOperations.NEGATE]: { operation: new NegateOperation(), value: "" },
    [unaryOperations.SQUARE]: { operation: new PowerOperation(), value: 2 },
    [unaryOperations.CUBE]: { operation: new PowerOperation(), value: 3 },
    [unaryOperations.TEN_POWER_X]: {
      operation: new TenPowerXOperation(),
      value: 10,
    },
    [unaryOperations.INVERSE]: { operation: new InverseOperation(), value: "" },
    [unaryOperations.SQRT]: { operation: new RootOperation(), value: 2 },
    [unaryOperations.CBRT]: { operation: new RootOperation(), value: 3 },
    [unaryOperations.FACTORIAL]: {
      operation: new FactorialOperation(),
      value: "",
    },
    [unaryOperations.PERCENT]: { operation: new PercentOperation(), value: "" },
  };

  return map[operationValue];
}
