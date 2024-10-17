// Wait for the DOM to load before running the script
document.addEventListener('DOMContentLoaded', () => {
  
    // Select the form and add an event listener for form submission
    document.getElementById('expenseForm').addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent form from refreshing the page
  
      // Get the values from the form fields
      const name = document.getElementById('expenseName').value;
      const amount = document.getElementById('expenseAmount').value;
      const date = document.getElementById('expenseDate').value;
  
      // Ensure that all fields are filled
      if (name && amount && date) {
        // Create the expense object
        const expense = {
          name: name,
          amount: amount,
          date: date
        };
  
        // Call the function to add expense to the server
        addExpense(expense);
      } else {
        alert("Please fill all fields.");
      }
    });
  
    // Function to add the expense to the JSON server
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
  
        // After adding, clear the form fields
        document.getElementById('expenseName').value = '';
        document.getElementById('expenseAmount').value = '';
        document.getElementById('expenseDate').value = '';
  
        // Optionally, you can call a function to refresh the displayed expenses list here
        displayExpenses();
      })
      .catch(error => console.error("Error adding expense:", error));
    }
  
    // Function to fetch and display all expenses from the server
    function displayExpenses() {
      fetch('http://localhost:3000/expenses')
      .then(response => response.json())
      .then(expenses => {
        // Select the expense list container (Assuming you have an element with ID 'expenseList')
        const expenseList = document.getElementById('expenseList');
        expenseList.innerHTML = ''; // Clear existing list before displaying
  
        // Loop through all expenses and display them
        expenses.forEach(expense => {
          const expenseItem = document.createElement('li');
          expenseItem.textContent = `${expense.name} - $${expense.amount} on ${expense.date}`;
          expenseList.appendChild(expenseItem);
        });
      })
      .catch(error => console.error("Error fetching expenses:", error));
    }
  
    // Call displayExpenses to show expenses when the page loads
    displayExpenses();
  });
  