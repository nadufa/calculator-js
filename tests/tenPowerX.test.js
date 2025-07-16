import { TenPowerXOperation } from "../src/calculator/operations/math";

const tenPowerXOperation = new TenPowerXOperation();

test("calculates 10 in power of 1 to equal 10", () => {
  expect(tenPowerXOperation.calculate(1)).toBe(10);
});

test("calculates 10 in power of 2 to equal 100", () => {
  expect(tenPowerXOperation.calculate(2)).toBe(100);
});

test("calculates 10 in power of 5 to equal 100000", () => {
  expect(tenPowerXOperation.calculate(5)).toBe(100000);
});

test("calculates 10 in power of -4 to equal 0.0001", () => {
  expect(tenPowerXOperation.calculate(-4)).toBeCloseTo(0.0001);
});

test("calculates 10 in power of 0 to equal 1", () => {
  expect(tenPowerXOperation.calculate(0)).toBe(1);
});
