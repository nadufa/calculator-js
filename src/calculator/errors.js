export class DivisionByZeroError extends Error {
  constructor(message = "Division by zero is not allowed") {
    super(message);
    this.name = "DivisionByZeroError";
  }
}

export class RootOfNegativeError extends Error {
  constructor(message = "Root of negative is not allowed") {
    super(message);
    this.name = "RootOfNegativeError";
  }
}
