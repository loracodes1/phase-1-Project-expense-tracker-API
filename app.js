const expenseForm = document.getElementById('add-expense-form'); 
const expenseList = document.getElementById('expense-list');
const dateAddedInput = document.getElementById('date_added');
const generateReportButton = document.getElementById('generate-report');
const reportList = document.getElementById('report-list');
const reportTotalAmount = document.getElementById('report-total-amount');
const base_uri = "https://phase-1-project-expense-tracker-api.onrender.com";
let all_expenses = [];

/*  {
    "id": 1,
    "description": "Groceries",
    "amount": 500,
    "category": "Food",
    "date_added": "10-18-2024"
  }*/

const getExpenses = function() {
    fetch(`${base_uri}/expenses`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })
    .then((json) => json.json())
    .then((expenses) => {
        all_expenses = expenses;

        for(const expense of expenses) {
            const expenseItem = document.createElement('li');
            expenseItem.id = expense.id;
            expenseItem.innerHTML = `
                <span><strong>${expense.description}</strong> - $${expense.amount} (${expense.category}) Date: ${expense.date_added}</span>
                <button class="delete" data-id="${expense.id}">Delete</button>
            `;

            expenseList.appendChild(expenseItem);
        }
    })
}

function fillDefaultDate() {
    var now = new Date();
    var month = (now.getMonth() + 1);               
    var day = now.getDate();
    if (month < 10) 
        month = "0" + month;
    if (day < 10) 
        day = "0" + day;
    var today = now.getFullYear() + '-' + month + '-' + day;

    dateAddedInput.value = today;
}

function addExpenses(expense){
    fetch(`${base_uri}/expenses`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
            "Accept": "application/json"
        },
        body: JSON.stringify(expense),
    })
    .then((response) => response.json())
    .then((response) => {
        console.log(response);
        
        // Refreshes expense list
        getExpenses();
    })
    .catch((error) => {
        console.error(error)
    })

    return false;
}

function deleteExpense(expense_id){
    fetch(`${base_uri}/expenses/${expense_id}`, {
        method: "DELETE",
        headers: {
            "Accept": "application/json"
        }
    })
    .then((response) => response.json())
    .then((response) => {
        console.log(response);
        
        // Refreshes expense list
        getExpenses();
    })
    .catch((error) => {
        console.error(error)
    })

    return false;
}

expenseForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const description = document.getElementById('description').value; 
    const amount = document.getElementById('amount').value; 
    const category = document.getElementById('category').value;
    const date_added = document.getElementById('date_added').value;

    if (description === '' || amount === '' || category === '' || date_added === '') {
        alert('Please fill out all fields');
        return;
    }

    if(amount < 0) {
        alert('Amount can not be negative');
        return false;
    }

    let expense = {
        description: description,
        amount: amount,
        category: category,
        date_added: date_added
    }
    
    addExpenses(expense);

    return false;
});

window.addEventListener('load', function() {
    fillDefaultDate();
    getExpenses();
});

document.addEventListener('click', function(e) {
    if(e.target.className === 'delete') {
        let expense_id = e.target.parentNode.id;

        deleteExpense(expense_id);
    }
});

generateReportButton.addEventListener('click', function(){
    let total_amount = 0; 
    reportList.innerHTML = "";

    if(all_expenses.length == 0) {
        alert('Add expenses to generate a report');
        return;
    }
    
    for(const expense of all_expenses){
        total_amount = total_amount + parseInt(expense.amount);
        reportList.innerHTML += `
            <tr>
                <td>${expense.id}</td>
                <td>${expense.category}</td>
                <td>${expense.amount}</td>
                <td>${expense.description}</td>
                <td>${expense.date_added}</td>
            </tr>
        `;
    }

    reportTotalAmount.innerText = `Total amount: $${total_amount}`;
});