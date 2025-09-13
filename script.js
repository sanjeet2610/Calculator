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
    if (operator === '+') add(a, b);
    else if (operator === '-') subtract(a, b);
    else if (operator === '/') divide(a, b);
    multiply(a, b);
}
let firstNumber;
let secondNumber;
let operator;
let flag = 0;

function populate() {
    const numbers = document.querySelectorAll(".digit");
    const operators = document.querySelectorAll(".operators");
    let n = '';
    const display = document.querySelector(".display");
    numbers.forEach(number => {
        number.addEventListener("click", (e) => {
            n += e.target.textContent;
            display.textContent = n;
        });
    });

    operators.forEach(operator => {
        operator.addEventListener("click", (e) => {
            display.textContent = '';
            n = '';
            operator = e.target.textContent;
            if (flag == 0) {
                firstNumber = parseInt(display.textContent);
                flag = 1;
            } else {
                secondNumber = parseInt(display.textContent);
            }
        });
    });
}

populate();
