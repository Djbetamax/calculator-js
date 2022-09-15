const calculator = {
  displayValue: '0',
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
};

function inputDigit(digit) {
  const { displayValue, waitingForSecondOperand } = calculator;
  if (waitingForSecondOperand === true) {
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
  } else {
      calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
  }
}

function inputDecimal(dot) {
  if (calculator.waitingForSecondOperand === true) {
    calculator.displayValue = '0';
    calculator.waitingForSecondOperand = false;
    return;
  } else if (!calculator.displayValue.includes(dot)) {
      calculator.displayValue += dot;
    }
}

function handleOperator(nextOperator) {
  const { firstOperand, displayValue, operator } = calculator;
  const inputValue = parseFloat(displayValue);

  if (operator && calculator.waitingForSecondOperand) {
    calculator.operator = nextOperator;

    console.log(calculator);
    return;
  } else if (firstOperand === null && !isNaN(inputValue)) {
      calculator.firstOperand = inputValue;
  } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator);

      calculator.displayValue = `${ parseFloat(result.toFixed(7)) }`;
      calculator.firstOperand = result;
  }

  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
}

function calculate (firstOperand, secondOperand, operator) {
  if (operator === '+') {
    return firstOperand + secondOperand;
  } else if (operator === '-') {
      return firstOperand - secondOperand;
  } else if (operator === '*') {
      return firstOperand * secondOperand;
  } else if (operator === '÷') { 
      return firstOperand / secondOperand;
  }
  return secondOperand;
}

// TODO function backValue () {

// }

function resetCalculator () {
  calculator.displayValue = '0';
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
}

function updateDisplay() {
  const display = document.querySelector('.display');
  display.value = calculator.displayValue;
}
updateDisplay();

const keys = document.querySelector('.keys');
keys.addEventListener('click', ev => {
  const { target } = ev;
  const { value } = target;

  if (!target.matches('button')) {
    return;
  } switch (value) {
      case '+':
      case '-':
      case '*':
      case '÷':
      case '=':
        handleOperator(value)
        break;
      case '.':
        inputDecimal(value);
        break;
      case 'clear':
        break;
      case 'all-clear':
        resetCalculator(value);
        break;
      default:
        if (Number.isInteger(parseFloat(value))) {
          inputDigit(target.value);
        }
      }  
    updateDisplay();
});
