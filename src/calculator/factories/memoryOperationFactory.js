import { memoryOperations } from "../constants";
import {
  MemoryAddOperation,
  MemoryClearOperation,
  MemoryRecallOperation,
  MemorySubtractOperation,
} from "../operations/memory";

export function getMemoryOperationData(operationValue) {
  const map = {
    [memoryOperations.RECALL]: () => new MemoryRecallOperation(),
    [memoryOperations.CLEAR]: () => new MemoryClearOperation(),
    [memoryOperations.ADD]: () => new MemoryAddOperation(),
    [memoryOperations.SUBTRACT]: () => new MemorySubtractOperation(),
  };

  return map[operationValue]();
}
