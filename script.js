const mainDisplay = document.getElementById('displaymain');
const smallDisplay = document.getElementById('displaysmall');
const sideDisplay = document.getElementById('displayside');
const buttons = document.querySelectorAll('button');
let reset = false;
let calculated;
let previousButton;
let calc;
let currentButton;

buttons.forEach(button => {
	button.addEventListener('click', operate);
});

document.addEventListener('keydown', function (event) {
    if (mainDisplay.innerText === '0') {
        mainDisplay.innerText = '';
    }
    if (event.key === '0') {
        mainDisplay.textContent += 0;
    } else if (event.key === '1') {
        mainDisplay.textContent += 1;
    }  else if (event.key === '2') {
        mainDisplay.textContent += 2;
    }  else if (event.key === '3') {
        mainDisplay.textContent += 3;
    }  else if (event.key === '4') {
        mainDisplay.textContent += 4;
    }  else if (event.key === '5') {
        mainDisplay.textContent += 5;
    }  else if (event.key === '6') {
        mainDisplay.textContent += 6;
    }  else if (event.key === '7') {
        mainDisplay.textContent += 7;
    }  else if (event.key === '8') {
        mainDisplay.textContent += 8;
    }  else if (event.key === '9') {
        mainDisplay.textContent += 9;
    } else if (event.key === 'c') {
        clear();
    } else if (event.key === '+') {
        let num1 = mainDisplay.textContent;
        let num2 = smallDisplay.textContent;
        calc = add(num1, num2);
        sideDisplay.innerText = '+';
        previousButton = '+';
    } else if (event.key = '*') {
        let num1 = mainDisplay.textContent;
        let num2 = smallDisplay.textContent;
		calc = times(num1, num2);
        sideDisplay.innerText = '*';
        previousButton = '*';
    } else if (event.key = '-') {
        let num1 = mainDisplay.textContent;
        let num2 = smallDisplay.textContent;
		calc = minus(num1, num2);
        sideDisplay.innerText = '-';
        mainDisplay.textContent = '';
        previousButton = '-';
    } else if (event.key = 'Enter') {
        if (previousButton === '+') {
            mainDisplay.textContent = parseInt(mainDisplay.textContent) + parseInt(smallDisplay.textContent);
        } else if (previousButton === '-') {
            mainDisplay.textContent = parseInt(smallDisplay.textContent) - parseInt(mainDisplay.textContent); 
        } else if (previousButton === '*') {
            mainDisplay.textContent = parseInt(mainDisplay.textContent) * parseInt(smallDisplay.textContent);
        } else if (previousButton === '/') {
            mainDisplay.textContent = parseInt(smallDisplay.textContent) / mainDisplay.textContent;
        }
        smallDisplay.innerText='';
        sideDisplay.innerText='=';
		if (mainDisplay.innerText !== '') {
			reset = true;
        }
    }
});


function operate(e) {
    let num1 = smallDisplay.textContent;
	currentButton = e.target.value;
	if (currentButton === '+') {
        let num2 = mainDisplay.textContent;
        calc = add(num1, num2);
        sideDisplay.innerText = '+';
        previousButton = '+';
	} else if (currentButton === '-') {
        let num2 = mainDisplay.textContent;
		calc = minus(num1, num2);
        sideDisplay.innerText = '-';
        mainDisplay.textContent = '';
        previousButton = '-';
	} else if (currentButton === '*') {
        let num2 = mainDisplay.textContent;
		calc = times(num1, num2);
        sideDisplay.innerText = '*';
        previousButton = '*';
	} else if (currentButton === '/') {
        let num2 = mainDisplay.textContent;
		calc = div(num1, num2);
        sideDisplay.innerText = '/';
        previousButton = '/';
	} else if (currentButton === 'clear') {
		clear();
    } else if (currentButton === 'smallclear') {
        smallClear();
    } else if (currentButton === '=') {
        if (previousButton === '+') {
            mainDisplay.textContent = parseInt(mainDisplay.textContent) + parseInt(smallDisplay.textContent);
        } else if (previousButton === '-') {
            mainDisplay.textContent = parseInt(smallDisplay.textContent) - parseInt(mainDisplay.textContent); 
        } else if (previousButton === '*') {
            mainDisplay.textContent = parseInt(mainDisplay.textContent) * parseInt(smallDisplay.textContent);
        } else if (previousButton === '/') {
            mainDisplay.textContent = parseInt(smallDisplay.textContent) / mainDisplay.textContent;
        }
        smallDisplay.innerText='';
        sideDisplay.innerText='=';
		if (mainDisplay.innerText !== '') {
			reset = true;
        }
	} else {
        dis(currentButton);
        
    }
	
}

function add(a, b) {
    var one = parseInt(a) || 0;
    var two = parseInt(b) || 0;
    calculated = one+two;
    smallDisplay.innerText = parseInt(calculated);
    mainDisplay.innerText = '';
}

function minus(a, b) {
	var one = parseInt(a) || 0;
    var two = parseInt(b) || 0;
    calculated = two - one;
    smallDisplay.innerText = parseInt(calculated);
    mainDisplay.innerText = '';
}

function times(a, b) {
	var one = parseInt(a) || 1;
    var two = parseInt(b) || 1;
    calculated = one * two;
    smallDisplay.innerText = parseInt(calculated);
    mainDisplay.innerText = '';
}

function div(a, b) {
	var one = parseInt(a) || 1;
    var two = parseInt(b) || 1;
    calculated = one / two;
    smallDisplay.innerText = parseInt(calculated);
    mainDisplay.innerText = '';
}

function clear() {
	mainDisplay.innerText = 0;
	smallDisplay.innerText = '';
	sideDisplay.innerText = '';
	reset = false;
}

function smallClear() {
    mainDisplay.innerText = 0;
    reset= false;
}

function dis(val) {
    if (mainDisplay.innerText == 0) {
        mainDisplay.innerText = '';
    }
    mainDisplay.innerText += val;
}

function loaded() {
	mainDisplay.innerText = 0;
}

loaded();

