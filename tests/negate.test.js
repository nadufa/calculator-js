import { NegateOperation } from "../src/calculator/operations/math";

const negateOperation = new NegateOperation();

test("negates 5 to equal -5", () => {
  expect(negateOperation.calculate(5)).toBe(-5);
});

test("negates -10 to equal 10", () => {
  expect(negateOperation.calculate(-10)).toBe(10);
});
