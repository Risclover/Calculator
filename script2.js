let operand1 = '' 
let operand2 = ''
let currentOperation = null; 
// Resets the display screen (but not the whole )
let resetScrn = false;
// True = positive sign, false = negative sign
let sign = true; 
// Acts as a "Did you already press the decimal key?" variable
let decimalP = false;
let calculated = false;
// Acts as a "Did you just press the equals key?" variable 
let justEqualled = false; 
let expoD = false;

const numberBtns = document.querySelectorAll('.calcnumber');
const buttons = document.querySelectorAll('button');
const operatorBtns = document.querySelectorAll('.calcoperator');
const equalsBtn = document.querySelector('.calcequals');
const clearBtn = document.querySelector('.calcclear');
const deleteBtn = document.querySelector('.calcback');
const mainDisplay = document.getElementById('displaymain');
const smallDisplay = document.getElementById('displaysmall');
const signSwitch = document.querySelector('.calcposneg');
const decimalPoint = document.querySelector('.calcdeci');
const sideDisplay = document.querySelector('#displayside');
const exponentBtn = document.querySelector('.calcexp')

equalsBtn.addEventListener('click', equals);
clearBtn.addEventListener('click', clear);
deleteBtn.addEventListener('click', backSpace);
signSwitch.addEventListener('click', switchSign);
decimalPoint.addEventListener('click', decimal);

// When a number button is pressed, the dis() function runs. dis() controls the displays and helps everything be appended to the display correctly.
numberBtns.forEach(button => {
	button.addEventListener('click', (e) => dis(e.target.value));
});

// When an operator button (+ - * /) is pressed, the setOperation() function runs. setOperation() tells the program what kind of operation is currently being computed.
operatorBtns.forEach(operatorBtn => {
    operatorBtn.addEventListener('click', (e) => setOperation(e.target.value));
}); 

// Tells the program what kind of operation is being computed (+ - * /)
function setOperation(operator) {
    if (currentOperation !== null) evaluate() // If currentOperation isn't null, go ahead and evaluate.
    operand1 = mainDisplay.textContent; // operand1 = the number in the main display
    currentOperation = operator; // the current operation is the operator (taken from which operator button was last pressed)
    sideDisplay.textContent = currentOperation; // Updates the "side display" with the current operation
    smallDisplay.textContent = operand1; /* Updates the small display with what was originally in the main display, via 
                                            the operand1 variable acting as a middleman */
    resetScrn = true; // Yes, the screen needs to reset
    decimalP = false; // decimalP is false now
    reset(); // Resets the screen
}

// Just a quick little detour that adds whether or not the equals button has just been pressed
function equals() {
    justEqualled = true;
    evaluate();
}

// Rounds the number so that there aren't a million decimal places (i.e., 13.2 instead of 13.1900001)
function roundNumber(number) {
    return Math.round(number * 1000) / 1000;
}

// Evaluates. 
function evaluate() {
    calculated = true;
    if(currentOperation === null || resetScrn) // If the current operation isn't set or resetScrn is true, do nothing
        return
    if (currentOperation === '/' && mainDisplay.textContent == 0) { // If the user tries to divide by 0, alerts "nonono". (Changing this later; just a placeholder, really)
        alert('Nonono');
        return
    }
    if (expoD === true) {

    }
    operand2 = mainDisplay.textContent; // Updates operand2
    mainDisplay.textContent = roundNumber(operate(currentOperation, operand1, operand2)); // Does the actual operation
    smallDisplay.textContent = `${operand1} ${currentOperation} ${operand2} =`; // Updates the small display with the result
    currentOperation = null; // Resets the current operation to null
    decimalP = false; // Resets the decimal variable to false
    calculated = false; // Resets calculated to false
    sideDisplay.textContent = ''; // Erases the operator from the side display
}

// Resets the screen
function reset() {
    mainDisplay.textContent = ''; // Main display is blank
    resetScrn = false; // Resets the resetScrn variable to false
}

// Clears the entire calculator and starts from scratch
function clear() {
    mainDisplay.textContent = 0; // Main display shows 0
    smallDisplay.textContent = ''; // Small display shows nothing
    sideDisplay.textContent = ''; // Side display shows nothing
    currentOperation = null; // Resets currentOperation to null
    operand1 = ''; // Resets operand1
    operand2 = ''; // Resets operand2
    decimalP = false; // Resets decimal variable
    resetScrn = false; // Resets resetScrn variable
    sign = true; // Puts the sign back to positive
    calculated = false; // Resets calculated to false
}

