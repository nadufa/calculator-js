export function abs(n) {
  return n < 0 ? -n : n;
}

export function getOperandKey(operation) {
  return operation ? "rightOperand" : "leftOperand";
}
