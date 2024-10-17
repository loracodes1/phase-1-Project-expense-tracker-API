
document.addEventListener('DOMContentLoaded', () => {
  
    // Select the form and add an event listener for form submission
    document.getElementById('expenseForm').addEventListener('submit', function(event) {
      event.preventDefault();
  
      const name = document.getElementById('expenseName').value;
      const amount = document.getElementById('expenseAmount').value;
      const date = document.getElementById('expenseDate').value;
  
      if (name && amount && date) {
        const expense = {
          name: name,
          amount: amount,
          date: date
        };
  
        addExpense(expense);
      } else {
        alert("Please fill all fields.");
      }
    });
  
    function addExpense(expense) {
      fetch('http://localhost:3000/expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(expense)
      })
      .then(response => response.json())
      .then(data => {
        console.log("Expense added:", data);

        document.getElementById('expenseName').value = '';
        document.getElementById('expenseAmount').value = '';
        document.getElementById('expenseDate').value = '';
  
        displayExpenses();
      })
      .catch(error => console.error("Error adding expense:", error));
    }
  
    function displayExpenses() {
      fetch('http://localhost:3000/expenses')
      .then(response => response.json())
      .then(expenses => {
        
        const expenseList = document.getElementById('expenseList');
        expenseList.innerHTML = ''; 
  
        expenses.forEach(expense => {
          const expenseItem = document.createElement('li');
          expenseItem.textContent = `${expense.name} - $${expense.amount} on ${expense.date}`;
          expenseList.appendChild(expenseItem);
        });
      })
      .catch(error => console.error("Error fetching expenses:", error));
    }

    displayExpenses();
  });
  