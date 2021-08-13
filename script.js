class Splitter{
    constructor(billTextElement, tipButtons, peopleTextElement, tipAmountTextElement, totalTextElement) {
        this.billTextElement = billTextElement;
        this.tipButtons = tipButtons;
        this.peopleTextElement = peopleTextElement;
        this.tipAmountTextElement = tipAmountTextElement;
        this.totalTextElement = totalTextElement; 
        this.reset();
    }

    reset(){
        this.billTextElement.value = '';
        for(let i = 0; i < tipButtons.length; i++){
            tipButtons[i].className = tipButtons[0].className.replace(" active", "");

        }
        this.peopleTextElement.value = '';
        this.tipAmountTextElement.innerText = '$0.00';
        this.totalTextElement.innerText = '$0.00';
        // const totalTableData = document.get()
    }

    showPeopleWarning(){
        warningZeroTableData.style.textAlign = "right";
        warningZeroTableData.style.color = 'rgb(231, 119, 119)';
        warningZeroTableData.appendChild(warningZeroText);
        numOfPeopleForm.classList.toggle("warningZero");
        tablePeople.insertBefore(warningZeroTableData, newTD);

    }

    removePeopleWarning(){  
        warningZeroTableData.remove();
        numOfPeopleForm.classList.remove("warningZero");

    }


    compute(tipUsed){
        if (this.billTextElement.value !== '' && this.peopleTextElement.value !== ''){
            let billValue = parseFloat(billTextElement.value);
            let numOfPeople = parseFloat(peopleTextElement.value);
            if(numOfPeople === 0 && !warned){
                this.showPeopleWarning();
                warned = true;
                return;
            } else if (numOfPeople === 0 && warned){
                return
            }
            warned = false;
            this.removePeopleWarning();
            let customTipValue = parseFloat(customTip.value);
            let tipPerPerson;
            let totalPerPerson;

            // let tipUsed;
            if(customTip.value != ''){
                tipUsed = customTipValue;
            }

            console.log("bill value = "+billValue);
            console.log("tip used = "+ tipUsed);
            console.log("num of people = "+numOfPeople);
    

            tipPerPerson = (((tipUsed/100) * billValue)/numOfPeople).toFixed(2);
            totalPerPerson = ((billValue + ((tipUsed/100) * billValue))/numOfPeople).toFixed(2);

            console.log("tipPerPerson = " + tipPerPerson);
            console.log("totalPerPerson = " + totalPerPerson);
            this.tipAmountTextElement.innerText =  `$${tipPerPerson}`;
            this.totalTextElement.innerText = `$${totalPerPerson}`;


        } else {
            return;
        }
    }
}


const billTextElement = document.querySelector('[data-bill]');
const tipButtons = document.getElementsByClassName('buttonTip');
const customTip = document.querySelector('[data-tip-custom]');
const peopleTextElement = document.querySelector('[data-number-people]');
const resetButton = document.querySelector('[data-reset]');
const calculateButton = document.querySelector('[data-calculate]');
const tipAmountTextElement = document.querySelector('[data-tip-amount]');
const totalTextElement = document.querySelector('[data-total]');
const numOfPeopleForm = document.querySelector(".formPeople");

const warningZeroTableData = document.createElement('td');
const warningZeroText = document.createTextNode("Can't be zero");
const tablePeople = document.querySelector('[data-tr-people]');
const newTD = tablePeople.querySelector('td:nth-child(2)');
var warned;

// this.tipChosen = false;
const splitter = new Splitter (billTextElement, tipButtons, peopleTextElement, tipAmountTextElement, totalTextElement);

// splitter.selectTip();
let header = document.querySelector(".selectTip");
var tipUsed = 0;
for (let i = 0; i < tipButtons.length; i++){
    tipButtons[i].addEventListener('click', (event) => {
        console.log("tip pressed = "+tipButtons[i].innerHTML);
        let tipValue = parseFloat(tipButtons[i].innerHTML.slice(0, -1));
        console.log("tipValue = " + tipValue);
        tipUsed = tipValue;
        let current = document.getElementsByClassName("active");
        if(current.length > 0) {
            current[0].className = current[0].className.replace(" active", "");
        }
        tipButtons[i].className += " active";
    });
}

resetButton.addEventListener('click', (event) => {
    console.log("Reset");
    splitter.reset();
});

calculateButton.addEventListener('click', (event) =>{
    console.log("Calculate");
    splitter.compute(tipUsed);
})


