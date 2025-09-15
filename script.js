// Display and buttons
const display = document.querySelector(".display");
const digitButtons = document.querySelectorAll(".digit");
const operatorButtons = document.querySelectorAll(".operator");
const equalButton = document.querySelector(".equal");
const clearButton = document.querySelector(".clear");

// Calculator state
let firstNum = null;
let operator = null;
let secondNum = null;
let lastRes = null;
let currentInput = "";
let shouldResetDisplay = false;


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


function input(value) {
    if (value === "clear") {
        firstNum = null;
        operator = null;
        secondNum = null;
        lastRes = null;
        currentInput = "";
        shouldResetDisplay = false;
        display.textContent = "";
        return;
    }

    if (value === "=") {
        if (firstNum !== null && operator !== null && currentInput !== "") {
            secondNum = Number(currentInput);
            lastRes = operate(operator, firstNum, secondNum);
            currentInput = lastRes.toString();
            display.textContent = currentInput;
            firstNum = lastRes;
            operator = null;
            shouldResetDisplay = true;
        }
        return;
    }

    if (["+", "-", "x", "/"].includes(value)) {
        // convert "x" to "*"
        if (value === "x") value = "*";

        if (firstNum === null) {
            firstNum = Number(currentInput);
        } else if (operator !== null && currentInput !== "") {
            secondNum = Number(currentInput);
            lastRes = operate(operator, firstNum, secondNum);
            firstNum = lastRes;
            currentInput = lastRes.toString();
            display.textContent = currentInput;
        }
        operator = value;
        shouldResetDisplay = true;
        return;
    }

    // Digits
    if (shouldResetDisplay) {
        currentInput = value;
        shouldResetDisplay = false;
    } else {
        currentInput += value;
    }
    display.textContent = currentInput;
}

// Add event listeners
digitButtons.forEach(btn => {
    btn.addEventListener("click", () => input(btn.textContent));
});

operatorButtons.forEach(btn => {
    btn.addEventListener("click", () => input(btn.textContent));
});

equalButton.addEventListener("click", () => input("="));
clearButton.addEventListener("click", () => input("clear"));

