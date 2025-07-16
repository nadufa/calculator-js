import { DivideOperation } from "../src/calculator/operations/math";

const divideOperation = new DivideOperation();

test("divides 100 / 25 to equal 4", () => {
  expect(divideOperation.calculate(100, 25)).toBe(4);
});

test("divides 44 / 12 to not equal 4", () => {
  expect(divideOperation.calculate(44, 12)).not.toBe(4);
});

test("divides 16 / 3.2 to equal 5", () => {
  expect(divideOperation.calculate(16, 3.2)).toBe(5);
});

test("divides -15 / 3 to equal -5", () => {
  expect(divideOperation.calculate(-15, 3)).toBe(-5);
});

test("divides 10 / 4 to be close to 2.5", () => {
  expect(divideOperation.calculate(10, 4)).toBeCloseTo(2.5);
});
