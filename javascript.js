const display = document.querySelector(".output");
const equals = document.querySelector(".equal");
const minus = document.querySelector(".minus");
const decimal= document.querySelector(".decimal");
const deleteKey = document.querySelector(".delete");
const resetButton = document.querySelector(".reset");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
let result = "";
let operationComplete = false;


// Displays the values and operator symbols in the calculator output div.

for (i = 0; i < numbers.length; i++){
    numbers[i].addEventListener("click", function(event) {

            const digit = document.createTextNode(event.target.textContent);
            display.appendChild(digit);
        
    });
}

for (i = 0; i < operators.length; i++){
    operators[i].addEventListener("click", function(event) {
        const symbol = document.createTextNode(event.target.textContent);
        if (display.textContent !== "" && !display.textContent.includes("+") && !display.textContent.includes("*") && !display.textContent.includes("/") && display.textContent.split("-").length-1 < 2 && display.textContent[display.textContent.length - 1] !== "-"){
            display.appendChild(symbol);
        }
        else if (display.textContent === "" && event.target.textContent === "-" ){
            display.appendChild(symbol);
        }
    });
}

// Removes the last item from the display

deleteKey.addEventListener("click", function(){
   display.textContent = display.textContent.slice(0, display.textContent.length - 1);
})


// Adds decimal

decimal.addEventListener("click", function(){
    const dot = document.createTextNode(decimal.textContent);

    // If the display includes only numbers, add decimal.

if (display.textContent !== "" && display.textContent[display.textContent.length - 1] !== "." && display.textContent.split(".").length-1 === 0 && !display.textContent.includes("+") && !display.textContent.includes("-") && !display.textContent.includes("*") && !display.textContent.includes("/")){

    display.appendChild(dot);
}

    // If the display includes a number with no decimal and an opeator, add decimal as long as the decimal is not next to an operator

 else if (display.textContent.split(".").length-1 === 0 && ((display.textContent.includes("+") || display.textContent.includes("-") || display.textContent.includes("*") || display.textContent.includes("/")) && (display.textContent[display.textContent.length - 1] !== "+" && display.textContent[display.textContent.length - 1] !== "-" && display.textContent[display.textContent.length - 1] !== "*" && display.textContent[display.textContent.length - 1] !== "/"))) {

    display.appendChild(dot);
 } 

 // If the display includes a number with decimal and an opeator, add decimal as long as the decimal is not next to an operator

 else if (display.textContent.split(".").length-1 === 1 && display.textContent[display.textContent.length - 1] !== "." && (display.textContent[display.textContent.length - 1] !== "+" && display.textContent[display.textContent.length - 1] !== "-" && display.textContent[display.textContent.length - 1] !== "*" && display.textContent[display.textContent.length - 1] !== "/") && (!display.textContent.slice(display.textContent.indexOf("+")+1).includes(".")  || !display.textContent.slice(display.textContent.indexOf("-")+1).includes(".") || !display.textContent.slice(display.textContent.indexOf("*")+1).includes(".") || !display.textContent.slice(display.textContent.indexOf("/")+1).includes(".")))   {

    display.appendChild(dot);
 }
})

// Event Listener to clear the text from the display.

resetButton.addEventListener("click", function(){
    clear();
})

equals.addEventListener("click", function(){
    let num1;
    let num2;

    if (display.textContent !== "" && (display.textContent.includes("+") || display.textContent.includes("-") || display.textContent.includes("*") || display.textContent.includes("/"))){

        operate(num1, num2);
    }

    else if (display.textContent[0] === "-"){
        return;
    }
})

//Operation functions

function add(a, b){
    result = a + b;
    return result;
}

function subtract(a, b){
    result = a - b;
    return result;
}

function multiply(a, b){
    result = a * b;
    return result;
}

function divide(a, b){
    result = a / b;
    return result;
}

// This function separates the 2 operands based on the index of the operator in the text content of the display and in turn, displays the result based on the operator.

function operate(a, b){
    let operatorIndex;

    if (display.textContent.includes("+")) {

        operatorIndex = display.textContent.indexOf("+");
        console.log(operatorIndex);
        a = Number(display.textContent.slice(0, operatorIndex));
        b = Number(display.textContent.slice(operatorIndex+1));
        display.textContent = add(a, b);
    }

    else if (display.textContent.includes("*")) {

        operatorIndex = display.textContent.indexOf("*");
        console.log(operatorIndex);
        a = Number(display.textContent.slice(0, operatorIndex));
        b = Number(display.textContent.slice(operatorIndex+1));
        display.textContent = multiply(a, b);
    }

    else if (display.textContent.includes("/")) {

        operatorIndex = display.textContent.indexOf("/");
        console.log(operatorIndex);
        a = Number(display.textContent.slice(0, operatorIndex));
        b = Number(display.textContent.slice(operatorIndex+1));
        display.textContent = divide(a, b);
    } 

    else if (display.textContent.includes("-") && display.textContent[0] !== "-") {

        operatorIndex = display.textContent.indexOf("-");
        console.log(operatorIndex);
        a = Number(display.textContent.slice(0, operatorIndex));
        b = Number(display.textContent.slice(operatorIndex+1));
        display.textContent = subtract(a, b);
    }

    else if (display.textContent.includes("-") && display.textContent[0] === "-") {

        operatorIndex = display.textContent.indexOf("-", 2);
        if (operatorIndex !== -1){
            a = Number(display.textContent.slice(0, operatorIndex));
            b = Number(display.textContent.slice(operatorIndex+1));
            display.textContent = subtract(a, b);
        }

        else{
            return display.textContent;
        }
        
    }
}

//Reset function

function clear(){
    display.textContent = "";
}