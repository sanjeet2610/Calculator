

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
const dot = document.querySelector(".dot");
const backspace = document.querySelector(".backspace");

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

dot.addEventListener("click", () => {
    input("dot");
});

backspace.addEventListener("click", () => {
    input("backspace");
});

let firstNum = null;
let secondNum = null;
let lastRes = null;
let currDisplay = '';
let operator = null;
let resetDisplay = false;
let dotUsed = false;

function input(value) {
    if (value === 'backspace') {
        if (currDisplay !== '') {
            if (currDisplay.slice(-1) === '.') {
                dotUsed = false;
            }
            currDisplay = currDisplay.slice(0, -1);
            display.textContent = currDisplay;
        }
        return;
    }
    if (value === "dot" && !dotUsed) {
        currDisplay += '.';
        display.textContent = currDisplay;
        dotUsed = true;
        return;
    }
    if (value === 'clear') {
        firstNum = null;
        secondNum = null;
        lastRes = null;
        currDisplay = '';
        operator = null;
        resetDisplay = false;
        dotUsed = false;
        display.textContent = '';
        return;
    }
    if (value === '=') {
        if (firstNum !== null && operator !== null && currDisplay !== '') {
            secondNum = Number(currDisplay);
            if (secondNum === 0 && operator === '/') {
                display.textContent = "error can't divide by zero";
                firstNum = null;
                secondNum = null;
                operator = null;
                currDisplay = '';
                resetDisplay = true;
                dotUsed = false;
                return;
            }
            lastRes = operate(operator, firstNum, secondNum);
            lastRes = parseFloat(lastRes.toFixed(5));
            firstNum = lastRes;
            secondNum = null;
            dotUsed = false;
            display.textContent = lastRes;
            operator = null;
            resetDisplay = true;
        }
        return;
    }
    if ((value === '+' || value === '-' || value === 'x' || value === '/') && currDisplay === '') {
        return;
    }
    if (value === '+' || value === '-' || value === 'x' || value === '/') {
        if (firstNum === null) {
            firstNum = Number(currDisplay);
        } else if (operator !== null && currDisplay !== '') {
            secondNum = Number(currDisplay);
            if (secondNum === 0 && operator === '/') {
                display.textContent = "error can't divide by zero";
                firstNum = null;
                secondNum = null;
                operator = null;
                currDisplay = '';
                resetDisplay = true;
                dotUsed = false;
                return;
            }
            lastRes = operate(operator, firstNum, secondNum);
            lastRes = parseFloat(lastRes.toFixed(5));
            firstNum = lastRes;
            secondNum = null;
            display.textContent = lastRes;
        }
        currDisplay = '';
        dotUsed = false;
        operator = value;
        resetDisplay = true;
        return;
    }
    if (resetDisplay) {
        currDisplay = value;
        resetDisplay = false;
    } else {
        if (currDisplay.length < 12) {
            currDisplay += value;
        }
    }
    display.textContent = currDisplay;
}