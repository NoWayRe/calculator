const display = document.querySelector(".output");
const equals = document.querySelector(".equal");
const decimal= document.querySelector(".decimal");
const deleteKey = document.querySelectorAll(".delete");
const resetButton = document.querySelector(".reset");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");


// Event listeners to display the values and operator symbols in the calculator output div.

for (i = 0; i < numbers.length; i++){
    numbers[i].addEventListener("click", function(event) {
        const digit = document.createTextNode(event.target.textContent);
        display.appendChild(digit);
    });
}

for (i = 0; i < operators.length; i++){
    operators[i].addEventListener("click", function(event) {
        const symbol = document.createTextNode(event.target.textContent);
        if (display.textContent !== "" && !display.textContent.includes("+") && !display.textContent.includes("-") && !display.textContent.includes("*") && !display.textContent.includes("/")){
            display.appendChild(symbol);
        }
    });
}

decimal.addEventListener("click", function(){
    // The regular expression is used here to test for and prevent 2 consecutive decimals
    const pattern = /\.{2}/;
    const dot = document.createTextNode(decimal.textContent);

    if (display.textContent !== "" && !display.textContent.includes("+") && !display.textContent.includes("-") && !display.textContent.includes("*") && !display.textContent.includes("/") && !display.textContent.includes(".")){
        display.appendChild(dot);
    }
    else if (display.textContent.includes(".")) {
        if (display.textContent.split(".").length-1 < 2 && pattern.test(display.textContent) || (display.textContent.includes("+") || display.textContent.includes("-") && display.textContent.includes("*") || display.textContent.includes("/") || display.textContent.includes(".") && pattern.test(display.textContent))){
            display.appendChild(dot);
        }
    }
})

// Event Listener to clear the text form the display.

resetButton.addEventListener("click", function(){
    clear();
})

equals.addEventListener("click", function(){
    let num1;
    let num2;
    if (display.textContent !== "" && (display.textContent.includes("+") || display.textContent.includes("-") || display.textContent.includes("*") || display.textContent.includes("/"))){
        operate(num1, num2);
    }
})

//Operation functions

function add(a, b){
    return a + b;
}

function subtract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    return a / b;
}

// This function separates the 2 operands based on the index of the operator in the text content of the display and in turn displays the result based on the operator.

function operate(a, b){
    let operatorIndex;
    if (display.textContent.includes("+")) {
        operatorIndex = display.textContent.indexOf("+");
        a = Number(display.textContent.slice(0, operatorIndex));
        b = Number(display.textContent.slice(operatorIndex+1));
        display.textContent = add(a, b);
    }

    else if (display.textContent.includes("-")) {
        operatorIndex = display.textContent.indexOf("-");
        a = Number(display.textContent.slice(0, operatorIndex));
        b = Number(display.textContent.slice(operatorIndex+1));
        display.textContent = subtract(a, b);
    }

    else if (display.textContent.includes("*")) {
        operatorIndex = display.textContent.indexOf("*");
        a = Number(display.textContent.slice(0, operatorIndex));
        b = Number(display.textContent.slice(operatorIndex+1));
        display.textContent = multiply(a, b);
    }

    else if (display.textContent.includes("/")) {
        operatorIndex = display.textContent.indexOf("/");
        a = Number(display.textContent.slice(0, operatorIndex));
        b = Number(display.textContent.slice(operatorIndex+1));
        display.textContent = divide(a, b);
    }
            
}

//Reset function
function clear(){
    display.textContent = "";
}