export const operationsChars = {
  PLUS: "+",
  MINUS: "-",
  MULTIPLY: "*",
  DIVIDE: "/",
  PERCENT: "%",
  POWER: "^",
  ROOT: "√",
};

export const unaryOperations = {
  NEGATE: "negate",
  SQUARE: "square",
  CUBE: "cube",
  SQRT: "sqrt",
  CBRT: "cbrt",
  INVERSE: "inverse",
  TEN_POWER_X: "tenPowerX",
  FACTORIAL: "factorial",
  PERCENT: "percent",
};

export const binaryOperations = {
  PLUS: "plus",
  MINUS: "minus",
  MULTIPLY: "multiply",
  DIVIDE: "divide",
  POWER: "power",
  NTH_ROOT: "nthRoot",
};

export const memoryOperations = {
  RECALL: "recall",
  CLEAR: "clear",
  ADD: "add",
  SUBTRACT: "subtract",
};

export const historyOperations = {
  FORWARD: "forward",
  BACKWARD: "backward",
};

export const numbersUnitRegex = /\B(?=(\d{3})+(?!\d))/g;
