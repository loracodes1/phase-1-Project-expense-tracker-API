const expenseForm = document.getElementById('add-expense-form'); 
const expenseList = document.getElementById('expenses'); 
expenseForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const description = document.getElementById('description').value; 
    const amount = document.getElementById('amount').value; 
    const category = document.getElementById('category').value;

    if (description === '' || amount === '' || category === '') {
        alert('Please fill out all fields');
        return;
    }

    
    const expenseItem = document.createElement('li');
    expenseItem.innerHTML = `
        <span><strong>${description}</strong> - $${amount} (${category})</span>
        <button class="delete">Delete</button>
    `;

    expenseList.appendChild(expenseItem);

    expenseForm.reset();

    const deleteBtn = expenseItem.querySelector('.delete');
    deleteBtn.addEventListener('click', () => {
        expenseItem.remove();
    });
});
