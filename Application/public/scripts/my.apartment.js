/* globals $ */
(() => {
    const aptId = window.location.href.split('/')[4];

    const getNotPaidFees = new Promise((resolve, reject) => {
        $.ajax({
            url: `/api/notpaidfees/${aptId}`,
            type: 'GET',
            success: (res) => {
                resolve(res);
            },
            error: (err) => {
                reject(err);
            },
        });
    });

    const getNotPaidExpenses = new Promise((resolve, reject) => {
        $.ajax({
            url: `/api/notpaidexpenses/${aptId}`,
            type: 'GET',
            success: (res) => {
                resolve(res);
            },
            error: (err) => {
                reject(err);
            },
        });
    });

    Promise.all([getNotPaidFees, getNotPaidExpenses])
        .then((data) => {
            const fees = data[0];
            const expenses = data[1];
            populateFeesTable(fees);
            populateExpensesTable(expenses);
        })
        .catch((err) => {
            console.log(err);
        });
    // input meta-data on each entry on get
    // use that meta-data on put to get the fee/expense id
    const populateFeesTable = (fees) => {
        const table = $('#fees');
        fees.forEach((fee) => {
            const row = $('<tr>');
            const month = $('<td>').text(fee.month);
            const cost = $('<td>').text(fee.cost);
            const button = $('<button>').text('Pay Now');
            row.append(month);
            row.append(cost);
            row.append(button);
            table.append(row);
        });
    };

    const populateExpensesTable = (expenses) => {
        const table = $('#expenses');
        console.log(expenses);
        expenses.forEach((expense) => {
            const row = $('<tr>');
            const name = $('<td>').text(expense.name);
            const cost = $('<td>').text(expense.cost);
            const button = $('<button>').text('Pay Now');
            row.append(name);
            row.append(cost);
            row.append(button);
            table.append(row);
        });
    };
})();
