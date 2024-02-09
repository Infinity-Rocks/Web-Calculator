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

function power(a, b) {
    return Math.pow(a, b);
}

function modulo(a, b) {
    return a % b;
}

function operate(num1, num2, operand) {
    switch (operand) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case 'x':
            return multiply(num1, num2);
        case '/':
            return divide(num1, num2);
        case '∧':
            return power(num1, num2);
        case '﹪':
            return modulo(num1, num2);
    }
}

const calculatorBody = document.createElement("div");
const calcutatorHeader = document.createElement("div");
const calculatorDisplay = document.createElement("div");
const numberSquare = document.createElement("div");

const buttonLabels = [
    'AC', '🔙', '∧', '﹪',
    '7', '8', '9', '/',
    '4', '5', '6', 'x',
    '1', '2', '3', '-',
    '0', '.', '=', '+'
];

const operatorMap = {
    '.': 'decimal',
    '/': 'divide',
    'x': 'multiply',
    '-': 'subtract',
    '+': 'addition',
    '∧': 'exp',
    '﹪': 'modulo',
    '🔙': 'back',
    '=': 'equal'
}

const buttons = [];

buttonLabels.forEach(label => {
    const button = document.createElement('button');
    button.textContent = label;
    button.classList.add("main-body-buttons");
    if (label in operatorMap) {
        button.classList.add('button-' + operatorMap[label]);
    }
    else {
        button.classList.add('button-' + label);
    }
    numberSquare.appendChild(button);
    buttons.push(button);
});

calculatorBody.classList.add("calculator-body");
calcutatorHeader.classList.add("calculator-header");
calculatorDisplay.classList.add("calculator-display");

numberSquare.classList.add("number-square");

calcutatorHeader.textContent = "CALCULATOR";

document.addEventListener("DOMContentLoaded", () => {
    calculatorBody.appendChild(calcutatorHeader);
    calculatorBody.appendChild(calculatorDisplay);

    calculatorBody.appendChild(numberSquare);
    document.body.appendChild(calculatorBody);
});


