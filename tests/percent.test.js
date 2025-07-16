import { PercentOperation } from "../src/calculator/operations/math";

const percentOperation = new PercentOperation();

test("calculates 8% from 1000 to equal 80", () => {
  expect(percentOperation.calculate(8, 1000)).toBe(80);
});

test("calculates 20% from 140 to not equal 50", () => {
  expect(percentOperation.calculate(20, 140)).not.toBe(50);
});

test("calculates 0% from 500 to equal 0", () => {
  expect(percentOperation.calculate(0, 500)).toBe(0);
});

test("calculates 50% from 200 to equal 100", () => {
  expect(percentOperation.calculate(50, 200)).toBe(100);
});

test("calculates 12.5% from 80 to equal 10", () => {
  expect(percentOperation.calculate(12.5, 80)).toBe(10);
});
