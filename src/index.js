import Calculator from './Calculator.js';

import './styles.css';

const numbers = document.querySelectorAll('[data-number]');
const operations = document.querySelectorAll('[data-operation]');
const equal = document.querySelector('[data-equals]');
const clear = document.querySelector('[data-clear]');
const sign = document.querySelector('[data-plusminus-sign]');
const previousElement = document.querySelector(
    '[data-previous-operand]'
);
const currentOperandTextElement = document.querySelector(
    '[data-current-operand]'
);
const toggleButton = document.querySelector('[data-theme-toggle]');

const calculator = new Calculator(
    previousElement,
    currentOperandTextElement
);

numbers.forEach((button) => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operations.forEach((button) => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

equal.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
});

sign.addEventListener('click', () => {
    calculator.appendSign();
    calculator.updateDisplay();
});

clear.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});

toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
});