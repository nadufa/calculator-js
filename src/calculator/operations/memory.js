import { getOperandKey } from "../utils";
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

    return {
      ...state,
      memory: (parseFloat(memory) + parseFloat(state[operandKey])).toString(),
    };
  }
}

export class MemorySubtractOperation extends Operation {
  execute({ state }) {
    const { operation } = state;
    const operandKey = getOperandKey(operation);
    return {
      ...state,
      memory: (
        parseFloat(state.memory) - parseFloat(state[operandKey])
      ).toString(),
    };
  }
}
