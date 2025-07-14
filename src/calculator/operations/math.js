import { abs, getOperandKey } from "../utils.js";
import { Operation } from "./base.js";

export class FloatingPointOperation extends Operation {
  execute({ state }) {
    const { operation } = state;
    const operandKey = getOperandKey(operation);
    let operand = state[operandKey] || "";

    if (operand.includes(".")) {
      return state;
    }

    return { ...state, [operandKey]: operand + "." };
  }
}

export class EnterNumberOperation extends Operation {
  execute({ state, value }) {
    const { operation, leftOperand, rightOperand } = state;
    if (operation) {
      return { ...state, rightOperand: rightOperand + value };
    }
    return { ...state, leftOperand: leftOperand + value };
  }
}

export class ChangeSignOperation extends Operation {
  execute({ state }) {
    const { operation } = state;
    const operandKey = getOperandKey(operation);

    return {
      ...state,
      [operandKey]: parseFloat(state[operandKey]) * -1 || "",
    };
  }
}

export class PlusOperation extends Operation {
  execute({ state }) {
    const { leftOperand, rightOperand } = state;
    return {
      ...state,
      leftOperand: parseFloat(leftOperand) + parseFloat(rightOperand),
      rightOperand: "",
    };
  }
}

export class MinusOperation extends Operation {
  execute({ state }) {
    const { leftOperand, rightOperand } = state;
    return {
      ...state,
      leftOperand: parseFloat(leftOperand) - parseFloat(rightOperand),
      rightOperand: "",
    };
  }
}

export class MultipleOperation extends Operation {
  execute({ state }) {
    const { leftOperand, rightOperand } = state;
    return {
      ...state,
      leftOperand: parseFloat(leftOperand) * parseFloat(rightOperand),
      rightOperand: "",
    };
  }
}

export class DivideOperation extends Operation {
  execute({ state }) {
    const { leftOperand, rightOperand } = state;
    return {
      ...state,
      leftOperand: parseFloat(leftOperand) / parseFloat(rightOperand),
      rightOperand: "",
    };
  }
}

export class PercentOperation extends Operation {
  execute({ state }) {
    const { leftOperand, rightOperand } = state;
    return {
      ...state,
      leftOperand: (parseFloat(leftOperand) * parseFloat(rightOperand)) / 100,
      rightOperand: "",
    };
  }
}

export class PowerOperation extends Operation {
  execute({ state, value }) {
    const { leftOperand } = state;
    return {
      ...state,
      leftOperand: parseFloat(leftOperand) ** value,
      rightOperand: "",
    };
  }
}

export class RootOperation extends Operation {
  execute({ previousAmount, currentAmount }) {
    if (currentAmount < 0 && previousAmount % 2 === 0) {
      throw new Error("Cannot calculate even root of a negative number.");
    }

    let guess = currentAmount / previousAmount;

    while (true) {
      let nextGuess =
        ((previousAmount - 1) * guess +
          currentAmount / guess ** (previousAmount - 1)) /
        previousAmount;
      if (abs(nextGuess - guess) < 0.001) {
        return nextGuess;
      }
      guess = nextGuess;
    }
  }
}
