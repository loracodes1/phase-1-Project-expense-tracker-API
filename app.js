const expenseForm = document.getElementById('add-expense-form');
const expenseList = document.getElementById('expenses');

function fetchExpenses(){
    fetch (apiUrl)
    .then(response => response.json)
    .then (expenses => displayExpenses(expenses));
}
