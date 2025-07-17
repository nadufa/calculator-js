import { getMultiplierForInteger, getOperandKey } from "../utils";
import { Operation } from "./base";

export class MemoryRecallOperation extends Operation {
  execute({ state }) {
    const { operation } = state;
    const operandKey = getOperandKey(operation);

    return { ...state, [operandKey]: state.memory };
  }
}

export class MemoryClearOperation extends Operation {
  execute({ state }) {
    return { ...state, memory: "0" };
  }
}

export class MemoryAddOperation extends Operation {
  execute({ state }) {
    const { operation, memory } = state;
    const operandKey = getOperandKey(operation);

    const result = state[operandKey]
      ? this.calculate(
          parseFloat(memory),
          parseFloat(state[operandKey])
        ).toString()
      : memory;

    return {
      ...state,
      memory: result,
      [operandKey]: "",
    };
  }

  calculate(operand, value) {
    const multiplierForInteger = getMultiplierForInteger([operand, value]);
    return (
      (operand * multiplierForInteger + value * multiplierForInteger) /
      multiplierForInteger
    );
  }
}

export class MemorySubtractOperation extends Operation {
  execute({ state }) {
    const { operation, memory } = state;
    const operandKey = getOperandKey(operation);

    const result = state[operandKey]
      ? this.calculate(
          parseFloat(memory),
          parseFloat(state[operandKey])
        ).toString()
      : memory;

    return {
      ...state,
      memory: result,
      [operandKey]: "",
    };
  }

  calculate(operand, value) {
    const multiplierForInteger = getMultiplierForInteger([operand, value]);
    return (
      (operand * multiplierForInteger - value * multiplierForInteger) /
      multiplierForInteger
    );
  }
}
