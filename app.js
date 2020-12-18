const budget = {
    month: document.querySelector('.budget__title--month'),
    netBudget: 0,
    netBudgetBox: document.querySelector('.budget__value'),
    totalIncomeBox: document.querySelector('.budget__income--value'),
    totalIncome: 0,
    totalExpensesBox: document.querySelector('.budget__expenses--value'),
    totalExpenses: 0,
    totalExpensesPercentageBox: document.querySelector('.budget__expenses--percentage'),
    totalExpensesPercentage: 0,
}

let currentDate = new Date();
budget.month.innerText = `${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getFullYear()}`;

// set all values to 0
budget.netBudgetBox.innerText = 0;
budget.totalIncomeBox.innerText = 0;
budget.totalExpensesBox.innerText = 0;
budget.totalExpensesPercentageBox.innerText = 0;

const inputDescription = document.querySelector(".add__description");
const inputValue = document.querySelector(".add__value");
const addBtn = document.querySelector(".add__btn");
const type = document.querySelector(".add__type");
const container = document.querySelector('.container');

// EVENT LISTENERS 
container.addEventListener('click', deleteItem);
addBtn.addEventListener('click', () => {
    if (inputValue.value > 0 && inputDescription.value !== ""){
        addList();
    } else if (inputDescription.value === "" || inputValue.value === ""){
        alert("Must fill up all the fields");
        return
    } else if (inputValue.value <= 0){
        alert("Cannot put a zero/negative value");
        return
    }
})

function addList() {   
// ITEM DIV
	const itemDiv = document.createElement('div');
    itemDiv.classList.add('item');
    itemDiv.classList.add('clearfix');
// create new item description
	const newItem = document.createElement('div');
	newItem.innerText = inputDescription.value;
	newItem.classList.add('item__description');
    itemDiv.appendChild(newItem);   
// create new div for right values
    const right = document.createElement('div');
    right.classList.add('right');
    right.classList.add('clearfix');
    itemDiv.appendChild(right);
// create new item value
    const newValue = document.createElement('div');
    newValue.classList.add('item__value');
    right.appendChild(newValue);
// Expense List vs Income List
    if (type.value === "inc"){
        var list = document.querySelector(".income__list");
        newValue.innerText = inputValue.value;
        budget.totalIncome = parseFloat(budget.totalIncome) + parseFloat(inputValue.value);
        budget.totalIncomeBox.innerText = formatter.format(budget.totalIncome);
    } else if (type.value === "exp") {
        let newPctg = document.createElement('div');
        let compute = Math.round(inputValue.value/parseFloat(budget.totalIncome)*100)
        // console.log(compute);
        newPctg.classList.add('item__percentage');
        right.appendChild(newPctg);
        newPctg.innerText = `${compute} %`
        // console.log(newPctg);
        var list = document.querySelector(".expenses__list");
        newValue.innerText = inputValue.value;
        budget.totalExpenses = parseFloat(budget.totalExpenses) + parseFloat(inputValue.value);
        budget.totalExpensesBox.innerText = formatter.format(budget.totalExpenses);
        // console.log(budget.totalExpenses, budget.totalExpensesBox)
    }
// create delete div
    const trashDiv = document.createElement('div');
    trashDiv.classList.add("item__delete");
    right.appendChild(trashDiv)
// create delete button
	const trashButton = document.createElement('button');
	trashButton.innerHTML = '<i class="ion-ios-close-outline">'
	trashButton.classList.add("item__delete--btn");
    trashDiv.appendChild(trashButton);
// Add to itemDiv
    list.appendChild(itemDiv)
//Clear Input Value
    inputDescription.value="";
    inputValue.value="";
    computePercentage();
    computeTotals();
    updatePercent();
}

function deleteItem(e){
	const i__class = e.target;
	if (i__class.classList[0] === "ion-ios-close-outline"){
        const closeDiv = i__class.parentElement.parentElement;
        const item = closeDiv.parentElement.parentElement;
        const itemDiv = item.parentElement;
        if (itemDiv.classList[0] === "income__list"){
            let sibling = closeDiv.previousElementSibling;
            budget.totalIncome = parseFloat(budget.totalIncome) - parseFloat(sibling.innerHTML);
            budget.totalIncomeBox.innerText = formatter.format(budget.totalIncome);
        } else if (itemDiv.classList[0] === "expenses__list"){
            let sibling = closeDiv.previousElementSibling.previousElementSibling;
            budget.totalExpenses = parseFloat(budget.totalExpenses) - parseFloat(sibling.innerHTML);
            budget.totalExpensesBox.innerText = formatter.format(budget.totalExpenses);
        }
        item.remove();        
        computePercentage();
        computeTotals();
        updatePercent();
	}
}

function computePercentage(){
    budget.totalExpensesPercentage = parseFloat(budget.totalExpenses/budget.totalIncome);
    let percent = Math.round(budget.totalExpensesPercentage * 100);
    budget.totalExpensesPercentageBox.innerText = `${percent} %`;    
}

function computeTotals(){
    budget.netBudget = parseFloat(budget.totalIncome - budget.totalExpenses);
    budget.netBudgetBox.innerText = formatter.format(budget.netBudget);
}

function updatePercent(){
    let percentList = document.querySelectorAll('.item__percentage');
    for (i = 0; i < percentList.length; i++) {
        var element = percentList[i];
        console.log(element)
        let sibling = element.previousElementSibling.innerText;
        console.log(sibling)
        let compute = Math.round(sibling/parseFloat(budget.totalIncome)*100)
        element.innerText = `${compute} %`;
    }
}

// Helper function
const formatter = new Intl.NumberFormat('fil-PH', {
    style: 'currency',
    currency: 'PHP',
});