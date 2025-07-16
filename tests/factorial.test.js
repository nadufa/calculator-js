import { FactorialOperation } from "../src/calculator/operations/math";

const factorialOperation = new FactorialOperation();

test("calculates factorial for 5 to equal 120", () => {
  expect(factorialOperation.calculate(5)).toBe(120);
});

test("calculates factorial for 0 to equal 1", () => {
  expect(factorialOperation.calculate(0)).toBe(1);
});

test("calculates factorial for 1 to equal 1", () => {
  expect(factorialOperation.calculate(1)).toBe(1);
});

test("calculates factorial for 3 to equal 6", () => {
  expect(factorialOperation.calculate(3)).toBe(6);
});

test("Do nothing for negative number", () => {
  expect(factorialOperation.calculate(-4)).toBe(-4);
});
