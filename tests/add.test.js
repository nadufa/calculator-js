import { PlusOperation } from "../src/calculator/operations/math";

const plusOperation = new PlusOperation();

test("adds 8 + 7 to equal 15", () => {
  expect(plusOperation.calculate(8, 7)).toBe(15);
});

test("adds 0 + 0 to equal 0", () => {
  expect(plusOperation.calculate(0, 0)).toBe(0);
});

test("adds -5 + 10 to equal 5", () => {
  expect(plusOperation.calculate(-5, 10)).toBe(5);
});

test("adds -3 + (-2) to equal -5", () => {
  expect(plusOperation.calculate(-3, -2)).toBe(-5);
});

test("adds 2.5 + 3.1 to equal 5.6", () => {
  expect(plusOperation.calculate(2.5, 3.1)).toBeCloseTo(5.6);
});
