document.addEventListener('DOMContentLoaded', function () {
    const addExpenseBtn = document.querySelector('.add-expense-btn');
    const resetBtn = document.querySelector('.reset-btn');
    const expenseList = document.querySelector('.expense-list');
    const totalExpenses = document.querySelector('.total-expenses h2');
    const splitBillBtn = document.getElementById('splitBillBtn');
    const splitResult = document.getElementById('splitResult');
    const numPeopleInput = document.getElementById('numPeople');

    let totalExpense = 0;

    addExpenseBtn.addEventListener('click', function () {
        const userName = window.prompt('Enter your name:');
        
        if (userName === null) {
            return;
        }

        const expenseName = window.prompt('Enter expense name:');
        const expenseAmount = window.prompt('Enter expense amount:');
        
        if (expenseName === null || expenseAmount === null) {
            return;
        }

        if (userName.trim() === '' || expenseName.trim() === '' || expenseAmount.trim() === '') {
            alert('Please enter valid data for your name, expense name, and amount.');
            return;
        }

        const newExpenseItem = document.createElement('div');
        newExpenseItem.classList.add('expense-item');
        newExpenseItem.textContent = `User: ${userName}, Expense: ${expenseName}, Amount: $${parseFloat(expenseAmount).toFixed(2)}`;

        // Create edit button
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit-btn');

        // Event listener for the Edit button
        editButton.addEventListener('click', function () {
            const newUserName = window.prompt('Enter new user name:', userName);
            const newExpenseName = window.prompt('Enter new expense name:', expenseName);
            const newExpenseAmount = window.prompt('Enter new expense amount:', expenseAmount);

            if (newUserName && newExpenseName && newExpenseAmount) {
                newExpenseItem.textContent = `User: ${newUserName}, Expense: ${newExpenseName}, Amount: $${parseFloat(newExpenseAmount).toFixed(2)}`;
                // Update total expenses
                updateTotalExpenses();
            }
        });

        // Append the edit button to the expense item
        newExpenseItem.appendChild(editButton);

        expenseList.appendChild(newExpenseItem);
        
        totalExpense += parseFloat(expenseAmount);
        updateTotalExpense();
    });

    resetBtn.addEventListener('click', function () {
        expenseList.innerHTML = '';
        totalExpense = 0;
        updateTotalExpense();
    });

    splitBillBtn.addEventListener('click', function () {
        const numPeople = parseInt(numPeopleInput.value);
        if (numPeople <= 0) {
            alert('Number of people should be greater than 0.');
            return;
        }
        const amountPerPerson = totalExpense / numPeople;
        splitResult.textContent = `Amount per person: $${amountPerPerson.toFixed(2)}`;
    });

    function updateTotalExpense() {
        totalExpenses.textContent = `Total Expense: $${totalExpense.toFixed(2)}`;
    }
});
