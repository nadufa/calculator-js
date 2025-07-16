import { RootOperation } from "../src/calculator/operations/math";

const rootOperation = new RootOperation();

test("calculates root in the power of 3 for 125 to equal 5", () => {
  expect(rootOperation.calculate(125, 3)).toBe(5);
});

test("calculates square root (power of 2) for 81 to equal 9", () => {
  expect(rootOperation.calculate(81, 2)).toBe(9);
});

test("calculates 4th root of 16 to equal 2", () => {
  expect(rootOperation.calculate(16, 4)).toBe(2);
});

test("calculates cube root (power of 3) for 27 to equal 3", () => {
  expect(rootOperation.calculate(27, 3)).toBe(3);
});

test("calculates root in the power of 5 for 243 to equal 3", () => {
  expect(rootOperation.calculate(243, 5)).toBe(3);
});
