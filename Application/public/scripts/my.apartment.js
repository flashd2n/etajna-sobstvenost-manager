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

    const payFee = (feeId) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `/api/payfee/${aptId}`,
                data: {
                    feeId: feeId,
                },
                type: 'PUT',
                success: (res) => {
                    resolve(res);
                },
                error: (err) => {
                    reject(err);
                },
            });
        });
    };

    const payExpense = (expenseId) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `/api/payexpense/${aptId}`,
                data: {
                    expenseId: expenseId,
                },
                type: 'PUT',
                success: (res) => {
                    resolve(res);
                },
                error: (err) => {
                    reject(err);
                },
            });
        });
    };

    let feeId;
    let expenseId;

    Promise.all([getNotPaidFees, getNotPaidExpenses])
        .then((data) => {
            const fees = data[0];
            const expenses = data[1];
            populateFeesTable(fees);
            populateExpensesTable(expenses);
            return;
        })
        .then(() => {
            $('.payFee').on('click', (evt) => {
                const $clickedBtn = $(evt.target);
                const $feeItem = $clickedBtn.parent();
                feeId = $feeItem.data().id;
                payFee(feeId)
                    .then((res) => {
                        if (res === 'Success') {
                            $feeItem.remove();
                        }
                    })
                    .catch((er) => {
                        console.log(er);
                    });
            });

            $('.payExpense').on('click', (evt) => {
                const $clickedBtn = $(evt.target);
                const $expenseItem = $clickedBtn.parent();
                expenseId = $expenseItem.data().id;
                payExpense(expenseId)
                    .then((res) => {
                        if (res === 'Success') {
                            $expenseItem.remove();
                        }
                    })
                    .catch((er) => {
                        console.log(er);
                    });
            });
        })
        .catch((err) => {
            console.log(err);
        });

    const populateFeesTable = (fees) => {
        const table = $('#fees');
        fees.forEach((fee) => {
            const row = $('<tr>').data('id', fee._id);
            const month = $('<td>').text(fee.month);
            const cost = $('<td>').text(fee.cost);
            const button = $('<button>').text('Pay Now').addClass('payFee');
            row.append(month);
            row.append(cost);
            row.append(button);
            table.append(row);
        });
    };

    const populateExpensesTable = (expenses) => {
        const table = $('#expenses');
        expenses.forEach((expense) => {
            const row = $('<tr>').data('id', expense._id);
            const name = $('<td>').text(expense.name);
            const cost = $('<td>').text(expense.cost);
            const button = $('<button>').text('Pay Now').addClass('payExpense');
            row.append(name);
            row.append(cost);
            row.append(button);
            table.append(row);
        });
    };
})();
