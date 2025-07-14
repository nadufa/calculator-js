export class Operation {
  constructor(character = "") {
    this.character = character;
  }

  execute() {
    throw new Error("Execute should be implemented");
  }
}
