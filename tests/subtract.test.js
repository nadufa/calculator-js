import { MinusOperation } from "../src/calculator/operations/math";

const minusOperation = new MinusOperation();

test("subtracts 14 - 2 to equal 12", () => {
  expect(minusOperation.calculate(14, 2)).toBe(12);
});

test("subtracts -1 - 1 to equal -2", () => {
  expect(minusOperation.calculate(-1, 1)).toBe(-2);
});

test("subtracts 12.3 - 2 to equal 10.3", () => {
  expect(minusOperation.calculate(12.3, 2)).toBeCloseTo(10.3);
});

test("subtracts 0 - 5 to equal -5", () => {
  expect(minusOperation.calculate(0, 5)).toBe(-5);
});

test("subtracts 100 - 100 to equal 0", () => {
  expect(minusOperation.calculate(100, 100)).toBe(0);
});
