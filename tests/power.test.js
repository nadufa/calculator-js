const powerOperation = new PowerOperation();

test("calculates 8 in the power of 2 to equal 64", () => {
  expect(powerOperation.calculate(8, 2)).toBe(64);
});

test("calculates 2 in the power of -2 to equal 0.25", () => {
  expect(powerOperation.calculate(2, -2)).toBeCloseTo(0.25);
});

test("calculates 8 in the power of 2 to equal 64", () => {
  expect(powerOperation.calculate(8, 2)).toBe(64);
});

test("calculates 5 in the power of 0 to equal 1", () => {
  expect(powerOperation.calculate(5, 0)).toBe(1);
});

test("calculates 2 in the power of 3 to equal 8", () => {
  expect(powerOperation.calculate(2, 3)).toBe(8);
});
