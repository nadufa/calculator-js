import { MultiplyOperation } from "../src/calculator/operations/math";

const multiplyOperation = new MultiplyOperation();

test("multuplies 9 * 15 to equal 135", () => {
  expect(multiplyOperation.calculate(9, 15)).toBe(135);
});

test("multuplies 4 * 40 to not equal 10", () => {
  expect(multiplyOperation.calculate(4, 40)).not.toBe(10);
});

test("multuplies 1.3 * 8 to equal 10.4", () => {
  expect(multiplyOperation.calculate(1.3, 8)).toBe(10.4);
});

test("multiplies -7 * 6 to equal -42", () => {
  expect(multiplyOperation.calculate(-7, 6)).toBe(-42);
});

test("multiplies 0 * 1000 to equal 0", () => {
  expect(multiplyOperation.calculate(0, 1000)).toBe(0);
});
