
const expenseForm = document.getElementById('add-expense-form');
const expenseList = document.getElementById('expenses');

expenseForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Getting the input values
    const description = document.getElementById('description').value;
    const amount = document.getElementById('amount').value;
    const category = document.getElementById('category').value;

    // Validate if all fields are filled
    if (description === '' || amount === '' || category === '') {
        alert('Please fill out all fields');
        return;
    }

    // Create a new expense item
    const expenseItem = document.createElement('li');
    expenseItem.innerHTML = `
        <span><strong>${description}</strong> - $${amount} (${category})</span>
        <button class="delete">Delete</button>
    `;

    // Add the expense to the list
    expenseList.appendChild(expenseItem);

    // Clear the form fields
    document.getElementById('description').value = '';
    document.getElementById('amount').value = '';
    document.getElementById('category').value = '';

    // Handle the delete functionality
    const deleteBtn = expenseItem.querySelector('.delete');
    deleteBtn.addEventListener('click', () => {
        expenseItem.remove();
    });
});
