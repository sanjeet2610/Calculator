

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, a, b) {
    if (operator === '+') return add(a, b);
    else if (operator === '-') return subtract(a, b);
    else if (operator === '/') return divide(a, b);
    return multiply(a, b);
}

const display = document.querySelector(".display");
const digits = document.querySelectorAll(".digit");
const operators = document.querySelectorAll(".operator");
const equal = document.querySelector(".equal");
const clear = document.querySelector(".clear");

digits.forEach(digit => {
    digit.addEventListener("click", () => input(digit.textContent));
});

operators.forEach(operator => {
    operator.addEventListener("click", () => {
        input(operator.textContent);
    });
});

equal.addEventListener("click", () => {
    input("=");
});

clear.addEventListener("click", () => {
    input("clear");
});

let firstNum = null;
let secondNum = null;
let lastRes = null;
let currDisplay = '';
let operator = null;
let resetDisplay = false;

function input(value) {

    if (value == '+' || value == '-' || value == 'x' || value == '/') {
        if (firstNum === null) {
            firstNum = Number(currDisplay);
        } else if (operator != null && currDisplay != '') {
            secondNum = Number(currDisplay);
            lastRes = operate(operator, firstNum, secondNum);
            firstNum = lastRes;
            secondNum = null;
            display.textContent = lastRes;
        }
        operator = value;
        resetDisplay = true;
        return;
    }
    if (resetDisplay) {
        currDisplay = value;
        resetDisplay = false;
    } else {
        currDisplay += value;
    }
    display.textContent = currDisplay;
}