export function abs(n) {
  return n < 0 ? -n : n;
}

export function getOperandKey(operation) {
  return operation ? "rightOperand" : "leftOperand";
}

export function round(value, decimals) {
  const factor = 10 ** decimals;
  const scaled = value * factor;
  const floored = scaled - (scaled % 1);
  const fraction = scaled % 1;

  const rounded = fraction >= 0.5 ? floored + 1 : floored;
  return rounded / factor;
}

export function isFloat(value) {
  return value % 1 !== 0;
}
