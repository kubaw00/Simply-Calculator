
class Calculator {
    constructor(previousOperantDiv,currentOperantDiv){
        this.previousOperantDiv = previousOperantDiv;
        this.currentOperantDiv = currentOperantDiv;
        this.clear();
    }

    delete(){
        this.currentOperant = this.currentOperant.toString().slice(0,-1);
    }

    clear(){
        this.currentOperant ='';
        this.previousOperant ='';
        this.operation = undefined;
    }

    appendNumber(number){
        if(number === "." && this.currentOperant.includes('.')) return
        this.currentOperant = this.currentOperant.toString() + number.toString();
    }
    chooseOperation(operation){
        if(this.currentOperant === "") return
        if(this.previousOperant !== "") {
            this.compute()
        }
        this.operation = operation;
        this.previousOperant = this.currentOperant;
        this.currentOperant = ''
    }

    compute(){
        let computation;
        const prev = parseFloat(this.previousOperant);
        const curr = parseFloat(this.currentOperant);
        if(isNaN(prev) || isNaN(curr)) return
        switch(this.operation){
            case "+": {
                computation = prev + curr;
            } break;
            case "-":{
                computation = prev - curr;
            } break;
            case "*":{
                computation = prev * curr;
            } break;
            case "÷":{
                computation = prev / curr;
            } break;
            default: return 

        }
        this.currentOperant = computation;
        this.previousOperant ="";
        this.operation = undefined;
        }
  

        getDisplayNumber(number) {
            const stringNumber = number.toString();
            const integerDigits = parseFloat(stringNumber.split('.')[0]);
            const decimalString = stringNumber.split('.')[1];
            let integerDisplay;
            if(isNaN(integerDigits)){
                integerDisplay = ""
            } else {
                integerDisplay = integerDigits.toLocaleString('en', {
                    maximumFractionDigits: 0 });

            }
            if(decimalString != null){
                return `${integerDisplay}.${decimalString}`
            } else {
                return integerDisplay
            }

        }
        

    updateDisplay(){
        this.currentOperantDiv.innerText = this.getDisplayNumber(this.currentOperant);
        // this.previousOperantDiv.textContent = this.previousOperant;
        if(this.operation != undefined){
        this.previousOperantDiv.textContent = `${this.getDisplayNumber(this.previousOperant)}  ${this.operation}`;
        } else this.previousOperantDiv.textContent= ""
    }

}



const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalButton = document.querySelector('[data-equal]');
const deleteButton = document.querySelector('[data-delete]');
const clearAllButton = document.querySelector('[data-all-clear]');
const currentOperantDiv = document.querySelector('[data-current-operant]');
const previousOperantDiv = document.querySelector('[data-previous-operant]');

const calculator = new Calculator(previousOperantDiv,currentOperantDiv);

numberButtons.forEach(button => {
    button.addEventListener('click', function (){
        this.appendNumber(button.innerText);
        this.updateDisplay();
    }.bind(calculator));
})
operationButtons.forEach(button => {
    button.addEventListener('click', function (){
        this.chooseOperation(button.innerText);
        this.updateDisplay();
    }.bind(calculator));
})

equalButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
})
clearAllButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
})
deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})
