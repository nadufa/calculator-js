import { DivisionByZeroError, RootOfNegativeError } from "../errors.js";
import {
  abs,
  getMultiplierForInteger,
  getOperandKey,
  round,
} from "../utils.js";
import { Operation } from "./base.js";

export class FloatingPointOperation extends Operation {
  execute({ state }) {
    const { operation } = state;
    const operandKey = getOperandKey(operation);
    let operand = state[operandKey] || "";

    if (operand.includes(".")) {
      return state;
    }

    const result = this.calculate(operand);

    return { ...state, [operandKey]: String(result) };
  }

  calculate(value) {
    return (value ? value : "0") + ".";
  }
}

export class EnterNumberOperation extends Operation {
  execute({ state, value }) {
    const { operation, reversedInput } = state;
    const operandKey = getOperandKey(operation, reversedInput);

    const result = this.calculate(state[operandKey], value);

    return { ...state, [operandKey]: String(result) };
  }

  calculate(previousValue, newValue) {
    return (previousValue === "0" ? "" : previousValue) + newValue;
  }
}

export class NegateOperation extends Operation {
  execute({ state }) {
    const { operation, reversedInput } = state;
    const operandKey = getOperandKey(operation, reversedInput);

    if (state[operandKey] === "") {
      return state;
    }
    const result = this.calculate(parseFloat(state[operandKey]));

    return {
      ...state,
      [operandKey]: String(result),
    };
  }

  calculate(x) {
    return -x;
  }
}

export class FactorialOperation extends Operation {
  execute({ state }) {
    const { operation } = state;
    const operandKey = getOperandKey(operation);

    if (state[operandKey] === "") {
      return state;
    }

    const result = this.calculate(parseFloat(state[operandKey]));

    return {
      ...state,
      [operandKey]: String(result),
    };
  }

  calculate(x) {
    if (x % 1 !== 0 || x < 0) {
      return x;
    }
    let result = 1;
    for (let i = 1; i <= x; i++) {
      result *= i;
    }
    return result;
  }
}

export class TenPowerXOperation extends Operation {
  execute({ state }) {
    const { operation } = state;
    const operandKey = getOperandKey(operation);

    if (state[operandKey] === "") {
      return state;
    }

    const result = this.calculate(parseFloat(state[operandKey]));

    return {
      ...state,
      [operandKey]: String(result),
    };
  }

  calculate(power) {
    return 10 ** power;
  }
}

export class PlusOperation extends Operation {
  execute({ state }) {
    const { leftOperand, rightOperand } = state;
    const left = parseFloat(leftOperand);
    const right = parseFloat(rightOperand);

    const result = this.calculate(left, right);

    return {
      ...state,
      leftOperand: String(result),
      rightOperand: "",
      operation: null,
    };
  }

  calculate(left, right) {
    const multiplierForInteger = getMultiplierForInteger([left, right]);
    return (
      (left * multiplierForInteger + right * multiplierForInteger) /
      multiplierForInteger
    );
  }
}

export class MinusOperation extends Operation {
  execute({ state }) {
    const { leftOperand, rightOperand } = state;

    const result = this.calculate(
      parseFloat(leftOperand),
      parseFloat(rightOperand)
    );

    return {
      ...state,
      leftOperand: String(result),
      rightOperand: "",
      operation: null,
    };
  }

  calculate(left, right) {
    const multiplierForInteger = getMultiplierForInteger([left, right]);
    return (
      (left * multiplierForInteger - right * multiplierForInteger) /
      multiplierForInteger
    );
  }
}

export class MultiplyOperation extends Operation {
  execute({ state }) {
    const { leftOperand, rightOperand } = state;

    const result = this.calculate(
      parseFloat(leftOperand),
      parseFloat(rightOperand)
    );
    return {
      ...state,
      leftOperand: String(result),
      rightOperand: "",
      operation: null,
    };
  }

  calculate(left, right) {
    const multiplierForInteger = getMultiplierForInteger([left, right]);

    return (left * multiplierForInteger * right) / multiplierForInteger;
  }
}

export class DivideOperation extends Operation {
  execute({ state }) {
    const { leftOperand, rightOperand } = state;

    const result = this.calculate(
      parseFloat(leftOperand),
      parseFloat(rightOperand)
    );

    return {
      ...state,
      leftOperand: String(result),
      rightOperand: "",
      operation: null,
    };
  }

  calculate(left, right) {
    if (right === 0) {
      throw new DivisionByZeroError();
    }
    const multiplierForInteger = getMultiplierForInteger([left, right]);
    return (left * multiplierForInteger) / (right * multiplierForInteger);
  }
}

export class PercentOperation extends Operation {
  execute({ state }) {
    const { operation } = state;
    const operandKey = getOperandKey(operation);

    if (state[operandKey] === "") {
      return state;
    }

    const result = this.calculate(parseFloat(state[operandKey]));

    return {
      ...state,
      [operandKey]: String(result),
    };
  }

  calculate(x) {
    const multiplierForInteger = getMultiplierForInteger([x]);
    return (x * multiplierForInteger) / (100 * multiplierForInteger);
  }
}

export class InverseOperation extends Operation {
  execute({ state }) {
    const { operation } = state;
    const operandKey = getOperandKey(operation);

    if (state[operandKey] === "") {
      return state;
    }

    const result = this.calculate(parseFloat(state[operandKey]));

    return {
      ...state,
      [operandKey]: String(result),
    };
  }

  calculate(x) {
    if (x === 0) throw new DivisionByZeroError();
    return 1 / x;
  }
}

export class PowerOperation extends Operation {
  execute({ state, value }) {
    const { leftOperand, rightOperand, operation } = state;
    const operandKey = getOperandKey(operation);

    if (state[operandKey] === "" && value) {
      return state;
    }

    const x = value ? state[operandKey] : parseFloat(leftOperand);
    const power = value || parseFloat(rightOperand);

    const result = this.calculate(x, power);

    if (value) {
      return { ...state, [operandKey]: String(result) };
    }

    return {
      ...state,
      leftOperand: String(result),
      rightOperand: "",
      operation: value ? operation : null,
    };
  }

  calculate(x, power) {
    const multiplierForInteger = getMultiplierForInteger([x]);

    return (x * multiplierForInteger) ** power / multiplierForInteger ** power;
  }
}

export class RootOperation extends Operation {
  execute({ state, value }) {
    const { leftOperand, rightOperand, operation } = state;
    const operandKey = getOperandKey(operation);
    const power = value || parseFloat(leftOperand);
    const x = value ? state[operandKey] : parseFloat(rightOperand);

    if (state[operandKey] === "" && value) {
      return state;
    }

    if (x < 0 && power % 2 === 0) {
      throw new RootOfNegativeError();
    }

    const result = this.calculate(x, power);

    if (value) {
      return { ...state, [operandKey]: String(result) };
    }
    return {
      ...state,
      leftOperand: String(result),
      rightOperand: "",
      operation: null,
    };
  }

  calculate(x, power) {
    const negate = power % 2 == 1 && x < 0;
    if (negate) {
      x = -x;
    }

    const possible = x ** (1 / power);
    power = possible ** power;

    if (abs(x - power) < 1 && x > 0 == power > 0)
      return round(negate ? -possible : possible, 10);
  }
}
