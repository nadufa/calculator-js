export class EnterNumber {
  constructor(enteredNumber) {
    this.enteredNumber = enteredNumber;
  }

  execute(previousValue) {
    if (this.enteredNumber === "." && previousValue.includes(".")) {
      return previousValue;
    }
    return previousValue.toString() + this.enteredNumber.toString();
  }
}

export class PlusOperation {
  constructor(currentAmount) {
    this.currentAmount = currentAmount;
  }

  execute(previousAmount) {
    return previousAmount + this.currentAmount;
  }
}

export class MinusOperation {
  constructor(currentAmount) {
    this.currentAmount = currentAmount;
  }

  execute(previousAmount) {
    return previousAmount - this.currentAmount;
  }
}

export class MultipleOperation {
  constructor(currentAmount) {
    this.currentAmount = currentAmount;
  }

  execute(previousAmount) {
    return previousAmount * this.currentAmount;
  }
}

export class DivideOperation {
  constructor(currentAmount) {
    this.currentAmount = currentAmount;
  }

  execute(previousAmount) {
    return previousAmount / this.currentAmount;
  }
}

export class PercentOperation {
  constructor(currentAmount) {
    this.currentAmount = currentAmount;
  }

  execute(previousAmount) {
    return (previousAmount * this.currentAmount) / 100;
  }
}
