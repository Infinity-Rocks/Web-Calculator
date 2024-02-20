function add(a, b) {
    return Math.round((a + b) * 1000) / 1000;
}

function subtract(a, b) {
    return Math.round((a - b) * 1000) / 1000;
}

function multiply(a, b) {
    return Math.round((a * b) * 1000) / 1000;
}

function divide(a, b) {
    if (b == 0) {
        window.open("https://media1.tenor.com/m/21d9atXjQiwAAAAC/gordon-ramsay.gif");
    }
    return Math.round((a / b) * 1000) / 1000;
}

function power(a, b) {
    return Math.round((Math.pow(a, b)) * 1000) / 1000;
}

function modulo(a, b) {
    return Math.round((a / b) * 1000) / 1000;
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
    'AC', 'DEL', '∧', '﹪',
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
    'DEL': 'back',
    '=': 'equal'
}

const buttons = [];
let mainButtonList = {};
let functionButtonList = {};

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

    if (label == "=" || label == "DEL" || label == "AC" || label == ".") {
        functionButtonList[label] = button
    }
    else {
        mainButtonList[label] = button;
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

const clearBtn = functionButtonList["AC"];
const backBtn = functionButtonList["DEL"];
const equalBtn = functionButtonList["="];
const decimalBtn = functionButtonList["."];

for (const btn in mainButtonList) {
    mainButtonList[btn].addEventListener("click", () => {
        if (calculatorDisplay.textContent == "ERROR!" || calculatorDisplay.textContent == "NaN") {
            calculatorDisplay.textContent = "";
        }
        if (mainButtonList[btn].textContent in operatorMap) {
            decimalBtn.disabled = false;
        }
        calculatorDisplay.textContent += mainButtonList[btn].textContent;
    });
};

clearBtn.addEventListener("click", () => {
    calculatorDisplay.textContent = "";
});

backBtn.addEventListener("click", () => {
    if (calculatorDisplay.textContent == "ERROR!") {
        calculatorDisplay.textContent = "";
    }
    else if (calculatorDisplay.textContent != "") {
        calculatorDisplay.textContent = calculatorDisplay.textContent.slice(0, -1);
    }
});

equalBtn.addEventListener("click", () => {
    let expression = calculatorDisplay.textContent;
    if (expression == "NaN" || expression.length == 1 || expression == "undefined") {
        calculatorDisplay.textContent = "";
    }
    else if (expression != "" && expression != "ERROR!") {
        let total = 0;
        let expressionNums = [];
        let expressionOprs = [];
        let number = ""

        for (let i = 0; i < expression.length; i++) {
            if (/^[-+]?(\d+(\.\d*)?|\.\d+)$/.test(expression[i]) || expression[i] == ".") {
                number += expression[i];
            }
            else {
                if (checkNumberType(number) == "float") {
                    expressionNums.push(parseFloat(number));
                }
                else {
                    expressionNums.push(parseInt(number, 10));
                }
                expressionOprs.push(expression[i]);
                number = "";
            }
        }

        if (number != "") {
            if (checkNumberType(number) == "float") {
                expressionNums.push(parseFloat(number));
            }
            else {
                expressionNums.push(parseInt(number, 10));
            }
        }

        for (let i = 0; i < expressionOprs.length; i++) {
            let num1 = expressionNums[0];
            let num2 = expressionNums[1];

            total = operate(num1, num2, expressionOprs[i]);

            expressionNums.shift();
            expressionNums.shift();
            expressionNums.unshift(total);
        }
        calculatorDisplay.textContent = `${total}`;
    }
    else {
        calculatorDisplay.textContent = "ERROR!"
    }
});

decimalBtn.addEventListener("click", () => {
    if (expression == "NaN") {
        calculatorDisplay.textContent = "";
    }
    calculatorDisplay.textContent += '.';
    decimalBtn.disabled = true;
});

document.addEventListener("keydown", function (event) {
    if (event.key >= '0' && event.key <= '9') {
        calculatorDisplay.textContent += event.key;
    }
    else if (event.key == '.' && !decimalBtn.disabled) {
        calculatorDisplay.textContent += event.key;
        decimalBtn.disabled = true;
    }
    else if (event.key == '+' || event.key == '-' || event.key == '*' || event.key == '^' || event.key == '%') {
        if (event.key == '*') {
            calculatorDisplay.textContent += 'x';
        }
        else if (event.key == '^') {
            calculatorDisplay.textContent += '∧';
        }
        else if (event.key == '%') {
            calculatorDisplay.textContent += '﹪';
        }
        else {
            calculatorDisplay.textContent += event.key;
        }
    }
    else if (event.key == 'Backspace') {
        backBtn.click();
    }
    else if (event.key == '=' || event.key == 'Enter') {
        equalBtn.click();
    }
});

function checkNumberType(number) {
    if (/^[-+]?\d*\.\d+$/.test(number)) {
        return "float";
    }
    return "int";
}