// Controls the displays and appends the correct numbers and such to the existing screen
function dis(val) {
    /* Resets the main display under these conditions: the equals button was just pressed, the main display shows a 0 and not a 0., or the resetScrn variable is set to true */
    if (justEqualled || (mainDisplay.textContent == 0 && mainDisplay.textContent != '0.')|| resetScrn) {
        reset();
    } 
    // If calculated is true...
    if (calculated === true ) {
        reset(); // Reset the main display
        currentOperation = null; // Set the current operation to null
        operand1 = ''; // Reset operand1
        operand2 = ''; // Reset operand2
        smallDisplay.innerHTML = ''; // reset small display
        mainDisplay.textContent += val; // Append the value of the button pressed to the main display

    // If calculated is false, just append the value of the button pressed to the main display
    } else if (calculated === false) {
        mainDisplay.textContent += val;
    }

    // Set justEqualled to false (because it wasn't pressed just now)
    justEqualled = false;

}

// A backspace function
function backSpace() {
    // If the equals button was just pressed, erase the small display instead of the main display
    if (justEqualled) {
        smallDisplay.textContent = '';

    // Otherwise, backspace the main display each time the backspace button is pressed
    } else {
        mainDisplay.textContent = mainDisplay.textContent.toString().slice(0, -1);
    }

    // Resets the main display back to 0 instead of allowing it to go to a blank display
    if (mainDisplay.textContent == '') {
        mainDisplay.textContent = 0;
    }
}

// Specifies which operation to run depending on the current operator. Pretty self-explanatory.
function operate (operator, a, b) {
    a = Number(a);
    b = Number(b);
    switch(operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a,b);
        case '*':
            return multiply(a,b);
        case '/':
            return divide(a, b);
        case '^':
            return exponent(a, b);
        default:
            return null;
    }
}

// Specifies how to add, subtract, multiply, and divide
function add (a, b) {
    return a + b;
}

function subtract (a, b) {
    return a - b;
}

function multiply (a, b) {
    return a * b;
}

function divide (a, b) {
    return a / b;
}

function exponent (a, b) {
    return a**b;
}

/* For the +/- button; switches the sign and makes sure that it remains a number 
(because I was getting NaN for some reason at some point) */
function switchSign() {
    mainDisplay.textContent = Number(mainDisplay.textContent) * -1;
}

// For the decimal button
function decimal() {
    // When the decimal button is pressed and if decimalP isn't true (because if it's false, that means a decimal has already been pressed)...
    if (decimalP != true) {
        // If there's nothing in the main display, 
        if (mainDisplay.innerHTML === '') {
            mainDisplay.textContent = 0;
        }
        mainDisplay.textContent += '.';
    }
    decimalP = true;
}

// Adds keyboard capabilities to the calculator, because clicking buttons can get tiring.
document.addEventListener('keydown', function (event) {
    if (mainDisplay.innerText == 0) {
        mainDisplay.innerText = '';
    }
    if (mainDisplay.innerText == 0 && event.key === '.') {
        decimal();
    }
    if (event.key === '0') {
        dis(0);
    } else if (event.key === '1') {
        dis(1);
    }  else if (event.key === '2') {
        dis(2);
    }  else if (event.key === '3') {
        dis(3);
    }  else if (event.key === '4') {
        dis(4);
    }  else if (event.key === '5') {
        dis(5);
    }  else if (event.key === '6') {
        dis(6);
    }  else if (event.key === '7') {
        dis(7);
    }  else if (event.key === '8') {
        dis(8);
    }  else if (event.key === '9') {
        dis(9);
    } else if (event.key === 'Backspace') {
        event.target.blur();
        backSpace();
    } else if (event.key === 'c') {
        event.target.blur();
        clear();
    } else if (event.key === '+') {
        setOperation('+');
    } else if (event.key === '-') {
        setOperation('-');
    } else if (event.key === '*') {
        setOperation('*');
    } else if (event.key === '/') {
        setOperation('/');
    } else if (event.key === 'Enter') {
        equals();
    } else if (event.key === '.') {
        decimal();
    } else if (event.key === '^') {
        setOperation('^');
    } else if (event.key === ' ') {
        switchSign();
    }
});