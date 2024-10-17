const apiUrl = 'http://localhost:3000/expenses'

const expenseForm = document.getElementById('add-expense-form');
const expenseList = document.getElementById('expenses');

function fetchExpenses(){
    fetch (apiUrl)
    .then(response => response.json)
    .then (expenses => displayExpenses(expenses));
}

function addExpense(event) {
    event.preventDefault();
  
    const description = document.getElementById('description').value;
    const amount = document.getElementById('amount').value;
    const category = document.getElementById('category').value;
  
    const newExpense = {
      description,
      amount: parseFloat(amount),category
    }
    fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newExpense)
      })
      .then(response => response.json())
      .then(() => {
        fetchExpenses();
        expenseForm.reset();
      });
    }

    function deleteExpense(event) {
        if (event.target.classList.contains('delete')) {
          const id = event.target.getAttribute('data-id');
      
          fetch(`${apiUrl}/${id}`, {
            method: 'DELETE'
          })
          .then(() => fetchExpenses()); // Refresh the list
        }
      }


      expenseForm.addEventListener('submit', addExpense);
expenseList.addEventListener('click', deleteExpense);

fetchExpenses();

