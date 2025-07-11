export class EnterNumber {
  constructor(currentAmount) {
    this.currentAmount = currentAmount;
  }

  execute(previousAmount) {
    if (this.currentAmount === "." && previousAmount.includes(".")) {
      return previousAmount;
    }
    console.log(this.currentAmount, previousAmount);
    return previousAmount.toString() + this.currentAmount.toString();
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
