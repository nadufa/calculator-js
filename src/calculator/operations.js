class Operation {
  execute() {
    throw new Error("Execute should be implemented");
  }
}

export class EnterNumberOperation extends Operation {
  execute({ previousAmount, currentAmount }) {
    if (currentAmount === "." && previousAmount.includes(".")) {
      return previousAmount;
    }
    return previousAmount.toString() + currentAmount.toString();
  }
}

export class ChangeSignOperation extends Operation {
  execute({ currentAmount }) {
    if (currentAmount === "") {
      return currentAmount;
    }
    return parseFloat(currentAmount) * -1;
  }
}

export class PlusOperation extends Operation {
  execute({ previousAmount, currentAmount }) {
    return previousAmount + currentAmount;
  }
}

export class MinusOperation extends Operation {
  execute({ previousAmount, currentAmount }) {
    return previousAmount - currentAmount;
  }
}

export class MultipleOperation extends Operation {
  execute({ previousAmount, currentAmount }) {
    return previousAmount * currentAmount;
  }
}

export class DivideOperation extends Operation {
  execute({ previousAmount, currentAmount }) {
    return previousAmount / currentAmount;
  }
}

export class PercentOperation extends Operation {
  execute({ previousAmount, currentAmount }) {
    return (previousAmount * currentAmount) / 100;
  }
}
