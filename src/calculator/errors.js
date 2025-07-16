export class DivisionByZeroError extends Error {
  constructor(message = "Division by zero is not allowed") {
    super(message);
    this.name = "DivisionByZeroError";
  }
}
